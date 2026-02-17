// Content script injected into the Alchemy App (localhost:5173 and catto.at)
// Listens for brew/sync events fired by the app and forwards them to the background worker.
// Also receives responses from Roll20 (via background) and dispatches them back to the app.

// Let the app know the extension is active
window.__aetherialExtensionActive = true
window.dispatchEvent(new CustomEvent('aetherial-extension-ready'))

// ── Alchemy App → Background ─────────────────────────────────────────────────

// Forward brew events to Roll20 via background
window.addEventListener('aetherial-brew', (event) => {
  chrome.runtime.sendMessage({ type: 'BREW_POTION', potion: event.detail })
})

// Request character list from Roll20
window.addEventListener('aetherial-request-characters', () => {
  chrome.runtime.sendMessage({ type: 'REQUEST_CHARACTERS' })
})

// Request a character's Roll20 inventory
window.addEventListener('aetherial-request-inventory', (event) => {
  chrome.runtime.sendMessage({
    type: 'REQUEST_INVENTORY',
    characterId:   event.detail.characterId,
    characterName: event.detail.characterName
  })
})

// Push one item to a character's Roll20 inventory
window.addEventListener('aetherial-push-item', (event) => {
  chrome.runtime.sendMessage({
    type:        'PUSH_ITEM',
    characterId: event.detail.characterId,
    item:        event.detail.item
  })
})

// ── Background → Alchemy App ─────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((msg) => {
  // Character list received from Roll20
  if (msg.type === 'CHARACTERS_RESULT') {
    window.dispatchEvent(new CustomEvent('aetherial-characters-result', { detail: msg }))
    return
  }

  // Inventory data received from Roll20
  if (msg.type === 'INVENTORY_RESULT') {
    window.dispatchEvent(new CustomEvent('aetherial-inventory-result', { detail: msg }))
    return
  }

  // Confirmation that an item was pushed to Roll20
  if (msg.type === 'PUSH_ITEM_RESULT') {
    window.dispatchEvent(new CustomEvent('aetherial-push-item-result', { detail: msg }))
    return
  }
})
