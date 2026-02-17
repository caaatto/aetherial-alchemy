// Content script injected into Roll20 (app.roll20.net/editor/*)
// Receives brew/sync events from the background worker and acts on them.

// ── Background → Roll20 message handler ──────────────────────────────────────
chrome.runtime.onMessage.addListener((msg) => {

  if (msg.type === 'BREW_POTION') {
    postBrewCard(msg.potion)
    return
  }

  if (msg.type === 'READ_CHARACTERS') {
    readCharacters()
    return
  }

  if (msg.type === 'READ_INVENTORY') {
    readInventory(msg.characterId, msg.characterName)
    return
  }

  if (msg.type === 'PUSH_ITEM') {
    pushItemToRoll20(msg.characterId, msg.item)
    return
  }
})

// ── Brew Card ────────────────────────────────────────────────────────────────
function postBrewCard(potion) {
  const qualityEmoji =
    potion.quality === 'Masterwork'       ? '⭐' :
    potion.quality === 'Superior'         ? '✨' :
    potion.quality === 'Failure'          ? '❌' :
    potion.quality === 'Critical Failure' ? '💀' : '✅'

  const rollText =
    potion.critSuccess ? `${potion.roll} (Natural 20!)` :
    potion.critFail    ? `${potion.roll} (Natural 1!)`  :
    `${potion.roll}`

  const lines = [
    `&{template:default}`,
    `{{name=Aetherial Brew}}`,
    `{{Potion=${potion.name}}}`,
    `{{Effect=${potion.effect}}}`,
    `{{Quality=${qualityEmoji} ${potion.quality}}}`,
    `{{Roll=d20: ${rollText} + ${potion.modifier >= 0 ? '+' : ''}${potion.modifier} = ${potion.total} vs DC ${potion.dc}}}`,
    `{{Brew Time=${potion.brewTime}}}`,
  ]

  // Embed inventory data for AetherialSync Mod Script (only on success)
  if (potion.success) {
    lines.push(`{{aetherial-name=${potion.name}}}`)
    lines.push(`{{aetherial-effect=${potion.effect}}}`)
    lines.push(`{{aetherial-quality=${potion.quality}}}`)
    lines.push(`{{aetherial-sync=1}}`)
  }

  postToChat(lines.join(' '))
}

// ── Read character list from Roll20 Campaign ─────────────────────────────────
function readCharacters() {
  try {
    const models = window.Campaign?.characters?.models
    if (!models || models.length === 0) {
      chrome.runtime.sendMessage({ type: 'CHARACTERS_RESULT', characters: [], error: 'no-characters' })
      return
    }

    const characters = models.map((c) => ({
      id:   c.id,
      name: c.get('name') || '(Unnamed)'
    }))

    chrome.runtime.sendMessage({ type: 'CHARACTERS_RESULT', characters })
  } catch (err) {
    console.error('[Aetherial] readCharacters error:', err)
    chrome.runtime.sendMessage({ type: 'CHARACTERS_RESULT', characters: [], error: String(err) })
  }
}

// ── Push one item to Roll20 via !brew-push chat command ──────────────────────
// AetherialSync Mod Script reads {{aetherial-push=1}} fields and writes to sheet
function pushItemToRoll20(characterId, item) {
  try {
    const lines = [
      `&{template:default}`,
      `{{name=Aetherial Push}}`,
      `{{Item=${item.name}}}`,
      `{{aetherial-push-name=${item.name}}}`,
      `{{aetherial-push-desc=${item.description || ''}}}`,
      `{{aetherial-push-qty=${item.quantity || 1}}}`,
      `{{aetherial-push-charid=${characterId}}}`,
      `{{aetherial-push=1}}`,
    ]
    postToChat(lines.join(' '))

    // Optimistic response — the mod script will write to sheet
    chrome.runtime.sendMessage({
      type:   'PUSH_ITEM_RESULT',
      success: true,
      item
    })
  } catch (err) {
    chrome.runtime.sendMessage({ type: 'PUSH_ITEM_RESULT', success: false, error: String(err), item })
  }
}

// ── Read inventory via !brew-read + whisper interceptor ──────────────────────
// The Mod Script whispers back a JSON blob prefixed with AETHERIAL-INVENTORY:
function readInventory(characterId, characterName) {
  // Set up MutationObserver to intercept the whispered response
  const chatLog = document.querySelector('#textchat-input')?.closest('.content')?.querySelector('.message-list')
              ?? document.querySelector('#chat-container .messages')

  let observer = null
  let timeout  = null

  const cleanup = () => {
    if (observer) { observer.disconnect(); observer = null }
    if (timeout)  { clearTimeout(timeout); timeout = null }
  }

  if (chatLog) {
    observer = new MutationObserver(() => {
      // Look for the latest whisper from AetherialSync containing the JSON blob
      const whispers = chatLog.querySelectorAll('.message.whisper, .message.fromgm')
      for (let i = whispers.length - 1; i >= 0; i--) {
        const text = whispers[i].textContent || ''
        const markerIdx = text.indexOf('AETHERIAL-INVENTORY:')
        if (markerIdx !== -1) {
          cleanup()
          try {
            const json = text.slice(markerIdx + 'AETHERIAL-INVENTORY:'.length).trim()
            const data = JSON.parse(json)
            chrome.runtime.sendMessage({ type: 'INVENTORY_RESULT', characterId, items: data })
          } catch (e) {
            chrome.runtime.sendMessage({ type: 'INVENTORY_RESULT', characterId, items: [], error: 'parse-error' })
          }
          return
        }
      }
    })
    observer.observe(chatLog, { childList: true, subtree: true })

    // Timeout after 8 seconds if no response
    timeout = setTimeout(() => {
      cleanup()
      chrome.runtime.sendMessage({ type: 'INVENTORY_RESULT', characterId, items: [], error: 'timeout' })
    }, 8000)
  }

  // Post the !brew-read command (no args — character determined by Mod Script from player)
  postToChat(`!brew-read`)
}

// ── Chat injection ────────────────────────────────────────────────────────────
function postToChat(msg) {
  const input = document.querySelector('#textchat-input textarea')
  const btn   = document.querySelector('#textchat-input button[type="submit"]')
             ?? document.querySelector('#textchat-input .btn')

  if (!input || !btn) {
    console.warn('[Aetherial] Could not find Roll20 chat input.')
    return
  }

  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set
  nativeSetter.call(input, msg)
  input.dispatchEvent(new Event('input', { bubbles: true }))
  setTimeout(() => btn.click(), 80)
}
