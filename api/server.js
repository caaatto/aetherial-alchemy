import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import {
  herbsDatabase,
  getHerbById,
  getAllHerbs,
  getHerbsByRarity,
  getHerbsByCategory,
  rarityOrder,
  categoryList
} from '../src/data/herbsDatabase.js'
import {
  aetherialRecipeTree,
  getRecipeById,
  getRecipesByTier,
  getRecipesByCategory
} from '../src/data/aetherialRecipeTree.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = 3004

app.use(cors())
app.use(express.json())

// ========== HERBS ENDPOINTS ==========

// GET /api/v1/herbs - All herbs with optional filters
app.get('/api/v1/herbs', (req, res) => {
  let herbs = getAllHerbs()

  const { rarity, category } = req.query

  if (rarity) {
    herbs = herbs.filter(h => h.rarity.toLowerCase() === rarity.toLowerCase())
  }

  if (category) {
    herbs = herbs.filter(h =>
      h.categories.some(c => c.toLowerCase() === category.toLowerCase())
    )
  }

  res.json({
    count: herbs.length,
    filters: {
      rarity: rarity || null,
      category: category || null
    },
    herbs
  })
})

// GET /api/v1/herbs/meta - Available rarities and categories
app.get('/api/v1/herbs/meta', (req, res) => {
  res.json({
    rarities: rarityOrder,
    categories: categoryList
  })
})

// GET /api/v1/herbs/:id - Single herb by ID
app.get('/api/v1/herbs/:id', (req, res) => {
  const herb = getHerbById(req.params.id)

  if (!herb) {
    return res.status(404).json({
      error: 'Herb not found',
      id: req.params.id
    })
  }

  res.json(herb)
})

// ========== POTIONS/RECIPES ENDPOINTS ==========

