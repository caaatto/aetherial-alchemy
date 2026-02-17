// Background Service Worker — bidirectional message broker between Alchemy App and Roll20

// ── Helper: find alchemy tab ────────────────────────────────────────────────
function findAlchemyTab(callback) {
  chrome.tabs.query({ url: ['http://localhost:5173/*', 'https://catto.at/*'] }, (tabs) => {
    callback(tabs.length > 0 ? tabs[0] : null)
  })
}

// ── Helper: find Roll20 tab ──────────────────────────────────────────────────
function findRoll20Tab(callback) {
  chrome.tabs.query({ url: 'https://app.roll20.net/editor/*' }, (tabs) => {
    callback(tabs.length > 0 ? tabs[0] : null)
  })
}

// ── Message router ───────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  // ── Alchemy → Roll20 ──────────────────────────────────────────────────────

  // Forward brew event to Roll20
  if (msg.type === 'BREW_POTION') {
    findRoll20Tab((tab) => {
      if (!tab) {
        console.warn('[Aetherial] No Roll20 tab found — open Roll20 first.')
        return
      }
      chrome.tabs.sendMessage(tab.id, msg)
    })
    return
  }

  // Request Roll20 to read character list
  if (msg.type === 'REQUEST_CHARACTERS') {
    findRoll20Tab((tab) => {
      if (!tab) {
        findAlchemyTab((alchTab) => {
          if (alchTab) chrome.tabs.sendMessage(alchTab.id, { type: 'CHARACTERS_RESULT', error: 'no-roll20-tab', characters: [] })
        })
        return
      }
      chrome.tabs.sendMessage(tab.id, { type: 'READ_CHARACTERS' })
    })
    return
  }

  // Request Roll20 to read a character's inventory
  if (msg.type === 'REQUEST_INVENTORY') {
    findRoll20Tab((tab) => {
      if (!tab) return
      chrome.tabs.sendMessage(tab.id, { type: 'READ_INVENTORY', characterId: msg.characterId, characterName: msg.characterName })
    })
    return
  }

  // Push a single item to Roll20 inventory
  if (msg.type === 'PUSH_ITEM') {
    findRoll20Tab((tab) => {
      if (!tab) return
      chrome.tabs.sendMessage(tab.id, { type: 'PUSH_ITEM', characterId: msg.characterId, item: msg.item })
    })
    return
  }

  // ── Roll20 → Alchemy ──────────────────────────────────────────────────────

  // Roll20 sends back character list
  if (msg.type === 'CHARACTERS_RESULT') {
    findAlchemyTab((tab) => {
      if (tab) chrome.tabs.sendMessage(tab.id, msg)
    })
    return
  }

  // Roll20 sends back inventory data
  if (msg.type === 'INVENTORY_RESULT') {
    findAlchemyTab((tab) => {
      if (tab) chrome.tabs.sendMessage(tab.id, msg)
    })
    return
  }

  // Roll20 confirms item was pushed
  if (msg.type === 'PUSH_ITEM_RESULT') {
    findAlchemyTab((tab) => {
      if (tab) chrome.tabs.sendMessage(tab.id, msg)
    })
    return
  }
})
