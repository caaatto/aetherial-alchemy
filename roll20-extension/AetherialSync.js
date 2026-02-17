// ═══════════════════════════════════════════════════════════════════════════
// AetherialSync — Roll20 Mod Script
// Listens for brew cards posted by the Aetherial Alchemy Chrome Extension
// and writes brewed potions into the D&D 2024 character sheet inventory.
//
// ⚠️  REQUIREMENTS:
//   - Roll20 Pro (Mod Scripts require Pro)
//   - Switch to the EXPERIMENTAL API SERVER in your game settings:
//       Game Settings → API Server → Experimental
//   - The Aetherial Alchemy Chrome Extension must be installed
//
// INSTALL: Paste this entire file into a new Mod Script in your Roll20 game.
// ═══════════════════════════════════════════════════════════════════════════

const SCRIPT_NAME = 'AetherialSync'

// ── Extract a {{field=value}} field from a Roll20 template message ─────────
function getField(content, field) {
  const match = content.match(new RegExp('\\{\\{' + field + '=([^}]*)\\}\\}'))
  return match ? match[1].trim() : null
}

// ── Find character controlled by a player ─────────────────────────────────
function findCharacterForPlayer(playerId) {
  return findObjs({ _type: 'character' }).find((c) => {
    const ctrl = c.get('controlledby') || ''
    return ctrl.split(',').map(s => s.trim()).includes(playerId)
  })
}

// ── Generate a Roll20-style row ID ────────────────────────────────────────
function makeRowId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = '-'
  for (let i = 0; i < 16; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

// ── Main handler: detect brew cards from the extension ────────────────────
// The extension embeds {{aetherial-sync=1}} in the template when brew succeeds.
// This avoids a separate !brew-sync message (Roll20 strips arguments from API commands).
on('chat:message', async (msg) => {
  if (!msg.content.includes('aetherial-sync=1')) return

  const name    = getField(msg.content, 'aetherial-name')
  const effect  = getField(msg.content, 'aetherial-effect')
  const quality = getField(msg.content, 'aetherial-quality')

  if (!name) {
    sendChat(SCRIPT_NAME, `/w ${msg.who} ⚠️ Could not read potion name from brew card.`)
    return
  }

  const char = findCharacterForPlayer(msg.playerid)
  if (!char) {
    sendChat(SCRIPT_NAME,
      `/w ${msg.who} ⚠️ No character found for your player. ` +
      `Make sure you control a character in this game.`
    )
    return
  }

  const charId = char.id
  const rowId  = makeRowId()
  const desc   = [effect, `Quality: ${quality}`].filter(Boolean).join(' | ')

  try {
    // D&D 2024 Beacon sheet — requires Experimental API Server
    // Run !brew-attrs on a selected token if you get "No attribute found" errors.
    await setSheetItem(charId, `repeating_equipment_${rowId}_name`,       name)
    await setSheetItem(charId, `repeating_equipment_${rowId}_description`, desc)
    await setSheetItem(charId, `repeating_equipment_${rowId}_quantity`,    1)

    sendChat(SCRIPT_NAME,
      `/w ${msg.who} ✅ Added **${name}** (${quality}) to ${char.get('name')}'s inventory.`
    )
  } catch (err) {
    sendChat(SCRIPT_NAME,
      `/w ${msg.who} ❌ Could not write to sheet. ` +
      `Make sure you are on the **Experimental API Server** ` +
      `(Game Settings → API Server → Experimental). Error: ${err}`
    )
    log(`[${SCRIPT_NAME}] setSheetItem error: ${err}`)
  }
})

// ── Debug: list inventory/equipment attribute names on a selected token ────
// Usage: select a token, then type:  !brew-attrs
on('chat:message', (msg) => {
  if (!msg.content.startsWith('!brew-attrs')) return
  if (!msg.selected || msg.selected.length === 0) {
    sendChat(SCRIPT_NAME, `/w ${msg.who} Select a token first, then run !brew-attrs.`)
    return
  }

  const token  = getObj('graphic', msg.selected[0]._id)
  const charId = token?.get('represents')
  if (!charId) {
    sendChat(SCRIPT_NAME, `/w ${msg.who} The selected token has no linked character.`)
    return
  }

  const attrs    = findObjs({ _type: 'attribute', _characterid: charId })
  const relevant = attrs
    .filter(a => /equipment|inventory|item/i.test(a.get('name')))
    .slice(0, 40)
    .map(a => `<b>${a.get('name')}</b>: ${a.get('current')}`)
    .join('<br>')

  sendChat(SCRIPT_NAME,
    `/w ${msg.who} <br><b>Inventory attrs on ${getObj('character', charId)?.get('name')}:</b><br>` +
    (relevant || 'None found. The 2024 sheet may use a different attribute structure.')
  )
})

log(`[${SCRIPT_NAME}] Ready — listening for Aetherial brew cards`)
