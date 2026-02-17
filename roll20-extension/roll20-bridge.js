// Content script injected into Roll20 (app.roll20.net/editor/*)
// Receives brew events from the background worker and posts them to Roll20 chat.

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== 'BREW_POTION') return
  const { potion } = msg

  postBrewCard(potion)

  // Post the !brew-sync command 600ms later so the chat card appears first
  setTimeout(() => postBrewSync(potion), 600)
})

// ── Chat card (visible to all players) ────────────────────────────────────
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
    `{{name=🧪 Aetherial Brew}}`,
    `{{Potion=${potion.name}}}`,
    `{{Effect=${potion.effect}}}`,
    `{{Quality=${qualityEmoji} ${potion.quality}}}`,
    `{{Roll=d20: ${rollText} + ${potion.modifier >= 0 ? '+' : ''}${potion.modifier} = ${potion.total} vs DC ${potion.dc}}}`,
    `{{Brew Time=${potion.brewTime}}}`,
  ]

  postToChat(lines.join(' '))
}

// ── Sync command for the Mod Script ───────────────────────────────────────
function postBrewSync(potion) {
  if (!potion.success) return // Only sync successful brews to inventory

  const cmd = [
    `!brew-sync`,
    `--name "${potion.name}"`,
    `--effect "${potion.effect}"`,
    `--quality "${potion.quality}"`,
    `--qty 1`,
  ].join(' ')

  postToChat(cmd)
}

// ── Chat injection ────────────────────────────────────────────────────────
function postToChat(msg) {
  // Roll20 wraps the textarea in a React component — we bypass its setter
  const input = document.querySelector('#textchat-input textarea')
  const btn   = document.querySelector('#textchat-input button[type="submit"]')
               ?? document.querySelector('#textchat-input .btn')

  if (!input || !btn) {
    console.warn('[Aetherial] Could not find Roll20 chat input. Selectors may have changed.')
    return
  }

  // Trigger React's synthetic onChange by using the native value setter
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set
  nativeSetter.call(input, msg)
  input.dispatchEvent(new Event('input', { bubbles: true }))

  setTimeout(() => btn.click(), 80)
}
