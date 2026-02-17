// Background Service Worker — message broker between Alchemy App and Roll20

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type !== 'BREW_POTION') return

  // Find any open Roll20 editor tab and forward the brew event
  chrome.tabs.query({ url: 'https://app.roll20.net/editor/*' }, (tabs) => {
    if (tabs.length === 0) {
      console.warn('[Aetherial] No Roll20 tab found — open Roll20 first.')
      return
    }
    // Send to the first Roll20 tab found
    chrome.tabs.sendMessage(tabs[0].id, msg)
  })
})
