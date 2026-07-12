// ================================================================
// AetherialSync - Roll20 Mod Script
// Requires: Roll20 Pro + Experimental API Server for D&D 2024 Beacon sheet
// Install: paste into a new Mod Script in Roll20.
// ================================================================

const SCRIPT_NAME = 'AetherialSync'

// Whisper helper: quote the target and strip Roll20's " (GM)" suffix,
// otherwise whispers to multi-word display names are never delivered.
// noarchive keeps the protocol/ack chatter out of the chat archive.
function whisper(msg, text) {
  const who = (msg.who || '').replace(/ \(GM\)\s*$/i, '')
  sendChat(SCRIPT_NAME, '/w "' + who + '" ' + text, null, { noarchive: true })
}

// getSheetItem key candidates for a custom "Alchemy" skill on Beacon sheets.
const BEACON_SKILL_KEYS = [
  'alchemy_bonus', 'alchemy_mod', 'alchemy_total', 'alchemy', 'alchemy_check',
  'custom_skill_alchemy', 'customskill_alchemy', 'skills.alchemy.total', 'skills.alchemy.bonus',
]

function getField(content, field) {
  const match = content.match(new RegExp('\{\{' + field + '=([^}]*)\}\}'))
  return match ? match[1].trim() : null
}

function findCharacterForPlayer(playerId) {
  return findObjs({ _type: 'character' }).find(c => {
    const ctrl = c.get('controlledby') || ''
    return ctrl.split(',').map(s => s.trim()).includes(playerId)
  })
}

function makeRowId() {
  const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = '-'
  for (let i = 0; i < 16; i++) id += ch[Math.floor(Math.random() * ch.length)]
  return id
}

// Write equipment row: tries multiple section/field name patterns
async function writeEquipmentRow(cId, rId, name, desc, qty) {
  if (typeof setSheetItem === 'function') {
    const sections = ['repeating_equipment','repeating_items','repeating_otherpossessions','repeating_inventory','repeating_possessions']
    for (const sec of sections) {
      const p = sec + '_' + rId + '_'
      try {
        await setSheetItem(cId, p + 'name', name)
        // name written - write rest (best-effort)
        for (const [k,v] of [[p+'description',String(desc||'')],[p+'quantity',String(qty||1)],[p+'weight','0']]) {
          try { await setSheetItem(cId, k, v) } catch(_) {}
        }
        return 'beacon:' + sec
      } catch(_) {}
    }
    log('[AetherialSync] setSheetItem: no matching section found for char ' + cId)
    return 'beacon:no-section'
  }
  // Fallback createObj
  const p = 'repeating_equipment_' + rId + '_'
  const fields = [[p+'name',name],[p+'description',String(desc||'')],[p+'quantity',String(qty||1)]]
  fields.forEach(([an,v]) => {
    const ex = findObjs({ _type: 'attribute', _characterid: cId, name: an })[0]
    if (ex) { ex.set('current', v) } else { createObj('attribute', { name: an, current: v, _characterid: cId }) }
  })
  return 'createObj'
}

on('chat:message', async msg => {
  if (!msg.content.includes('aetherial-sync=1')) return
  const name    = getField(msg.content, 'aetherial-name')
  const effect  = getField(msg.content, 'aetherial-effect')
  const quality = getField(msg.content, 'aetherial-quality')
  if (!name) { whisper(msg, 'Could not read potion name.'); return }
  const char = findCharacterForPlayer(msg.playerid)
  if (!char) { whisper(msg, 'No character found. Make sure you control a character.'); return }
  const desc = [effect, quality ? 'Quality: ' + quality : ''].filter(Boolean).join(' | ')
  try {
    const method = await writeEquipmentRow(char.id, makeRowId(), name, desc, 1)
    whisper(msg, 'Added ' + name + ' to ' + char.get('name') + '. [' + method + ']')
  } catch(e) {
    whisper(msg, 'Write failed: ' + e + '. On D&D 2024? Enable: Game Settings > API Server > Experimental')
    log('[' + SCRIPT_NAME + '] sync err: ' + e)
  }
})

