// Runs in the PAGE's JS context (world: "MAIN") so it can access Roll20 globals.
// Reads window.Campaign.characters and forwards the list to the isolated content
// script (roll20-bridge.js) via postMessage.

const AE_TO_PAGE   = '__ae_to_page'
const AE_FROM_PAGE = '__ae_from_page'

// Read campaign id, current player name and GM flag from Roll20 globals.
// Used as the "room" key + player label for the GM live dashboard.
function readMeta() {
  let playerName = ''
  try {
    const p = window.currentPlayer
    if (p) playerName = p.get('displayname') || p.get('_displayname') || ''
  } catch (_) { /* currentPlayer not ready */ }
  return {
    campaignId: String(window.Campaign?.id || window.campaign_id || ''),
    playerName,
    isGm: window.is_gm === true,
  }
}

function sendChars() {
  try {
    const isGm = window.is_gm === true
    const myId = window.currentPlayer?.id || ''
    const models = window.Campaign?.characters?.models || []
    const characters = models
      .filter(c => {
        if (isGm) return true                                  // GM: alle Charaktere
        const ctrl = (c.get('controlledby') || '').split(',').map(s => s.trim())
        return ctrl.includes('all') || ctrl.includes(myId)     // Spieler: nur eigene/geteilte
      })
      .map(c => ({ id: c.id, name: c.get('name') || '(Unnamed)' }))
    window.postMessage({ [AE_FROM_PAGE]: true, type: 'CHARACTERS', characters, meta: readMeta() }, '*')
  } catch (e) {
    window.postMessage({ [AE_FROM_PAGE]: true, type: 'CHARACTERS', characters: [], meta: readMeta() }, '*')
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
