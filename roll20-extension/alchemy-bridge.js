// Content script injected into the Alchemy App (localhost:5173 and catto.at)
//
// Content scripts run in an "isolated world" — a separate JS context from the page.
// window.foo set here is NOT visible to React, and window.dispatchEvent() here
// does NOT reach the page's listeners. Script injection can be blocked by CSP.
//
// The ONLY reliable cross-boundary channel: window.postMessage().
// Both directions (page→ext, ext→page) use postMessage.

const FROM_EXT  = '__aetherial_from_ext'   // messages from extension → page
const FROM_PAGE = '__aetherial_from_page'  // messages from page → extension

// ── 1. Signal readiness; also respond to pings from the page ─────────────────
// Fire immediately so the page catches it if already listening.
// Also respond to PING so components that mounted before the content script
// loaded can discover the extension by sending a ping.
window.postMessage({ [FROM_EXT]: true, type: 'EXTENSION_READY' }, '*')

// ── 2. Page → Content Script ──────────────────────────────────────────────────
window.addEventListener('message', (e) => {
  if (!e.data?.[FROM_PAGE]) return
  const { type, payload } = e.data

  if (type === 'PING') {
    // Respond to late-arriving components
    window.postMessage({ [FROM_EXT]: true, type: 'EXTENSION_READY' }, '*')
    return
  }
  if (type === 'BREW_POTION') {
    chrome.runtime.sendMessage({ type: 'BREW_POTION', potion: payload })
    return
  }
  if (type === 'REQUEST_CHARACTERS') {
    chrome.runtime.sendMessage({ type: 'REQUEST_CHARACTERS' })
    return
  }
  if (type === 'REQUEST_INVENTORY') {
    chrome.runtime.sendMessage({ type: 'REQUEST_INVENTORY', ...payload })
    return
  }
  if (type === 'PUSH_ITEM') {
    chrome.runtime.sendMessage({ type: 'PUSH_ITEM', ...payload })
    return
  }
})

// ── 3. Background → Content Script → Page ────────────────────────────────────
chrome.runtime.onMessage.addListener((msg) => {
  // Forward every message from the background to the page via postMessage
  window.postMessage({ [FROM_EXT]: true, ...msg }, '*')
})