// GET /api/v1/potions - All potions with optional filters
app.get('/api/v1/potions', (req, res) => {
  let potions = [...aetherialRecipeTree.recipes]

  const { category, tier, rarity } = req.query

  if (category) {
    potions = potions.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  if (tier) {
    potions = potions.filter(p => p.tier === parseInt(tier, 10))
  }

  if (rarity) {
    potions = potions.filter(p => p.rarity.toLowerCase() === rarity.toLowerCase())
  }

  // Remove internal layout fields from response
  const cleaned = potions.map(({ position, _subtype, ...rest }) => rest)

  res.json({
    count: cleaned.length,
    filters: {
      category: category || null,
      tier: tier ? parseInt(tier, 10) : null,
      rarity: rarity || null
    },
    potions: cleaned
  })
})

// GET /api/v1/potions/meta - Available categories, tiers, rarities
app.get('/api/v1/potions/meta', (req, res) => {
  const recipes = aetherialRecipeTree.recipes
  const categories = [...new Set(recipes.map(r => r.category))].sort()
  const tiers = [...new Set(recipes.map(r => r.tier))].sort((a, b) => a - b)
  const rarities = [...new Set(recipes.map(r => r.rarity))]

  res.json({
    categories,
    tiers,
    rarities
  })
})

// GET /api/v1/potions/:id - Single potion by ID
app.get('/api/v1/potions/:id', (req, res) => {
  const potion = getRecipeById(req.params.id)

  if (!potion) {
    return res.status(404).json({
      error: 'Potion not found',
      id: req.params.id
    })
  }

  // Remove internal layout fields
  const { position, _subtype, ...cleaned } = potion
  res.json(cleaned)
})

// ========== PARTY INVENTORY (GM live dashboard) ==========
//
// Players' alchemy inventories live in each player's browser (extension
// chrome.storage). To give the GM a shared, live overview we let the
// extension POST each player's inventory here, keyed by Roll20 campaign id
// (the "room"). The GM dashboard subscribes via Server-Sent Events.
//
//   rooms = { [roomId]: { [characterId]: { characterId, characterName,
//                          playerName, ingredients:{id:count},
//                          potions:{id:count}, updatedAt } } }

const STORE_FILE = join(__dirname, 'inventory-store.json')

let rooms = {}
try {
  if (existsSync(STORE_FILE)) rooms = JSON.parse(readFileSync(STORE_FILE, 'utf8')) || {}
} catch (e) {
  console.error('Could not load inventory store:', e.message)
}

// Live SSE subscribers per room — runtime only, never persisted.
const subscribers = {}

// Debounced write-through to disk.
let saveTimer = null
function persist() {
  if (saveTimer) return
  saveTimer = setTimeout(() => {
    saveTimer = null
    try {
      writeFileSync(STORE_FILE, JSON.stringify(rooms))
    } catch (e) {
      console.error('Could not persist inventory store:', e.message)
    }
  }, 500)
}

// Resolve ids → display names (dashboard stays dumb; backend owns the data).
function enrichPlayer(p) {
  return {
    characterId:   p.characterId,
    characterName: p.characterName,
    playerName:    p.playerName,
    updatedAt:     p.updatedAt,
    ingredients: Object.entries(p.ingredients || {})
      .filter(([, count]) => count > 0)
      .map(([id, count]) => ({ id, name: getHerbById(id)?.name || id, count })),
    potions: Object.entries(p.potions || {})
      .filter(([, count]) => count > 0)
      .map(([id, count]) => ({ id, name: getRecipeById(id)?.name || id, count })),
  }
}

function roomSnapshot(roomId) {
  const players = rooms[roomId] || {}
  return {
    roomId,
    players: Object.values(players)
      .map(enrichPlayer)
      .sort((a, b) => (a.characterName || '').localeCompare(b.characterName || '')),
  }
}

function broadcast(roomId) {
  const subs = subscribers[roomId]
  if (!subs || !subs.size) return
  const payload = `data: ${JSON.stringify(roomSnapshot(roomId))}\n\n`
  for (const res of subs) {
    try { res.write(payload) } catch (_) { /* dead connection, cleaned up on close */ }
  }
}

// POST /api/v1/rooms/:roomId/inventory — upsert one player's inventory
app.post('/api/v1/rooms/:roomId/inventory', (req, res) => {
  const { roomId } = req.params
  const { characterId, characterName, playerName, ingredients, potions } = req.body || {}
  if (!characterId) return res.status(400).json({ error: 'characterId required' })

  if (!rooms[roomId]) rooms[roomId] = {}
  rooms[roomId][characterId] = {
    characterId,
    characterName: characterName || characterId,
    playerName:    playerName || '',
    ingredients:   ingredients || {},
    potions:       potions || {},
    updatedAt:     Date.now(),
  }
  persist()
  broadcast(roomId)
  res.json({ ok: true })
})

// GET /api/v1/rooms/:roomId/inventory — full snapshot (one-shot)
app.get('/api/v1/rooms/:roomId/inventory', (req, res) => {
  res.json(roomSnapshot(req.params.roomId))
})

// DELETE /api/v1/rooms/:roomId/inventory/:characterId — remove a player
app.delete('/api/v1/rooms/:roomId/inventory/:characterId', (req, res) => {
  const { roomId, characterId } = req.params
  if (rooms[roomId] && rooms[roomId][characterId]) {
    delete rooms[roomId][characterId]
    persist()
    broadcast(roomId)
  }
  res.json({ ok: true })
})

// GET /api/v1/rooms/:roomId/stream — Server-Sent Events live feed
app.get('/api/v1/rooms/:roomId/stream', (req, res) => {
  const { roomId } = req.params
  res.writeHead(200, {
    'Content-Type':      'text/event-stream',
    'Cache-Control':     'no-cache',
    Connection:          'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'X-Accel-Buffering': 'no', // disable proxy buffering (nginx)
  })
  res.write(': connected\n\n')
  res.write(`data: ${JSON.stringify(roomSnapshot(roomId))}\n\n`)

  if (!subscribers[roomId]) subscribers[roomId] = new Set()
  subscribers[roomId].add(res)

  const heartbeat = setInterval(() => {
    try { res.write(': ping\n\n') } catch (_) { /* closed */ }
  }, 25000)

  req.on('close', () => {
    clearInterval(heartbeat)
    subscribers[roomId]?.delete(res)
  })
})

// GET /api/v1/gm — standalone live dashboard page (served under the proxied /api path)
app.get('/api/v1/gm', (req, res) => {
  res.sendFile(join(__dirname, 'gm-dashboard.html'))
})

// ========== ROOT ==========

app.get('/api/v1', (req, res) => {
  res.json({
    name: 'Aetherial Alchemy API',
    version: '1.0.0',
    endpoints: {
      herbs: '/api/v1/herbs',
      'herbs/:id': '/api/v1/herbs/:id',
      'herbs/meta': '/api/v1/herbs/meta',
      potions: '/api/v1/potions',
      'potions/:id': '/api/v1/potions/:id',
      'potions/meta': '/api/v1/potions/meta',
      'rooms/:roomId/inventory': 'POST upsert / GET snapshot of party inventories',
      'rooms/:roomId/stream': 'GET Server-Sent Events live feed',
      gm: '/api/v1/gm — live GM dashboard'
    }
  })
})

// ========== 404 FALLBACK ==========

app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: '/api/v1'
  })
})

app.listen(PORT, () => {
  console.log(`Aetherial Alchemy API running on port ${PORT}`)
  console.log(`Endpoints: http://localhost:${PORT}/api/v1`)
  console.log(`Herbs loaded: ${getAllHerbs().length}`)
  console.log(`Potions loaded: ${aetherialRecipeTree.recipes.length}`)
})
