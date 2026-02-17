// ═══════════════════════════════════════════════════════════════════════════
// AetherialSync — Roll20 Mod Script
// Receives !brew-sync commands from the Aetherial Alchemy Chrome Extension
// and writes brewed potions directly into the D&D 2024 character sheet inventory.
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

// ── Argument parser ────────────────────────────────────────────────────────
// Values are wrapped in ~ (e.g. --name~Minor Healing Potion~) because
// Roll20 converts straight quotes to smart quotes, breaking regex matching.
function parseArgs(content) {
  const get = (flag) => {
    const match = content.match(new RegExp(`--${flag}~([^~]*)~`))
    return match ? match[1] : null
  }
  return {
    name:    get('name'),
    effect:  get('effect'),
    quality: get('quality'),
    qty:     parseInt(content.match(/--qty\s+(\d+)/)?.[1]) || 1,
  }
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

// ── Debug echo: shows the raw message content Roll20 receives ─────────────
on('chat:message', (msg) => {
  if (!msg.content.startsWith('!brew-echo')) return
  sendChat(SCRIPT_NAME, `/w ${msg.who} RAW: ${JSON.stringify(msg.content)}`)
})

// ── Main sync handler ──────────────────────────────────────────────────────
on('chat:message', async (msg) => {
  if (!msg.content.startsWith('!brew-sync')) return

  // Debug: always echo raw content so we can see what Roll20 received
  sendChat(SCRIPT_NAME, `/w ${msg.who} DEBUG raw: ${JSON.stringify(msg.content)}`)

  const args = parseArgs(msg.content)
  if (!args.name) {
    sendChat(SCRIPT_NAME, `/w ${msg.who} ⚠️ Missing --name argument.`)
    return
  }

  const char = findCharacterForPlayer(msg.playerid)
  if (!char) {
    sendChat(SCRIPT_NAME, `/w ${msg.who} ⚠️ No character found for your player. Make sure you control a character in this game.`)
    return
  }

  const charId = char.id
  const rowId  = makeRowId()
  const desc   = [args.effect, `Quality: ${args.quality}`].filter(Boolean).join(' | ')

  try {
    // D&D 2024 Beacon sheet — requires Experimental API Server
    // If you get "No attribute found" errors, run !brew-attrs on a selected token
    // to discover the exact attribute names your sheet uses.
    await setSheetItem(charId, `repeating_equipment_${rowId}_name`,        args.name)
    await setSheetItem(charId, `repeating_equipment_${rowId}_description`,  desc)
    await setSheetItem(charId, `repeating_equipment_${rowId}_quantity`,      args.qty)

    sendChat(SCRIPT_NAME,
      `/w ${msg.who} ✅ Added **${args.qty}x ${args.name}** (${args.quality}) to ${char.get('name')}'s inventory.`
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

  const token = getObj('graphic', msg.selected[0]._id)
  const charId = token?.get('represents')
  if (!charId) {
    sendChat(SCRIPT_NAME, `/w ${msg.who} The selected token has no linked character.`)
    return
  }

  const attrs = findObjs({ _type: 'attribute', _characterid: charId })
  const relevant = attrs
    .filter(a => /equipment|inventory|item/i.test(a.get('name')))
    .slice(0, 40)
    .map(a => `<b>${a.get('name')}</b>: ${a.get('current')}`)
    .join('<br>')

  sendChat(SCRIPT_NAME,
    `/w ${msg.who} <br><b>Inventory-related attributes on ${getObj('character', charId)?.get('name')}:</b><br>` +
    (relevant || 'None found. Try running with a 2024 sheet character.')
  )
})

log(`[${SCRIPT_NAME}] Ready — listening for !brew-sync and !brew-attrs`)
