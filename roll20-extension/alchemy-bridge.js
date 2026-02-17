// Content script injected into the Alchemy App (localhost:5173)
// Listens for brew events fired by the app and forwards them to the background worker.

// Let the app know the extension is active
window.__aetherialExtensionActive = true
window.dispatchEvent(new CustomEvent('aetherial-extension-ready'))

window.addEventListener('aetherial-brew', (event) => {
  chrome.runtime.sendMessage({ type: 'BREW_POTION', potion: event.detail })
})
