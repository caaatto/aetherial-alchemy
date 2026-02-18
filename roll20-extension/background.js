// ═══════════════════════════════════════════════════════════════════════════
// Aetherial Alchemy — Background Service Worker
// Routes messages between the Alchemy React app and the Roll20 tab.
//
// Message flow:
//   React App  →  alchemy-bridge.js  →  background.js  →  roll20-bridge.js
//   roll20-bridge.js  →  background.js  →  alchemy-bridge.js  →  React App
// ═══════════════════════════════════════════════════════════════════════════

// ── Find the active Roll20 game tab ──────────────────────────────────────────
async function findRoll20Tab() {
  const tabs = await chrome.tabs.query({ url: 'https://app.roll20.net/editor/*' })
  return tabs[0] ?? null
}

// ── Find the Alchemy app tab (localhost or catto.at) ─────────────────────────
async function findAlchemyTab() {
  const [local, remote] = await Promise.all([
    chrome.tabs.query({ url: 'http://localhost:5173/*' }),
    chrome.tabs.query({ url: 'https://catto.at/*' }),
  ])
  return [...local, ...remote][0] ?? null
}

// ── Main message listener ─────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  // ── REQUEST_CHARACTERS: React app wants the Roll20 character list ───────────
  if (msg.type === 'REQUEST_CHARACTERS') {
    findRoll20Tab().then(tab => {
      if (!tab) {
        sendResponse({ type: 'CHARACTERS_RESULT', error: 'no-roll20-tab', characters: [] })
        return
      }
      chrome.tabs.sendMessage(tab.id, { type: 'AE_GET_CHARS' }, (response) => {
        if (chrome.runtime.lastError) {
          sendResponse({ type: 'CHARACTERS_RESULT', error: chrome.runtime.lastError.message, characters: [] })
          return
        }
        sendResponse({ type: 'CHARACTERS_RESULT', characters: response?.characters ?? [] })
      })
    })
    return true // keep channel open for async response
  }

  // ── PUSH_ITEM: React app wants to push an item to the Roll20 character sheet ─
  if (msg.type === 'PUSH_ITEM') {
    findRoll20Tab().then(tab => {
      if (!tab) {
        sendResponse({ type: 'PUSH_ITEM_RESULT', success: false, error: 'no-roll20-tab', item: msg.item })
        return
      }
      chrome.tabs.sendMessage(
        tab.id,
        { type: 'AE_PUSH_ITEM', item: msg.item, characterId: msg.characterId },
        (response) => {
          if (chrome.runtime.lastError) {
            sendResponse({ type: 'PUSH_ITEM_RESULT', success: false, error: chrome.runtime.lastError.message, item: msg.item })
            return
          }
          sendResponse({ type: 'PUSH_ITEM_RESULT', success: response?.success ?? false, item: msg.item })
        }
      )
    })
    return true
  }

  // ── REQUEST_INVENTORY: React app wants to read Roll20 sheet equipment ────────
  if (msg.type === 'REQUEST_INVENTORY') {
    findRoll20Tab().then(tab => {
      if (!tab) {
        sendResponse({ type: 'INVENTORY_RESULT', error: 'no-roll20-tab', items: [] })
        return
      }
      chrome.tabs.sendMessage(
        tab.id,
        { type: 'AE_READ_INVENTORY' },
        (response) => {
          if (chrome.runtime.lastError) {
            sendResponse({ type: 'INVENTORY_RESULT', error: chrome.runtime.lastError.message, items: [] })
            return
          }
          if (response?.error) {
            sendResponse({ type: 'INVENTORY_RESULT', error: response.error, items: [] })
            return
          }
          sendResponse({ type: 'INVENTORY_RESULT', items: response?.items ?? [] })
        }
      )
    })
    return true
  }

})
