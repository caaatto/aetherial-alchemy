// Content script injected into Roll20 (app.roll20.net/editor/*)
// Receives brew events from the background worker and posts them to Roll20 chat.

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== 'BREW_POTION') return
  postBrewCard(msg.potion)
})

// ── Chat card ──────────────────────────────────────────────────────────────
// Data for the Mod Script is embedded as hidden {{aetherial-*=value}} fields.
// These appear as extra rows in the default template, which the Mod Script reads.
// This avoids a separate !brew-sync message whose arguments Roll20 strips.
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
    `{{name=Aetherial Brew}}`,
    `{{Potion=${potion.name}}}`,
    `{{Effect=${potion.effect}}}`,
    `{{Quality=${qualityEmoji} ${potion.quality}}}`,
    `{{Roll=d20: ${rollText} + ${potion.modifier >= 0 ? '+' : ''}${potion.modifier} = ${potion.total} vs DC ${potion.dc}}}`,
    `{{Brew Time=${potion.brewTime}}}`,
  ]

  // Embed inventory data for AetherialSync Mod Script (only on success)
  if (potion.success) {
    lines.push(`{{aetherial-name=${potion.name}}}`)
    lines.push(`{{aetherial-effect=${potion.effect}}}`)
    lines.push(`{{aetherial-quality=${potion.quality}}}`)
    lines.push(`{{aetherial-sync=1}}`)
  }

  postToChat(lines.join(' '))
}

// ── Chat injection ────────────────────────────────────────────────────────
function postToChat(msg) {
  const input = document.querySelector('#textchat-input textarea')
  const btn   = document.querySelector('#textchat-input button[type="submit"]')
               ?? document.querySelector('#textchat-input .btn')

  if (!input || !btn) {
    console.warn('[Aetherial] Could not find Roll20 chat input.')
    return
  }

  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set
  nativeSetter.call(input, msg)
  input.dispatchEvent(new Event('input', { bubbles: true }))
  setTimeout(() => btn.click(), 80)
}
