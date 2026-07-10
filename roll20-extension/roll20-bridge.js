// ═══════════════════════════════════════════════════════════════════════════
// Aetherial Alchemy — Roll20 Sidebar
// Self-contained content script injected into app.roll20.net/editor/*
// No tab messaging needed — everything runs on the Roll20 page directly.
// ═══════════════════════════════════════════════════════════════════════════

;(async () => {

// ── Potion icon + herb colour helpers (mirrors website logic) ─────────────────
const POTION_BASE = 'https://catto.at/alchemy/assets/potions/'

const POTION_ICONS = {
  healing:             { 1:'Small Vial - RED - 0000.png',        2:'Round Potion - RED - 0000.png',        3:'Big Vial - RED - 0000.png',           4:'Large Bottle - RED - 0000.png',    5:'Glowing Potion - RED - 0000.png' },
  mana:                { 1:'Small Vial - BLUE - 0000.png',       2:'Round Potion - BLUE - 0000.png',       3:'Big Vial - BLUE - 0000.png',          4:'Large Bottle - BLUE - 0000.png',   5:'Glowing Potion - CYAN - 0000.png' },
  combat:              { 1:'Small Bottle - PURPLE - 0000.png',   2:'Round Potion - PURPLE - 0000.png',     3:'Big Vial - PURPLE - 0000.png',        4:'Large Bottle - PURPLE - 0000.png', 5:'Glowing Potion - PURPLE - 0000.png' },
  stealth:             { 1:'Small Elixir - PURPLE -0000.png',    2:'Encased Potion - BROWN_PURPLE - 0000.png', 3:'Bubbly Brew Bottle - BLACK - 0000.png', 4:'Glowing Potion - BLACK - 0000.png' },
  transformation:      { 1:'Small Vial - PINK - 0000.png',      2:'Round Potion - MAGENTA - 0000.png',    3:'Bubbly Brew Bottle Rising - PINK - 0000.png', 4:'Large Bottle - PINK - 0000.png', 5:'Glowing Potion - PINK - 0000.png' },
  utility:             { 1:'Small Vial - LIME - 0000.png',       2:'Round Potion - LIME - 0000.png',       3:'Big Vial - LIME - 0000.png',          4:'Large Bottle - LIME - 0000.png',   5:'Glowing Potion - LIME - 0000.png' },
  protection:          { 1:'Small Bottle - GOLD - 0000.png',     2:'Classic Jar - GOLD - 0000.png',        3:'Large Jar - GOLD - 0000.png',         4:'Encased Potion - GOLD - 0000.png', 5:'Glowing Potion - GOLD - 0000.png' },
  hybrid:              { 1:'Small Bottle - PURPLE_LIME - 0000.png', 2:'Encased Potion - LIME_PURPLE - 0000.png', 3:'Classic Jar - BLUE_GOLD - 0000.png', 4:'Large Jar - TURQUOISE_GOLD - 0000.png', 5:'Bubbly Brew Bottle Rising - GOLD - 0000.png' },
  social:              { 1:'Small Elixir - PINK - 0000.png',     2:'Round Potion - MAGENTA - 0000.png',    3:'Encased Potion - GOLD_PURPLE - 0000.png', 4:'Large Bottle - PINK - 0000.png', 5:'Glowing Potion - PINK - 0000.png' },
  resistance_fire:     { 1:'Small Vial - ORANGE - 0000.png',    2:'Round Potion - ORANGE - 0000.png',     3:'Large Tonic - ORANGE - 0000.png',     4:'Glowing Potion - GOLD - 0000.png' },
  resistance_cold:     { 1:'Small Vial - TURQUOISE - 0000.png', 2:'Round Potion - TURQUOISE - 0000.png',  3:'Large Tonic - TURQUOISE - 0000.png',  4:'Glowing Potion - CYAN - 0000.png' },
  resistance_lightning:{ 1:'Small Vial - YELLOW - 0000.png',    2:'Round Potion - YELLOW - 0000.png',     3:'Large Tonic - YELLOW - 0000.png' },
  resistance_poison:   { 1:'Small Vial - GREEN - 0000.png',     2:'Round Potion - GREEN - 0000.png',      3:'Large Tonic - GREEN - 0000.png',      4:'Glowing Potion - GREEN - 0000.png' },
  resistance:          { 1:'Small Bottle - TEAL - 0000.png',    2:'Classic Jar - TEAL - 0000.png',        3:'Large Jar - TEAL - 0000.png' },
}
const FALLBACK_ICONS = { 1:'Small Vial - GOLD - 0000.png', 2:'Round Potion - GOLD - 0000.png', 3:'Big Vial - GOLD - 0000.png', 4:'Large Bottle - GOLD - 0000.png', 5:'Glowing Potion - GOLD - 0000.png' }

function getPotionIcon(category, tier, name = '') {
  let key = category
  if (category === 'resistance') {
    const n = name.toLowerCase()
    if (n.includes('fire') || n.includes('feuer') || n.includes('drachen'))       key = 'resistance_fire'
    else if (n.includes('cold') || n.includes('eis') || n.includes('frost'))      key = 'resistance_cold'
    else if (n.includes('lightning') || n.includes('blitz') || n.includes('sturm')) key = 'resistance_lightning'
    else if (n.includes('poison') || n.includes('gift'))                           key = 'resistance_poison'
  }
  const map  = POTION_ICONS[key] || FALLBACK_ICONS
  const file = map[tier] || map[1] || FALLBACK_ICONS[1]
  return POTION_BASE + encodeURIComponent(file)
}

const HERB_COLORS = {
  wolfsfarn:{hue:10,saturation:1.3},       eisenkraut:{hue:0,saturation:1.1,brightness:1.1},
  feuerblute:{hue:30,saturation:1.5},      glutwurz:{hue:35,saturation:1.6},
  sonnenlaub:{hue:50,saturation:1.4},      wiesensalbei:{hue:55,saturation:1.2},
  blitzgras:{hue:60,saturation:1.6,brightness:1.2}, sturmklee:{hue:65,saturation:1.4},
  waldfarn:{hue:110,saturation:1.3},       wanderkraut:{hue:100,saturation:1.2},
  todeswurz:{hue:130,saturation:1.2,brightness:0.8}, bitterlaub:{hue:125,saturation:1.1,brightness:0.9},
  alraunenkraut:{hue:145,saturation:1.4},  ewiggrün:{hue:150,saturation:1.5,brightness:1.1},
  eisblume:{hue:180,saturation:1.4},       frostfarn:{hue:185,saturation:1.3},
  elfenhaar:{hue:190,saturation:0.9},      mondkresse:{hue:210,saturation:1.4},
  mondfarn:{hue:220,saturation:1.4},       schattenkraut:{hue:270,saturation:1.3,brightness:0.8},
  schattenmondblute:{hue:275,saturation:1.4,brightness:0.7}, nachtflieder:{hue:280,saturation:1.3},
  dammerungslilie:{hue:285,saturation:1.2}, bergveilchen:{hue:280,saturation:1.1},
  orgain:{hue:30,saturation:0.8},          manndrache:{hue:30,saturation:0.9,brightness:0.9},
  phonixfederkraut:{hue:15,saturation:2.0,brightness:1.3}, gotterbalsam:{hue:50,saturation:1.8,brightness:1.4},
  drachenauge:{hue:10,saturation:1.8,brightness:1.4}, runenwurz:{hue:280,saturation:1.5,brightness:1.2},
  drachenmelisse:{hue:20,saturation:1.6,brightness:1.2}, silberspross:{hue:0,saturation:0.3,brightness:1.3},
  silberweide:{hue:0,saturation:0.2,brightness:1.4}, hexenholz:{hue:275,saturation:0.9,brightness:0.6},
  sternenfeuerkraut:{hue:220,saturation:1.5,brightness:1.5}, geisterzunge:{hue:270,saturation:0.7,brightness:1.3},
  rote_lotusblute:{hue:355,saturation:1.6,brightness:0.9},
}

function getHerbColorFilter(herbId) {
  const c = HERB_COLORS[herbId]
  if (!c) return ''
  return `hue-rotate(${c.hue}deg) saturate(${c.saturation}) brightness(${c.brightness || 1})`
}

function recipeIcon(recipe) {
  const src    = getPotionIcon(recipe.category, recipe.tier, recipe.name)
  const filter = getHerbColorFilter(recipe.ingredients?.[0]?.id)
  return `<img class="ae-potion-img" src="${src}" alt="" style="filter:${filter}">`
}

// ── Load data: REST API (catto.at/api/v1) with extension bundle fallback ────────
const API_BASE    = 'https://catto.at/api/v1'
const BUNDLE_BASE = 'https://catto.at/alchemy'

// Normalize API response: unwrap { data: [...] } or { herbs: [...] } etc.
function unwrap(json, keys) {
  for (const k of keys) { if (Array.isArray(json[k])) return json[k] }
  return Array.isArray(json) ? json : []
}

async function fetchFromApi(apiPath, bundlePath, unwrapKeys) {
  // 1. Try REST API
  try {
    const res = await fetch(`${API_BASE}${apiPath}`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      const arr  = unwrap(json, unwrapKeys)
      if (arr.length) return arr
    }
  } catch (_) { /* API unavailable */ }
  // 2. Try static file from catto.at
  try {
    const res = await fetch(`${BUNDLE_BASE}/${bundlePath}`, { cache: 'no-store' })
    if (res.ok) return res.json()
  } catch (_) { /* offline */ }
  // 3. Fall back to bundled extension file
  return fetch(chrome.runtime.getURL(bundlePath)).then(r => r.json())
}


const [herbs, recipes] = await Promise.all([
  fetchFromApi('/herbs',   'herbs.json',   ['herbs',   'data', 'items']),
  fetchFromApi('/potions', 'recipes.json', ['potions', 'recipes', 'data', 'items']),
])

// ── Storage helpers (per-character inventory) ─────────────────────────────────
// Storage key: ae_inv_<characterId>  →  { ingredients: { herbId: count, ... } }

async function getInventory(charId) {
  if (!charId) return { ingredients: {}, potions: {} }
  const key = `ae_inv_${charId}`
  const result = await chrome.storage.local.get(key)
  const inv = result[key] || {}
  if (!inv.ingredients) inv.ingredients = {}
  if (!inv.potions)     inv.potions     = {}
  return inv
}

async function saveInventory(charId, inv) {
  if (!charId) return
  inv.updatedAt = Date.now()   // client-side change timestamp, drives join sync
  await chrome.storage.local.set({ [`ae_inv_${charId}`]: inv })
  reportInventory(charId, inv)
}

// ── Report inventory to the backend (powers the GM live dashboard) ────────────
// Keyed by Roll20 campaign id ("room") + character id. Fire-and-forget;
// failures are silent so the sidebar keeps working offline.
function reportInventory(charId, inv) {
  if (!charId || !state.roomId) return
  fetch(`${API_BASE}/rooms/${encodeURIComponent(state.roomId)}/inventory`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      characterId:   charId,
      characterName: state.charName || charId,
      playerName:    state.playerName || '',
      ingredients:   inv.ingredients || {},
      potions:       inv.potions || {},
      updatedAt:     inv.updatedAt || 0,
    }),
  }).catch(() => { /* offline / backend down — ignore */ })
}

