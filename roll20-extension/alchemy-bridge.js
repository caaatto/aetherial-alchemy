// Content script injected into the Alchemy App (localhost:5173 and catto.at)
//
// Chrome extensions run content scripts in an "isolated world" — a separate JS
// context from the page. window.foo set here is NOT visible to the React app,
// and window.dispatchEvent() here does NOT reach the page's event listeners.
//
// Solution:
//   • Inject inline <script> tags to run code in the PAGE's JS context.
//   • Use window.postMessage to relay events from page → content script.
//   • Inject scripts to dispatch CustomEvents from content script → page.

// ── Run code in the page's JS context ────────────────────────────────────────
function injectScript(code) {
  const s = document.createElement('script')
  s.textContent = code
  document.documentElement.appendChild(s)
  s.remove()
}

// ── Fire a CustomEvent in the page context ────────────────────────────────────
function fireInPage(eventName, detail) {
  injectScript(
    `window.dispatchEvent(new CustomEvent(${JSON.stringify(eventName)}, ` +
    `{ detail: ${JSON.stringify(detail)} }))`
  )
}

// ── 1. Signal extension presence + set up page→content relay ─────────────────
// Runs in the PAGE's context: sets the flag React checks, fires the ready event,
// and installs listeners that relay page CustomEvents to postMessage so the
// content script world can receive them.
injectScript(`
  window.__aetherialExtensionActive = true;
  window.dispatchEvent(new CustomEvent('aetherial-extension-ready'));

  const __relay = (type) => window.addEventListener(type, (e) => {
    window.postMessage({ __aetherial: true, type, detail: e.detail ?? null }, '*');
  });

  __relay('aetherial-brew');
  __relay('aetherial-request-characters');
  __relay('aetherial-request-inventory');
  __relay('aetherial-push-item');
`)

// ── 2. Page → Content Script (via postMessage) ────────────────────────────────
window.addEventListener('message', (e) => {
  if (!e.data?.__aetherial) return
  const { type, detail } = e.data

  if (type === 'aetherial-brew') {
    chrome.runtime.sendMessage({ type: 'BREW_POTION', potion: detail })
  }
  if (type === 'aetherial-request-characters') {
    chrome.runtime.sendMessage({ type: 'REQUEST_CHARACTERS' })
  }
  if (type === 'aetherial-request-inventory') {
    chrome.runtime.sendMessage({
      type:          'REQUEST_INVENTORY',
      characterId:   detail.characterId,
      characterName: detail.characterName
    })
  }
  if (type === 'aetherial-push-item') {
    chrome.runtime.sendMessage({
      type:        'PUSH_ITEM',
      characterId: detail.characterId,
      item:        detail.item
    })
  }
})

// ── 3. Background → Page (inject CustomEvents into page context) ──────────────
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'CHARACTERS_RESULT') {
    fireInPage('aetherial-characters-result', msg)
  }
  if (msg.type === 'INVENTORY_RESULT') {
    fireInPage('aetherial-inventory-result', msg)
  }
  if (msg.type === 'PUSH_ITEM_RESULT') {
    fireInPage('aetherial-push-item-result', msg)
  }
})
