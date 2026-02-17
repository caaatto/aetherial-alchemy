// Runs in the PAGE's JS context (world: "MAIN") so it can access Roll20 globals.
// Reads window.Campaign.characters and forwards the list to the isolated content
// script (roll20-bridge.js) via postMessage.

const AE_TO_PAGE   = '__ae_to_page'
const AE_FROM_PAGE = '__ae_from_page'

function sendChars() {
  try {
    const models = window.Campaign?.characters?.models || []
    const characters = models.map(c => ({
      id:   c.id,
      name: c.get('name') || '(Unnamed)'
    }))
    window.postMessage({ [AE_FROM_PAGE]: true, type: 'CHARACTERS', characters }, '*')
  } catch (e) {
    window.postMessage({ [AE_FROM_PAGE]: true, type: 'CHARACTERS', characters: [] }, '*')
  }
}

// Respond to requests from the isolated script
window.addEventListener('message', (e) => {
  if (e.data?.[AE_TO_PAGE] && e.data.type === 'GET_CHARACTERS') {
    sendChars()
  }
})

// Also push automatically once Campaign is ready
let attempts = 0
const poll = setInterval(() => {
  attempts++
  const models = window.Campaign?.characters?.models
  if (models?.length || attempts >= 30) {
    clearInterval(poll)
    sendChars()
  }
}, 500)