// ── Server sync: join-time reconciliation + live GM grants ────────────────────
// The server keeps a copy of each inventory (see reportInventory) plus a queue
// of GM grants. On character select we reconcile local vs server copy by client
// timestamp (newer wins — covers "new device" and "played offline"), then apply
// pending grants. While in the game, a per-character SSE stream delivers new
// grants instantly. Grants are acked after applying; already-seen grant ids are
// remembered locally so a failed ack can't duplicate items.

function grantsUrl(charId, suffix = '') {
  return `${API_BASE}/rooms/${encodeURIComponent(state.roomId)}/grants/${encodeURIComponent(charId)}${suffix}`
}

async function syncInventoryFromServer(charId) {
  if (!charId || !state.roomId) return
  try {
    const res = await fetch(
      `${API_BASE}/rooms/${encodeURIComponent(state.roomId)}/inventory/${encodeURIComponent(charId)}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return
    const server = await res.json()
    if (!server.exists) {
      reportInventory(charId, state.inventory)   // first contact — seed the server copy
      return
    }
    const localTs  = state.inventory.updatedAt || 0
    const serverTs = server.clientUpdatedAt || 0
    if (serverTs > localTs) {
      // Server copy is newer (e.g. played on another device) — take it.
      state.inventory = {
        ingredients: server.ingredients || {},
        potions:     server.potions || {},
        updatedAt:   serverTs,
      }
      await chrome.storage.local.set({ [`ae_inv_${charId}`]: state.inventory })
    } else {
      // Local is same or newer (e.g. brewed while backend was down) — push it.
      reportInventory(charId, state.inventory)
    }
  } catch (_) { /* offline / backend down — keep local */ }
}

// Apply GM grants to the local inventory, then ack them. Fresh grants only:
// ids we already applied (ack lost?) are re-acked without adding items again.
async function applyGrants(charId, grantList) {
  if (!charId || charId !== state.charId || !grantList?.length) return
  const seenKey = `ae_grants_seen_${charId}`
  const seen = new Set((await chrome.storage.local.get(seenKey))[seenKey] || [])
  const fresh = grantList.filter(g => g.grantId && !seen.has(g.grantId))

  if (fresh.length) {
    const inv = state.inventory
    if (!inv.ingredients) inv.ingredients = {}
    if (!inv.potions)     inv.potions     = {}
    const received = []
    for (const g of fresh) {
      const map = g.kind === 'potion' ? inv.potions : inv.ingredients
      map[g.id] = (map[g.id] || 0) + g.count
      received.push(`${g.count}× ${g.name || g.id}`)
      seen.add(g.grantId)
    }
    await chrome.storage.local.set({ [seenKey]: [...seen].slice(-300) })
    await saveInventory(charId, inv)   // persists + pushes merged state to server
    showToast(`🎁 Vom GM erhalten: ${received.join(', ')}`)
    renderInventory()
    renderBrew()
  }

  fetch(grantsUrl(charId, '/ack'), {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grantIds: grantList.map(g => g.grantId) }),
  }).catch(() => { /* ack retried on next delivery — seen-list prevents doubles */ })
}

async function fetchPendingGrants(charId) {
  if (!charId || !state.roomId) return
  try {
    const res = await fetch(grantsUrl(charId), { cache: 'no-store' })
    if (!res.ok) return
    const data = await res.json()
    await applyGrants(charId, data.grants || [])
  } catch (_) { /* offline — grants stay queued on the server */ }
}

// Live delivery while playing: per-character SSE feed (auto-reconnects).
function connectGrantStream(charId) {
  if (state.grantSource) { state.grantSource.close(); state.grantSource = null }
  if (!charId || !state.roomId) return
  try {
    const src = new EventSource(grantsUrl(charId, '/stream'))
    src.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        applyGrants(charId, data.grants || [])
      } catch (_) { /* ignore malformed frame */ }
    }
    state.grantSource = src
  } catch (_) { /* EventSource unavailable */ }
}

// Small transient notification, visible even when the sidebar is closed.
function showToast(msg) {
  const t = document.createElement('div')
  t.className = 'ae-toast'
  t.textContent = msg
  document.body.appendChild(t)
  setTimeout(() => t.remove(), 8000)
}

// ── State ─────────────────────────────────────────────────────────────────────
let state = {
  charId:     null,
  charName:   '',
  inventory:  { ingredients: {} },
  characters: [],
  tab:        'brew',          // 'inventory' | 'brew' | 'recipes' | 'herbs' | 'gm'
  selectedRecipe: null,
  modifier:   0,
  brewResult: null,
  herbSearch: '',
  // GM live dashboard
  roomId:     '',              // Roll20 campaign id — the "room" key
  playerName: '',
  isGm:       false,
  gmPlayers:  [],              // live snapshot from backend (other players' inventories)
  gmSource:   null,            // EventSource handle (GM room feed)
  grantSource: null,           // EventSource handle (own character's GM-grant feed)
  // Import from Roll20 sheet
  importing:     false,
  importSummary: null,         // { total, herbs:[], potions:[], unmatched:[], error? }
}

// ── Build DOM ─────────────────────────────────────────────────────────────────
function buildSidebar() {
  // Toggle button
  const toggle = document.createElement('div')
  toggle.id = 'ae-toggle'
  toggle.textContent = '⚗'
  toggle.title = 'Aetherial Alchemy'
  toggle.addEventListener('click', toggleSidebar)
  document.body.appendChild(toggle)

  // Sidebar panel
  const sidebar = document.createElement('div')
  sidebar.id = 'ae-sidebar'
  sidebar.innerHTML = `
    <div id="ae-header">
      <div id="ae-header-top">
        <span id="ae-title">⚗ Aetherial Alchemy</span>
        <button id="ae-close">✕</button>
      </div>
      <select id="ae-char-select">
        <option value="">— Select Character —</option>
      </select>
    </div>

    <div id="ae-tabs">
      <button class="ae-tab" data-tab="inventory">Inventar</button>
      <button class="ae-tab active" data-tab="brew">Brauen</button>
      <button class="ae-tab" data-tab="recipes">Rezepte</button>
      <button class="ae-tab" data-tab="herbs">Kräuter</button>
      <button class="ae-tab" data-tab="gm" id="ae-tab-gm" style="display:none">GM</button>
    </div>

    <div id="ae-content">
      <div id="ae-panel-inventory" class="ae-panel"></div>
      <div id="ae-panel-brew"      class="ae-panel active"></div>
      <div id="ae-panel-recipes"   class="ae-panel"></div>
      <div id="ae-panel-herbs"     class="ae-panel"></div>
      <div id="ae-panel-gm"        class="ae-panel"></div>
    </div>
  `
  document.body.appendChild(sidebar)

  // Events
  document.getElementById('ae-close').addEventListener('click', toggleSidebar)
  document.getElementById('ae-char-select').addEventListener('change', onCharChange)
  document.querySelectorAll('.ae-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab))
  })
}

function toggleSidebar() {
  document.getElementById('ae-sidebar').classList.toggle('open')
}

function switchTab(tab) {
  state.tab = tab
  document.querySelectorAll('.ae-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab))
  document.querySelectorAll('.ae-panel').forEach(p => p.classList.toggle('active', p.id === `ae-panel-${tab}`))
  render()
}

async function onCharChange(e) {
  const sel = e.target
  state.charId   = sel.value
  state.charName = sel.options[sel.selectedIndex]?.text || ''
  state.inventory = await getInventory(state.charId)
  state.selectedRecipe = null
  state.brewResult     = null
  if (state.charId) {
    // Joining as this character: reconcile with the server copy (newer side
    // wins), collect queued GM grants, then listen for live ones.
    await syncInventoryFromServer(state.charId)
    await fetchPendingGrants(state.charId)
  }
  connectGrantStream(state.charId)
  render()
}

// ── Read characters from Roll20 (via roll20-page.js in MAIN world) ────────────
// window.Campaign lives in the page's JS context — not visible from here.
// roll20-page.js reads it and posts it back via postMessage.
function requestCharacters() {
  window.postMessage({ __ae_to_page: true, type: 'GET_CHARACTERS' }, '*')
}

window.addEventListener('message', (e) => {
  if (!e.data?.__ae_from_page || e.data.type !== 'CHARACTERS') return
  state.characters = e.data.characters || []
  if (e.data.meta) {
    state.roomId     = e.data.meta.campaignId || state.roomId
    state.playerName = e.data.meta.playerName || state.playerName
    state.isGm       = !!e.data.meta.isGm
  }
  populateCharSelect()
  updateGmTab()
  render()
})

function populateCharSelect() {
  const sel = document.getElementById('ae-char-select')
  if (!sel) return
  sel.innerHTML = '<option value="">— Select Character —</option>'
  state.characters.forEach(c => {
    const opt = document.createElement('option')
    opt.value = c.id
    opt.textContent = c.name
    sel.appendChild(opt)
  })
}

function loadCharacters() {
  requestCharacters()
}

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  renderInventory()
  renderBrew()
  renderRecipes()
  renderHerbs()
  renderGm()
}

// ─────────────────────────────────────────────────────────────────────────────
// Import from Roll20 sheet
// Reads the character's equipment via the `!brew-read` Mod Script command,
// matches item names against the herb + recipe DB (normalized + fuzzy),
// and imports matches into the sidebar inventory.
// ─────────────────────────────────────────────────────────────────────────────

// Ask the Mod Script for this player's sheet equipment; resolves with [{name, quantity}].
function readSheetInventory(timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const chatEl = document.querySelector('#textchat')
    if (!chatEl) { reject(new Error('chat-not-found')); return }
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          const text = node.textContent || ''
          const match = text.match(/AETHERIAL-INVENTORY:(\[.*\])/)
          if (match) {
            observer.disconnect(); clearTimeout(timer)
            try { resolve(JSON.parse(match[1])) } catch (_) { resolve([]) }
            return
          }
        }
      }
    })
    observer.observe(chatEl, { childList: true, subtree: true })
    const timer = setTimeout(() => { observer.disconnect(); reject(new Error('timeout')) }, timeoutMs)
    postToChat('!brew-read')
  })
}

// Normalize a name for matching: lowercase, strip diacritics + punctuation, collapse spaces.
function normName(s) {
  return (s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ').trim()
}

function levenshtein(a, b) {
  const m = a.length, n = b.length
  if (!m) return n
  if (!n) return m
  let prev = Array.from({ length: n + 1 }, (_, j) => j)
  let curr = new Array(n + 1)
  for (let i = 1; i <= m; i++) {
    curr[0] = i
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
    }
    ;[prev, curr] = [curr, prev]
  }
  return prev[n]
}

// Build the search index once (herbs + recipes), reused across imports.
let _matchIndex = null
function matchIndex() {
  if (_matchIndex) return _matchIndex
  _matchIndex = [
    ...herbs.map(h => ({ kind: 'herb', id: h.id, name: h.name, n: normName(h.name) })),
    ...recipes.map(r => ({ kind: 'potion', id: r.id, name: r.name, n: normName(r.name) })),
  ].filter(c => c.n)
  return _matchIndex
}

// Best fuzzy match for a sheet item name, or null below the confidence threshold.
function bestMatch(rawName) {
  const q = normName(rawName)
  if (q.length < 3) return null
  let best = null
  for (const c of matchIndex()) {
    let score = 0
    if (c.n === q) score = 1
    else if (c.n.length >= 4 && q.includes(c.n)) score = 0.92
    else if (q.length >= 4 && c.n.includes(q)) score = 0.88
    else {
      const sim = 1 - levenshtein(q, c.n) / Math.max(q.length, c.n.length)
      if (sim >= 0.82) score = sim
    }
    if (score > (best?.score || 0)) best = { ...c, score }
  }
  return best && best.score >= 0.82 ? best : null
}

function renderImportSummary() {
  const s = state.importSummary
  if (!s) return ''
  if (s.error) {
    const hint = s.error === 'timeout'
      ? 'Roll20 hat nicht geantwortet — läuft das AetherialSync Mod-Script?'
      : s.error === 'chat-not-found' ? 'Chat nicht gefunden.' : s.error
    return `<div class="ae-import-summary ae-import-err">⚠ ${hint}</div>`
  }
  if (!s.total) return '<div class="ae-import-summary">Keine Items auf dem Bogen gefunden.</div>'
  let h = '<div class="ae-import-summary">'
  h += `<div class="ae-import-ok">✓ Importiert: ${s.herbs.length} Kräuter, ${s.potions.length} Tränke</div>`
  if (s.herbs.length)   h += `<div class="ae-import-list">🌿 ${s.herbs.join(', ')}</div>`
  if (s.potions.length) h += `<div class="ae-import-list">⚗ ${s.potions.join(', ')}</div>`
  if (s.unmatched.length) h += `<div class="ae-import-unmatched">Nicht zugeordnet (${s.unmatched.length}): ${s.unmatched.join(', ')}</div>`
  h += '</div>'
  return h
}

async function importFromRoll20() {
  if (!state.charId || state.importing) return
  state.importing = true
  state.importSummary = null
  renderInventory()

  let items
  try {
    items = await readSheetInventory()
  } catch (e) {
    state.importing = false
    state.importSummary = { error: e.message }
    renderInventory()
    return
  }

  const inv = state.inventory
  if (!inv.ingredients) inv.ingredients = {}
  if (!inv.potions) inv.potions = {}

  const herbsAdded = [], potionsAdded = [], unmatched = []
  for (const it of items) {
    const qty = Math.max(1, parseInt(it.quantity, 10) || 1)
    const m = bestMatch(it.name)
    if (!m) { unmatched.push(it.name || '?'); continue }
    if (m.kind === 'herb') {
      inv.ingredients[m.id] = (inv.ingredients[m.id] || 0) + qty
      herbsAdded.push(`${m.name} ×${qty}`)
    } else {
      inv.potions[m.id] = (inv.potions[m.id] || 0) + qty
      potionsAdded.push(`${m.name} ×${qty}`)
    }
  }

  await saveInventory(state.charId, inv)   // also reports to the GM dashboard

  state.importing = false
  state.importSummary = { total: items.length, herbs: herbsAdded, potions: potionsAdded, unmatched }
  renderInventory()
  renderBrew()
}

// ─────────────────────────────────────────────────────────────────────────────
// GM live dashboard (only for the GM) — subscribes to the backend SSE feed
// and shows every player's herbs + potions, updating live.
// ─────────────────────────────────────────────────────────────────────────────
function updateGmTab() {
  const tab = document.getElementById('ae-tab-gm')
  if (tab) tab.style.display = state.isGm ? '' : 'none'
  if (state.isGm) connectGmStream()
}

function connectGmStream() {
  if (state.gmSource || !state.roomId) return
  try {
    const src = new EventSource(`${API_BASE}/rooms/${encodeURIComponent(state.roomId)}/stream`)
    src.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        state.gmPlayers = data.players || []
        renderGm()
      } catch (_) { /* ignore malformed frame */ }
    }
    // EventSource auto-reconnects on error — nothing to do.
    state.gmSource = src
  } catch (_) { /* EventSource unavailable */ }
}

function gmItemRows(items) {
  if (!items || !items.length) return '<div class="ae-empty" style="margin:2px 0">—</div>'
  return items.map(i =>
    `<div class="ae-herb-row"><span class="ae-herb-name">${i.name}</span><span class="ae-herb-count">×${i.count}</span></div>`
  ).join('')
}

// GM grant form: hand out herbs/potions to a character. POSTs to the grants
// queue; the player's extension applies it live (or on next join).
function gmGrantFormHtml() {
  let charOpts = '<option value="">— Charakter —</option>'
  state.characters.forEach(c => { charOpts += `<option value="${c.id}">${c.name}</option>` })

  const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']
  let itemOpts = '<option value="">— Item —</option>'
  rarityOrder.forEach(rarity => {
    const group = herbs.filter(h => h.rarity === rarity)
    if (!group.length) return
    itemOpts += `<optgroup label="🌿 ${rarity}">`
    group.forEach(h => { itemOpts += `<option value="herb:${h.id}">${h.name}</option>` })
    itemOpts += '</optgroup>'
  })
  itemOpts += '<optgroup label="⚗ Tränke">'
  recipes.forEach(r => { itemOpts += `<option value="potion:${r.id}">${r.name}</option>` })
  itemOpts += '</optgroup>'

  return `
    <div class="ae-gm-grant">
      <div class="ae-section-title">🎁 Items verteilen</div>
      <div class="ae-add-herb-row">
        <select id="ae-gm-grant-char">${charOpts}</select>
      </div>
      <div class="ae-add-herb-row">
        <select id="ae-gm-grant-item">${itemOpts}</select>
        <input id="ae-gm-grant-amt" type="number" value="1" min="1" max="99">
        <button id="ae-gm-grant-btn">🎁</button>
      </div>
      <div id="ae-gm-grant-msg" class="ae-gm-grant-msg"></div>
    </div>`
}

async function gmSendGrant() {
  const charSel = document.getElementById('ae-gm-grant-char')
  const itemSel = document.getElementById('ae-gm-grant-item')
  const amt     = parseInt(document.getElementById('ae-gm-grant-amt')?.value) || 1
  const msgEl   = document.getElementById('ae-gm-grant-msg')
  const charId  = charSel?.value
  const [kind, itemId] = (itemSel?.value || '').split(':')
  if (!charId || !itemId) return

  const charName = charSel.options[charSel.selectedIndex]?.text || charId
  const itemName = itemSel.options[itemSel.selectedIndex]?.text || itemId
  try {
    const res = await fetch(grantsUrl(charId), {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, id: itemId, count: amt }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    if (msgEl) msgEl.textContent = `✓ ${amt}× ${itemName} → ${charName}`
    itemSel.value = ''
  } catch (_) {
    if (msgEl) msgEl.textContent = '⚠ Backend nicht erreichbar'
  }
}

function renderGm() {
  const el = document.getElementById('ae-panel-gm')
  if (!el) return

  if (!state.roomId) {
    el.innerHTML = '<p class="ae-empty">Keine Campaign-ID gefunden. Lade die Roll20-Seite neu.</p>'
    return
  }

  // Live SSE updates re-render this panel — keep the GM's form input alive.
  const keep = {
    char: document.getElementById('ae-gm-grant-char')?.value || '',
    item: document.getElementById('ae-gm-grant-item')?.value || '',
    amt:  document.getElementById('ae-gm-grant-amt')?.value || '1',
    msg:  document.getElementById('ae-gm-grant-msg')?.textContent || '',
  }

  const dashUrl = `${API_BASE}/gm?room=${encodeURIComponent(state.roomId)}`
  let html = `<div class="ae-gm-head">
      <div class="ae-gm-room">Room: <code>${state.roomId}</code></div>
      <a class="ae-gm-link" href="${dashUrl}" target="_blank" rel="noreferrer">Vollbild-Dashboard ↗</a>
    </div>
    ${gmGrantFormHtml()}`

  if (!state.gmPlayers.length) {
    html += '<p class="ae-empty">Noch keine Spielerdaten gemeldet. Spieler müssen die Sidebar öffnen und ihren Charakter wählen.</p>'
  }

  state.gmPlayers.forEach(p => {
    html += `
      <div class="ae-gm-player">
        <div class="ae-gm-player-head">
          <span class="ae-gm-char">${p.characterName}</span>
          ${p.playerName ? `<span class="ae-gm-pname">${p.playerName}</span>` : ''}
          ${p.pendingGrants ? `<span class="ae-gm-pending" title="Vergeben, aber vom Spieler noch nicht abgeholt">🎁 ${p.pendingGrants} ausstehend</span>` : ''}
        </div>
        <div class="ae-section-title">Kräuter</div>
        ${gmItemRows(p.ingredients)}
        <div class="ae-section-title">Tränke</div>
        ${gmItemRows(p.potions)}
      </div>`
  })

  el.innerHTML = html

  const charSel = document.getElementById('ae-gm-grant-char')
  const itemSel = document.getElementById('ae-gm-grant-item')
  const amtEl   = document.getElementById('ae-gm-grant-amt')
  const msgEl   = document.getElementById('ae-gm-grant-msg')
  if (charSel) charSel.value = keep.char
  if (itemSel) itemSel.value = keep.item
  if (amtEl)   amtEl.value   = keep.amt
  if (msgEl)   msgEl.textContent = keep.msg
  document.getElementById('ae-gm-grant-btn')?.addEventListener('click', gmSendGrant)
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: INVENTAR
// ─────────────────────────────────────────────────────────────────────────────
function renderInventory() {
  const el = document.getElementById('ae-panel-inventory')
  if (!el) return

  if (!state.charId) {
    el.innerHTML = '<p class="ae-empty">Zuerst einen Character auswählen.</p>'
    return
  }

  const ings    = state.inventory.ingredients || {}
  const entries = Object.entries(ings)

  // ── Add-herb form ─────────────────────────────────────────────────────────
  const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']

  // Build herb options grouped by rarity
  let optHtml = '<option value="">— Kraut wählen —</option>'
  rarityOrder.forEach(rarity => {
    const group = herbs.filter(h => h.rarity === rarity)
    if (!group.length) return
    optHtml += `<optgroup label="${rarity}">`
    group.forEach(h => { optHtml += `<option value="${h.id}">${h.name}</option>` })
    optHtml += '</optgroup>'
  })

  let html = `
    <div class="ae-add-herb-form">
      <div class="ae-add-herb-row">
        <select id="ae-herb-pick">${optHtml}</select>
        <input id="ae-herb-amt" type="number" value="1" min="1" max="99">
        <button id="ae-herb-add-btn">+</button>
      </div>
      <button id="ae-import-btn" class="ae-btn-import" ${state.importing || !state.charId ? 'disabled' : ''}>
        ${state.importing ? '⏳ Lese Bogen…' : '⬇ Aus Roll20-Bogen importieren'}
      </button>
    </div>
    ${renderImportSummary()}`

  // ── Current herbs ─────────────────────────────────────────────────────────
  if (entries.length === 0) {
    html += '<p class="ae-empty" style="margin-top:12px">Keine Kräuter im Inventar.</p>'
  } else {
    const byRarity = {}
    entries.forEach(([id, count]) => {
      const herb   = herbs.find(h => h.id === id)
      const rarity = herb?.rarity || 'Common'
      if (!byRarity[rarity]) byRarity[rarity] = []
      byRarity[rarity].push({ id, count, herb })
    })

    rarityOrder.forEach(rarity => {
      if (!byRarity[rarity]) return
      const slug = rarity.toLowerCase().replace(' ', '-')
      html += `<div class="ae-section-title"><span class="ae-rarity ae-rarity-${slug}">${rarity}</span></div>`
      byRarity[rarity].forEach(({ id, count, herb }) => {
        html += `
          <div class="ae-herb-row">
            <span class="ae-herb-name">${herb?.name || id}</span>
            <button class="ae-btn-sm" data-action="sub-herb" data-id="${id}">−</button>
            <span class="ae-herb-count">${count}</span>
            <button class="ae-btn-sm" data-action="add-herb" data-id="${id}">+</button>
            <button class="ae-btn-sm ae-btn-push" data-action="push-herb" data-id="${id}" data-name="${herb?.name || id}" data-qty="${count}" ${!state.charId ? 'disabled title="Kein Charakter ausgewählt"' : ''}>⬆</button>
          </div>`
      })
    })
  }

  // ── Brewed potions ────────────────────────────────────────────────────────
  const potionEntries = Object.entries(state.inventory.potions || {}).filter(([, c]) => c > 0)
  if (potionEntries.length > 0) {
    html += '<div class="ae-section-title">Tränke</div>'
    potionEntries.forEach(([recipeId, count]) => {
      const recipe = recipes.find(r => r.id === recipeId)
      if (!recipe) return
      html += `
        <div class="ae-herb-row">
          <span class="ae-herb-name">${recipeIcon(recipe)} ${recipe.name}</span>
          <button class="ae-btn-sm" data-action="sub-potion" data-id="${recipeId}">−</button>
          <span class="ae-herb-count">${count}</span>
          <button class="ae-btn-sm" data-action="add-potion" data-id="${recipeId}">+</button>
          <button class="ae-btn-sm ae-btn-push" data-action="push-potion" data-id="${recipeId}" data-qty="${count}" ${!state.charId ? 'disabled title="Kein Charakter ausgewählt"' : ''}>⬆</button>
        </div>`
    })
  }

  el.innerHTML = html

  // Add herb button
  document.getElementById('ae-herb-add-btn')?.addEventListener('click', async () => {
    const pick = document.getElementById('ae-herb-pick')
    const amt  = parseInt(document.getElementById('ae-herb-amt')?.value) || 1
    const id   = pick?.value
    if (!id) return
    const inv = state.inventory
    inv.ingredients[id] = (inv.ingredients[id] || 0) + amt
    await saveInventory(state.charId, inv)
    pick.value = ''
    renderInventory()
    renderBrew()
  })

  // Import-from-Roll20 button
  document.getElementById('ae-import-btn')?.addEventListener('click', importFromRoll20)

  // +/− buttons
  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id     = btn.dataset.id
      const action = btn.dataset.action
      const inv    = state.inventory

      if (action === 'add-herb' || action === 'sub-herb') {
        const cur = inv.ingredients[id] || 0
        if (action === 'add-herb') {
          inv.ingredients[id] = cur + 1
        } else {
          if (cur <= 1) delete inv.ingredients[id]
          else inv.ingredients[id] = cur - 1
        }
        renderBrew()
      } else if (action === 'add-potion' || action === 'sub-potion') {
        if (!inv.potions) inv.potions = {}
        const cur = inv.potions[id] || 0
        if (action === 'add-potion') {
          inv.potions[id] = cur + 1
        } else {
          if (cur <= 1) delete inv.potions[id]
          else inv.potions[id] = cur - 1
        }
      } else if (action === 'push-herb') {
        const herbObj = herbs.find(h => h.id === id)
        postPushCard({
          name:        btn.dataset.name || id,
          quantity:    parseInt(btn.dataset.qty) || 1,
          description: herbObj ? herbObj.rarity + ' Herb — ' + (herbObj.description || '').slice(0, 100) : '',
        }, state.charId)
        return
      } else if (action === 'push-potion') {
        const recipe = recipes.find(r => r.id === id)
        if (!recipe) return
        postPushCard({
          name:        recipe.name,
          quantity:    parseInt(btn.dataset.qty) || 1,
          description: recipe.effect || '',
        }, state.charId)
        return
      }

      await saveInventory(state.charId, inv)
      renderInventory()
    })
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: BRAUEN
// ─────────────────────────────────────────────────────────────────────────────
function checkAvailability(recipe) {
  if (!recipe.ingredients?.length) return { available: true, missing: [] }
  const ings = state.inventory.ingredients || {}
  const missing = []
  for (const req of recipe.ingredients) {
    const have = ings[req.id] || 0
    if (have < req.amount) {
      const herb = herbs.find(h => h.id === req.id)
      missing.push({ name: herb?.name || req.id, have, need: req.amount })
    }
  }
  return { available: missing.length === 0, missing }
}

function renderBrew() {
  const el = document.getElementById('ae-panel-brew')
  if (!el) return

  // Show brew result if we just brewed
  if (state.brewResult) {
    renderBrewResult(el)
    return
  }

  // If a recipe is selected, show the brew action
  if (state.selectedRecipe) {
    renderBrewAction(el)
    return
  }

  // Otherwise show recipe list
  let html = ''
  recipes.forEach(recipe => {
    const { available, missing } = checkAvailability(recipe)
    const slug = recipe.rarity.toLowerCase().replace(' ', '-')
    const missingHtml = missing.length
      ? `<div class="ae-missing">⚠ Missing: ${missing.map(m => `${m.name} (${m.have}/${m.need})`).join(', ')}</div>`
      : ''
    html += `
      <div class="ae-recipe-card ${available ? '' : 'unavailable'}" data-id="${recipe.id}">
        <div class="ae-recipe-header">
          <span class="ae-recipe-name">${recipeIcon(recipe)} ${recipe.name}</span>
          <span class="ae-rarity ae-rarity-${slug}">${recipe.rarity}</span>
        </div>
        <div class="ae-recipe-meta">DC ${recipe.dc} · ${recipe.brewTime}</div>
        ${recipe.effect ? `<div class="ae-recipe-effect">${recipe.effect}</div>` : ''}
        ${missingHtml}
      </div>`
  })

  el.innerHTML = html || '<p class="ae-empty">Keine Rezepte verfügbar.</p>'

  el.querySelectorAll('.ae-recipe-card:not(.unavailable)').forEach(card => {
    card.addEventListener('click', () => {
      state.selectedRecipe = recipes.find(r => r.id === card.dataset.id)
      state.brewResult = null
      renderBrew()
    })
  })
}

function renderBrewAction(el) {
  const recipe = state.selectedRecipe
  const slug   = recipe.rarity.toLowerCase().replace(' ', '-')
  el.innerHTML = `
    <div id="ae-brew-area">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <h4>${recipeIcon(recipe)} ${recipe.name}</h4>
        <button class="ae-btn-back" id="ae-brew-back">← Zurück</button>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:10px;font-size:12px;color:#888">
        <span><span class="ae-rarity ae-rarity-${slug}">${recipe.rarity}</span></span>
        <span>DC ${recipe.dc}</span>
        <span>${recipe.brewTime}</span>
      </div>
      ${recipe.effect ? `<div style="font-size:12px;color:#aaa;margin-bottom:12px">${recipe.effect}</div>` : ''}
      <div class="ae-modifier-row">
        <label>Alchemy Bonus (Prof + Mod)</label>
        <input type="number" id="ae-modifier" value="${state.modifier}" min="-5" max="15">
      </div>
      <button class="ae-btn-brew" id="ae-brew-btn">🎲 Würfeln &amp; Brauen</button>
    </div>`

  document.getElementById('ae-brew-back').addEventListener('click', () => {
    state.selectedRecipe = null
    renderBrew()
  })
  document.getElementById('ae-modifier').addEventListener('input', e => {
    state.modifier = parseInt(e.target.value) || 0
  })
  document.getElementById('ae-brew-btn').addEventListener('click', doBrew)
}

function renderBrewResult(el) {
  const r      = state.brewResult
  const recipe = state.selectedRecipe

  const qualityEmoji = r.quality === 'Masterwork' ? '⭐' : r.quality === 'Superior' ? '✨' : r.quality === 'Failure' ? '❌' : r.quality === 'Critical Failure' ? '💀' : '✅'
  const critClass    = r.critSuccess ? 'ae-crit' : r.critFail ? 'ae-crit-fail' : ''

  el.innerHTML = `
    <div id="ae-brew-result" class="${r.success ? 'success' : 'failure'}">
      ${r.success ? `<div style="text-align:center;margin-bottom:10px">${recipeIcon(recipe)}</div>` : ''}
      <h4>${r.success ? '✅ Erfolg!' : '❌ Fehlgeschlagen!'}</h4>
      <div class="ae-result-roll">
        Würfel: <strong class="${critClass}">${r.roll}${r.critSuccess ? ' (Nat 20!)' : r.critFail ? ' (Nat 1!)' : ''}</strong>
        + ${r.modifier >= 0 ? '+' : ''}${r.modifier} = <strong>${r.total}</strong> vs DC ${r.dc}
      </div>
      <div class="ae-result-quality">${qualityEmoji} ${r.quality}</div>
      ${r.success ? `<div style="font-size:12px;color:#ccc;margin-bottom:6px">${r.scaledEffect || recipe?.effect || ''}</div>` : ''}
      ${r.success && r.multiplier > 1 ? `<div class="ae-result-bonus">${qualityEmoji} ${r.quality}: Wirkung ×${r.multiplier} (Würfel hochgerechnet)</div>` : ''}
      <button class="ae-btn-back" id="ae-brew-again">Weiteres Rezept brauen</button>
    </div>`

  document.getElementById('ae-brew-again').addEventListener('click', () => {
    state.selectedRecipe = null
    state.brewResult     = null
    renderBrew()
  })
}

// Quality → effect multiplier. Better brews produce stronger potions.
function qualityMultiplier(quality) {
  if (quality === 'Masterwork') return 1.5
  if (quality === 'Superior')   return 1.25
  return 1
}

// Scale the dice values in an effect string by the multiplier (counts + flat mods).
// Durations / flat words are left untouched. e.g. ('Heals 2d4+2 HP', 1.5) → 'Heals 3d4 + 3 HP'
function scaleEffect(effect, mult) {
  if (!effect || mult === 1) return effect
  const r = n => Math.max(1, Math.round(n * mult))
  return effect.replace(/(\d+)\s*d\s*(\d+)(\s*([+\-])\s*(\d+))?/gi,
    (_m, count, sides, _grp, sign, flat) =>
      `${r(+count)}d${sides}` + (flat ? ` ${sign} ${r(+flat)}` : ''))
}

async function doBrew() {
  const recipe = state.selectedRecipe
  if (!recipe) return

  const btn = document.getElementById('ae-brew-btn')
  if (btn) btn.disabled = true

  const roll       = Math.floor(Math.random() * 20) + 1
  const total      = roll + state.modifier
  const dc         = recipe.dc
  const success    = total >= dc
  const critSuccess = roll === 20
  const critFail   = roll === 1

  let quality = 'Normal'
  if      (critFail)            quality = 'Critical Failure'
  else if (!success)            quality = 'Failure'
  else if (critSuccess)         quality = 'Masterwork'
  else if (total >= dc + 5)     quality = 'Superior'

  // Consume ingredients + optionally add brewed potion — one save
  const inv = state.inventory
  if (!inv.potions) inv.potions = {}

  if (recipe.ingredients?.length) {
    for (const req of recipe.ingredients) {
      inv.ingredients[req.id] = (inv.ingredients[req.id] || 0) - req.amount
      if (inv.ingredients[req.id] <= 0) delete inv.ingredients[req.id]
    }
  }

  const brewSuccess = quality !== 'Failure' && quality !== 'Critical Failure'
  if (brewSuccess) {
    inv.potions[recipe.id] = (inv.potions[recipe.id] || 0) + 1
  }

  await saveInventory(state.charId, inv)

  const multiplier   = qualityMultiplier(quality)
  const scaledEffect = scaleEffect(recipe.effect || '', multiplier)

  state.brewResult = {
    roll, modifier: state.modifier, total, dc,
    success: success || critSuccess,
    quality, critSuccess, critFail,
    multiplier, scaledEffect,
  }

  // Post brew card to Roll20 chat
  postBrewCard(recipe, state.brewResult)

  renderBrew()
  renderInventory()
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: REZEPTE
// ─────────────────────────────────────────────────────────────────────────────
function renderRecipes() {
  const el = document.getElementById('ae-panel-recipes')
  if (!el) return

  const categories = [...new Set(recipes.map(r => r.category))]
  let html = ''

  categories.forEach(cat => {
    html += `<div class="ae-section-title">${cat.charAt(0).toUpperCase() + cat.slice(1)}</div>`
    recipes.filter(r => r.category === cat).forEach(recipe => {
      const slug = recipe.rarity.toLowerCase().replace(' ', '-')
      const ingList = (recipe.ingredients || []).map(ing => {
        const herb = herbs.find(h => h.id === ing.id)
        return `${ing.amount}× ${herb?.name || ing.id}`
      }).join(', ')

      html += `
        <div class="ae-recipe-detail-card">
          <div class="ae-recipe-detail-header">
            <span class="ae-recipe-name">${recipeIcon(recipe)} ${recipe.name}</span>
            <span class="ae-rarity ae-rarity-${slug}">${recipe.rarity}</span>
          </div>
          <div class="ae-recipe-meta">DC ${recipe.dc} · ${recipe.brewTime}</div>
          ${recipe.effect ? `<div class="ae-recipe-effect">${recipe.effect}</div>` : ''}
          ${ingList ? `<div class="ae-recipe-ingredients">🌿 ${ingList}</div>` : ''}
        </div>`
    })
  })

  el.innerHTML = html
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: KRÄUTER-LIBRARY
// ─────────────────────────────────────────────────────────────────────────────
function renderHerbs() {
  const el = document.getElementById('ae-panel-herbs')
  if (!el) return

  const q = state.herbSearch.toLowerCase()
  const filtered = q ? herbs.filter(h => h.name.toLowerCase().includes(q) || h.description?.toLowerCase().includes(q)) : herbs

  const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']
  const byRarity = {}
  filtered.forEach(h => {
    if (!byRarity[h.rarity]) byRarity[h.rarity] = []
    byRarity[h.rarity].push(h)
  })

  let html = `<input id="ae-herb-search" placeholder="Search herbs…" value="${state.herbSearch}">`

  rarityOrder.forEach(rarity => {
    if (!byRarity[rarity]) return
    const slug = rarity.toLowerCase().replace(' ', '-')
    html += `<div class="ae-section-title"><span class="ae-rarity ae-rarity-${slug}">${rarity}</span></div>`
    byRarity[rarity].forEach(herb => {
      html += `
        <div class="ae-herb-card">
          <div class="ae-herb-card-header">
            <span class="ae-herb-card-name">${herb.name}</span>
          </div>
          ${herb.categories?.length ? `<div style="font-size:11px;color:#666;margin-bottom:3px">${herb.categories.join(' · ')}</div>` : ''}
          <div class="ae-herb-desc">${herb.description || ''}</div>
        </div>`
    })
  })

  el.innerHTML = html

  document.getElementById('ae-herb-search')?.addEventListener('input', e => {
    state.herbSearch = e.target.value
    renderHerbs()
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Roll20 Chat Integration
// ─────────────────────────────────────────────────────────────────────────────
function postToChat(msg) {
  const input = document.querySelector('#textchat-input textarea')
  const btn   = document.querySelector('#textchat-input button[type="submit"]')
             ?? document.querySelector('#textchat-input .btn')
  if (!input || !btn) return
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set
  nativeSetter.call(input, msg)
  input.dispatchEvent(new Event('input', { bubbles: true }))
  setTimeout(() => btn.click(), 80)
}

function postBrewCard(recipe, result) {
  const qualityEmoji = result.quality === 'Masterwork' ? '⭐' : result.quality === 'Superior' ? '✨' : result.quality === 'Failure' ? '❌' : result.quality === 'Critical Failure' ? '💀' : '✅'
  const rollText = result.critSuccess ? `${result.roll} (Natural 20!)` : result.critFail ? `${result.roll} (Natural 1!)` : `${result.roll}`
  const mod = result.modifier >= 0 ? `+${result.modifier}` : `${result.modifier}`
  const effect = result.scaledEffect || recipe.effect || ''

  const lines = [
    `&{template:default}`,
    `{{name=Aetherial Brew}}`,
    `{{Potion=${recipe.name}}}`,
    `{{Effect=${effect}}}`,
    `{{Quality=${qualityEmoji} ${result.quality}}}`,
    `{{Roll=d20: ${rollText} ${mod} = ${result.total} vs DC ${result.dc}}}`,
    `{{Brew Time=${recipe.brewTime}}}`,
  ]
  if (result.multiplier > 1) lines.push(`{{Bonus=Wirkung ×${result.multiplier} (${result.quality})}}`)

  if (result.success) {
    lines.push(`{{aetherial-name=${recipe.name}}}`)
    lines.push(`{{aetherial-effect=${effect}}}`)
    lines.push(`{{aetherial-quality=${result.quality}}}`)
    lines.push(`{{aetherial-sync=1}}`)
  }

  postToChat(lines.join(' '))
}

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────
buildSidebar()
render()

// Request character list from roll20-page.js (MAIN world).
// roll20-page.js also polls and pushes automatically — this is just an early nudge.
setTimeout(loadCharacters, 1000)


// ─────────────────────────────────────────────────────────────────────────────
// Push card helper (called from background.js when React app requests push)
// ─────────────────────────────────────────────────────────────────────────────
function postPushCard(item, charId) {
  const lines = [
    `&{template:default}`,
    `{{name=Aetherial Push}}`,
    `{{Item=${item.name}}}`,
    `{{Quantity=${item.quantity || 1}}}`,
    `{{Description=${item.description || ''}}}`,
    `{{aetherial-push=1}}`,
    `{{aetherial-push-name=${item.name}}}`,
    `{{aetherial-push-desc=${item.description || ''}}}`,
    `{{aetherial-push-qty=${item.quantity || 1}}}`,
    `{{aetherial-push-charid=${charId}}}`,
  ]
  postToChat(lines.join(' '))
}

// ─────────────────────────────────────────────────────────────────────────────
// Background <-> Roll20 bridge
// Handles messages routed by background.js from the React app.
// ─────────────────────────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {

  // AE_GET_CHARS: background wants the Roll20 character list
  if (msg.type === 'AE_GET_CHARS') {
    const onChars = (e) => {
      if (!e.data?.__ae_from_page || e.data.type !== 'CHARACTERS') return
      window.removeEventListener('message', onChars)
      clearTimeout(timeout)
      sendResponse({ characters: e.data.characters || [] })
    }
    window.addEventListener('message', onChars)
    window.postMessage({ __ae_to_page: true, type: 'GET_CHARACTERS' }, '*')

    const timeout = setTimeout(() => {
      window.removeEventListener('message', onChars)
      sendResponse({ characters: [] })
    }, 5000)

    return true // keep channel open for async response
  }

  // AE_PUSH_ITEM: post push card to Roll20 chat
  if (msg.type === 'AE_PUSH_ITEM') {
    postPushCard(msg.item, msg.characterId)
    sendResponse({ success: true })
    return
  }

  // AE_READ_INVENTORY: post !brew-read, watch chat DOM for whisper response
  if (msg.type === 'AE_READ_INVENTORY') {
    postToChat('!brew-read')

    const chatEl = document.querySelector('#textchat')
    if (!chatEl) {
      sendResponse({ error: 'chat-not-found', items: [] })
      return
    }

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          const text = node.textContent || ''
          const match = text.match(/AETHERIAL-INVENTORY:(\[.*\])/)
          if (match) {
            observer.disconnect()
            clearTimeout(timeout)
            try {
              sendResponse({ items: JSON.parse(match[1]) })
            } catch (_) {
              sendResponse({ items: [] })
            }
            return
          }
        }
      }
    })

    observer.observe(chatEl, { childList: true, subtree: true })

    const timeout = setTimeout(() => {
      observer.disconnect()
      sendResponse({ error: 'timeout', items: [] })
    }, 12000)

    return true // keep channel open for async response
  }

})

})()