on('chat:message', async msg => {
  if (!msg.content.includes('aetherial-push=1')) return
  const name   = getField(msg.content, 'aetherial-push-name')
  const desc   = getField(msg.content, 'aetherial-push-desc') || ''
  const qty    = parseInt(getField(msg.content, 'aetherial-push-qty') || '1', 10)
  const charId = getField(msg.content, 'aetherial-push-charid')
  if (!name || !charId) { whisper(msg, 'Push failed: missing name or character ID.'); return }
  const char = getObj('character', charId)
  if (!char) { whisper(msg, 'Character not found (ID: ' + charId + '). Select correct character in sidebar.'); return }
  try {
    const method = await writeEquipmentRow(charId, makeRowId(), name, desc, qty)
    whisper(msg, 'Added ' + name + ' (x' + qty + ') to ' + char.get('name') + '. [' + method + ']')
  } catch(e) {
    whisper(msg, 'Push failed: ' + e)
    log('[' + SCRIPT_NAME + '] push err: ' + e)
  }
})

on('chat:message', msg => {
  if (!msg.content.startsWith('!brew-read')) return
  const char = findCharacterForPlayer(msg.playerid)
  if (!char) { whisper(msg, 'No character found.'); return }
  const attrs = findObjs({ _type: 'attribute', _characterid: char.id })
  const rows = {}
  attrs.forEach(a => {
    const m = a.get('name').match(/^repeating_equipment_([^_]+)_(.+)$/)
    if (!m) return
    if (!rows[m[1]]) rows[m[1]] = {}
    rows[m[1]][m[2]] = a.get('current')
  })
  const items = Object.values(rows).filter(r => r.name).map(r => ({ name: r.name || '', description: r.description || '', quantity: r.quantity || 1 }))
  whisper(msg, 'AETHERIAL-INVENTORY:' + JSON.stringify(items))
})

// Read the character's custom "Alchemy" skill modifier from the sheet.
// Usage: !brew-skill [charId] (falls back to the player's own character).
// Finds the skill in three ways, in order:
//   1. a classic attribute whose NAME contains "alchemy" (e.g. custom attr "alchemy_bonus")
//   2. a repeating row whose name/label field VALUE is "Alchemy" (custom skill rows),
//      taking the best numeric sibling field (bonus/mod/total preferred)
//   3. Beacon sheets via getSheetItem with common key candidates
// Answers with a whisper: AETHERIAL-SKILL:{"found":true,"modifier":N,"source":"..."}
on('chat:message', async msg => {
  const parts = msg.content.split(/\s+/)
  if (parts[0] !== '!brew-skill') return
  const argId = parts[1]
  const char = argId ? getObj('character', argId) : findCharacterForPlayer(msg.playerid)
  const answer = payload => whisper(msg, 'AETHERIAL-SKILL:' + JSON.stringify(payload))
  if (!char) { answer({ found: false, reason: 'no-character' }); return }

  const num = v => { const n = parseInt(v, 10); return isNaN(n) ? null : n }
  const attrs = findObjs({ _type: 'attribute', _characterid: char.id })
  let found = null

  // 1) Direct attribute, name contains "alchemy" (skip repeating rows here)
  const rankName = n => /bonus|mod|total/i.test(n) ? 2 : /prof|flat/i.test(n) ? 0 : 1
  const direct = attrs
    .filter(a => /alchemy/i.test(a.get('name')) && !/^repeating_/.test(a.get('name')))
    .sort((a, b) => rankName(b.get('name')) - rankName(a.get('name')))
  for (const a of direct) {
    const n = num(a.get('current'))
    if (n !== null) { found = { modifier: n, source: a.get('name') }; break }
  }

  // 2) Repeating custom-skill row: name field says "Alchemy", numeric sibling holds the bonus
  if (!found) {
    const rows = {}
    attrs.forEach(a => {
      const m = a.get('name').match(/^(repeating_[^_]+_[^_]+)_(.+)$/)
      if (m) { (rows[m[1]] = rows[m[1]] || {})[m[2]] = a.get('current') }
    })
    const rankField = f => /bonus|mod|total|value/i.test(f) ? 2 : 1
    for (const prefix in rows) {
      const fields = rows[prefix]
      const isAlchemy = Object.keys(fields).some(f =>
        /name|label|skill/i.test(f) && /alchemy/i.test(String(fields[f])))
      if (!isAlchemy) continue
      const best = Object.keys(fields)
        .map(f => ({ f, n: num(fields[f]) }))
        .filter(x => x.n !== null)
        .sort((a, b) => rankField(b.f) - rankField(a.f))[0]
      if (best) { found = { modifier: best.n, source: prefix + '_' + best.f }; break }
    }
  }

  // 3) Beacon sheet values (not mirrored as classic attributes)
  if (!found && typeof getSheetItem === 'function') {
    for (const k of BEACON_SKILL_KEYS) {
      try {
        const n = num(await getSheetItem(char.id, k))
        if (n !== null) { found = { modifier: n, source: 'beacon:' + k }; break }
      } catch (_) {}
    }
  }

  answer(found
    ? { found: true, modifier: found.modifier, source: found.source }
    : { found: false, scanned: attrs.length, beacon: typeof getSheetItem === 'function' })
})

