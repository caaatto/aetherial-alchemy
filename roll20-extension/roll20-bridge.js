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
  return POTION_BASE + file
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

// ── Load data from extension bundle ──────────────────────────────────────────
const [herbs, recipes] = await Promise.all([
  fetch(chrome.runtime.getURL('herbs.json')).then(r => r.json()),
  fetch(chrome.runtime.getURL('recipes.json')).then(r => r.json()),
])

// ── Storage helpers (per-character inventory) ─────────────────────────────────
// Storage key: ae_inv_<characterId>  →  { ingredients: { herbId: count, ... } }

async function getInventory(charId) {
  if (!charId) return { ingredients: {} }
  const key = `ae_inv_${charId}`
  const result = await chrome.storage.local.get(key)
  return result[key] || { ingredients: {} }
}

async function saveInventory(charId, inv) {
  if (!charId) return
  await chrome.storage.local.set({ [`ae_inv_${charId}`]: inv })
}

// ── State ─────────────────────────────────────────────────────────────────────
let state = {
  charId:     null,
  charName:   '',
  inventory:  { ingredients: {} },
  characters: [],
  tab:        'brew',          // 'inventory' | 'brew' | 'recipes' | 'herbs'
  selectedRecipe: null,
  modifier:   0,
  brewResult: null,
  herbSearch: '',
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
    </div>

    <div id="ae-content">
      <div id="ae-panel-inventory" class="ae-panel"></div>
      <div id="ae-panel-brew"      class="ae-panel active"></div>
      <div id="ae-panel-recipes"   class="ae-panel"></div>
      <div id="ae-panel-herbs"     class="ae-panel"></div>
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
  render()
}

// ── Read characters from Roll20 ───────────────────────────────────────────────
function loadCharacters() {
  try {
    const models = window.Campaign?.characters?.models || []
    state.characters = models.map(c => ({ id: c.id, name: c.get('name') || '(Unnamed)' }))
  } catch (e) {
    state.characters = []
  }

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

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  renderInventory()
  renderBrew()
  renderRecipes()
  renderHerbs()
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: INVENTAR
// ─────────────────────────────────────────────────────────────────────────────
function renderInventory() {
  const el = document.getElementById('ae-panel-inventory')
  if (!el) return

  const ings = state.inventory.ingredients || {}
  const entries = Object.entries(ings)

  if (entries.length === 0) {
    el.innerHTML = '<p class="ae-empty">Keine Kräuter im Inventar.</p>'
    return
  }

  // Group by rarity
  const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']
  const byRarity = {}
  entries.forEach(([id, count]) => {
    const herb = herbs.find(h => h.id === id)
    const rarity = herb?.rarity || 'Common'
    if (!byRarity[rarity]) byRarity[rarity] = []
    byRarity[rarity].push({ id, count, herb })
  })

  let html = ''
  rarityOrder.forEach(rarity => {
    if (!byRarity[rarity]) return
    const slug = rarity.toLowerCase().replace(' ', '-')
    html += `<div class="ae-section-title"><span class="ae-rarity ae-rarity-${slug}">${rarity}</span></div>`
    byRarity[rarity].forEach(({ id, count, herb }) => {
      html += `
        <div class="ae-herb-row">
          <span class="ae-herb-name">${herb?.name || id}</span>
          <button class="ae-btn-sm" data-action="sub" data-id="${id}">−</button>
          <span class="ae-herb-count">${count}</span>
          <button class="ae-btn-sm" data-action="add" data-id="${id}">+</button>
        </div>`
    })
  })

  el.innerHTML = html

  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id     = btn.dataset.id
      const action = btn.dataset.action
      const inv    = state.inventory
      const cur    = inv.ingredients[id] || 0
      if (action === 'add') {
        inv.ingredients[id] = cur + 1
      } else {
        if (cur <= 1) delete inv.ingredients[id]
        else inv.ingredients[id] = cur - 1
      }
      await saveInventory(state.charId, inv)
      renderInventory()
      renderBrew() // availability may change
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
      ${r.success ? `<div style="font-size:12px;color:#aaa;margin-bottom:10px">${recipe?.effect || ''}</div>` : ''}
      <button class="ae-btn-back" id="ae-brew-again">Weiteres Rezept brauen</button>
    </div>`

  document.getElementById('ae-brew-again').addEventListener('click', () => {
    state.selectedRecipe = null
    state.brewResult     = null
    renderBrew()
  })
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

  // Consume ingredients
  if (recipe.ingredients?.length) {
    const inv = state.inventory
    for (const req of recipe.ingredients) {
      inv.ingredients[req.id] = (inv.ingredients[req.id] || 0) - req.amount
      if (inv.ingredients[req.id] <= 0) delete inv.ingredients[req.id]
    }
    await saveInventory(state.charId, inv)
  }

  state.brewResult = { roll, modifier: state.modifier, total, dc, success: success || critSuccess, quality, critSuccess, critFail }

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

  const lines = [
    `&{template:default}`,
    `{{name=Aetherial Brew}}`,
    `{{Potion=${recipe.name}}}`,
    `{{Effect=${recipe.effect || ''}}}`,
    `{{Quality=${qualityEmoji} ${result.quality}}}`,
    `{{Roll=d20: ${rollText} ${mod} = ${result.total} vs DC ${result.dc}}}`,
    `{{Brew Time=${recipe.brewTime}}}`,
  ]

  if (result.success) {
    lines.push(`{{aetherial-name=${recipe.name}}}`)
    lines.push(`{{aetherial-effect=${recipe.effect || ''}}}`)
    lines.push(`{{aetherial-quality=${result.quality}}}`)
    lines.push(`{{aetherial-sync=1}}`)
  }

  postToChat(lines.join(' '))
}

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────
buildSidebar()

// Load characters — Roll20 may not be fully initialised yet, retry a few times
let attempts = 0
const charPoll = setInterval(() => {
  attempts++
  const models = window.Campaign?.characters?.models
  if (models?.length || attempts >= 20) {
    clearInterval(charPoll)
    loadCharacters()
    render()
  }
}, 500)

})()