// Debug: whisper everything alchemy-related the script can see for a character.
// Usage: !brew-skill-scan (own character; the GM can select a token first).
on('chat:message', async msg => {
  if (!msg.content.startsWith('!brew-skill-scan')) return
  let char = null
  if (msg.selected && msg.selected.length) {
    const token = getObj('graphic', msg.selected[0]._id)
    const cId = token && token.get('represents')
    if (cId) char = getObj('character', cId)
  }
  if (!char) char = findCharacterForPlayer(msg.playerid)
  if (!char) { whisper(msg, 'Scan: no character found (select a token or control one).'); return }

  const attrs = findObjs({ _type: 'attribute', _characterid: char.id })
  const hits = attrs.filter(a =>
    /alchemy/i.test(a.get('name')) || /alchemy/i.test(String(a.get('current'))))
  const sections = [...new Set(attrs
    .map(a => (a.get('name').match(/^repeating_([^_]+)_/) || [])[1])
    .filter(Boolean))]

  let out = '<b>Skill-Scan: ' + char.get('name') + '</b><br>'
  out += 'Classic attributes: ' + attrs.length + ' total, ' + hits.length + ' matching "alchemy"<br>'
  hits.slice(0, 12).forEach(a => { out += '&bull; ' + a.get('name') + ' = ' + a.get('current') + '<br>' })
  out += 'Repeating sections: ' + (sections.join(', ') || 'none') + '<br>'
  out += 'Beacon getSheetItem: ' + (typeof getSheetItem === 'function') + '<br>'
  if (typeof getSheetItem === 'function') {
    for (const k of BEACON_SKILL_KEYS) {
      try {
        const v = await getSheetItem(char.id, k)
        if (v !== undefined && v !== null && v !== '') out += 'beacon ' + k + ' = ' + v + '<br>'
      } catch (_) {}
    }
  }
  whisper(msg, '<br>' + out)
})

on('chat:message', msg => {
  if (!msg.content.startsWith('!brew-attrs')) return
  if (!msg.selected || !msg.selected.length) { whisper(msg, 'Select a token first.'); return }
  const token = getObj('graphic', msg.selected[0]._id)
  const charId = token && token.get('represents')
  if (!charId) { whisper(msg, 'Token has no linked character.'); return }
  const attrs = findObjs({ _type: 'attribute', _characterid: charId })
  // Group ALL repeating_ sections so we can see what section name the sheet uses
  const secs = {}
  attrs.forEach(a => {
    const m = a.get('name').match(/^(repeating_[^_]+)_([^_]+)_(.+)$/)
    if (!m) return
    if (!secs[m[1]]) secs[m[1]] = {}
    if (!secs[m[1]][m[2]]) secs[m[1]][m[2]] = []
    secs[m[1]][m[2]].push(m[3])
  })
  let out = '<b>setSheetItem available: ' + (typeof setSheetItem === 'function') + '</b><br>'
  const secEntries = Object.entries(secs)
  if (!secEntries.length) { out += 'No repeating sections found on this character.' }
  secEntries.slice(0, 8).forEach(([sec, rows]) => {
    const rowCount = Object.keys(rows).length
    const sampleFields = (Object.values(rows)[0] || []).slice(0, 6).join(', ')
    out += '<b>' + sec + '</b> (' + rowCount + ' rows) fields: ' + sampleFields + '<br>'
  })
  whisper(msg, '<br>' + out)
})

on('chat:message', async msg => {
  if (!msg.content.startsWith('!brew-test')) return
  if (!msg.selected || !msg.selected.length) { whisper(msg, 'Select a token first.'); return }
  const token = getObj('graphic', msg.selected[0]._id)
  const charId = token && token.get('represents')
  if (!charId) { whisper(msg, 'Token has no linked character.'); return }
  try {
    const method = await writeEquipmentRow(charId, makeRowId(), 'Aetherial Test Item', 'Test from AetherialSync', 1)
    whisper(msg, 'Test item added! Method: ' + method + '. Check the equipment tab.')
  } catch(e) {
    whisper(msg, 'Test failed: ' + e)
  }
})

log('[' + SCRIPT_NAME + '] Ready - setSheetItem: ' + (typeof setSheetItem === 'function'))
