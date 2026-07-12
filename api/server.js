import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { timingSafeEqual } from 'crypto'
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
const PORT = Number(process.env.PORT) || 3004

// Behind the catto.at nginx reverse proxy - trust one proxy hop so req.ip
// reflects the real client for the rate limiter below.
app.set('trust proxy', 1)

// Restrict CORS to the only legitimate browser origins:
//   - https://app.roll20.net : the Roll20 extension content script (POST + SSE)
//   - https://catto.at       : the GM dashboard served at /api/v1/gm (SSE)
app.use(cors({ origin: ['https://app.roll20.net', 'https://catto.at'] }))
app.use(express.json({ limit: '64kb' }))

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

const STORE_FILE = process.env.ALCHEMY_STORE || join(__dirname, 'inventory-store.json')

let rooms = {}
try {
  if (existsSync(STORE_FILE)) rooms = JSON.parse(readFileSync(STORE_FILE, 'utf8')) || {}
} catch (e) {
  console.error('Could not load inventory store:', e.message)
}

// GM grants: items the GM hands out to a character. Queued server-side and
// delivered to the player's extension (live via SSE or on next join), which
// applies them locally and acks. The queue survives the player being offline
// and can't be lost by the player's own full-state inventory pushes.
//
//   grants = { [roomId]: { [characterId]: [ {grantId, kind, id, count, ts} ] } }

const GRANTS_FILE = process.env.ALCHEMY_GRANTS_STORE || join(__dirname, 'grants-store.json')

let grants = {}
try {
  if (existsSync(GRANTS_FILE)) grants = JSON.parse(readFileSync(GRANTS_FILE, 'utf8')) || {}
} catch (e) {
  console.error('Could not load grants store:', e.message)
}

// Live SSE subscribers - runtime only, never persisted.
const subscribers = {}       // room feed (GM dashboard):    { [roomId]: Set(res) }
const charSubscribers = {}   // per-character grants feed:   { [roomId]: { [charId]: Set(res) } }

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

let grantsSaveTimer = null
function persistGrants() {
  if (grantsSaveTimer) return
  grantsSaveTimer = setTimeout(() => {
    grantsSaveTimer = null
    try {
      writeFileSync(GRANTS_FILE, JSON.stringify(grants))
    } catch (e) {
      console.error('Could not persist grants store:', e.message)
    }
  }, 500)
}

// Resolve ids → display names (dashboard stays dumb; backend owns the data).
function enrichPlayer(p, roomId) {
  return {
    characterId:   p.characterId,
    characterName: p.characterName,
    playerName:    p.playerName,
    updatedAt:     p.updatedAt,
    pendingGrants: (grants[roomId]?.[p.characterId] || []).length,
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
      .map(p => enrichPlayer(p, roomId))
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

// ========== Security: optional token auth, abuse caps, validation ==========
//
// These fixes are non-breaking: with no ALCHEMY_API_TOKEN env var the auth
// check is skipped (current behavior), and the caps/validation only reject
// abusive or malformed payloads that the legitimate extension never sends.

// Optional shared-secret auth. When ALCHEMY_API_TOKEN is set, mutating requests
// must carry a matching X-Api-Token header (constant-time compare). When it is
// unset, the check is a no-op so the existing extension keeps working.
const API_TOKEN = process.env.ALCHEMY_API_TOKEN || ''
function requireToken(req, res, next) {
  if (!API_TOKEN) return next() // auth disabled - preserve current behavior
  const provided = Buffer.from(String(req.get('X-Api-Token') || ''))
  const expected = Buffer.from(API_TOKEN)
  if (provided.length === expected.length && timingSafeEqual(provided, expected)) return next()
  return res.status(401).json({ error: 'invalid or missing X-Api-Token' })
}

// Abuse caps (prevent unbounded disk / memory growth → DoS).
const MAX_ROOMS          = 500       // distinct campaigns kept on disk
const MAX_CHARS_PER_ROOM = 100       // players per campaign
const MAX_MAP_ENTRIES    = 500       // ingredient/potion ids per player
const MAX_ID_LEN         = 64        // room / character / item id length
const MAX_NAME_LEN       = 100       // character / player display name length
const MAX_COUNT          = 1_000_000 // per-item stack count clamp

// Simple in-memory per-IP rate limiter for mutating routes (no external dep).
const RATE_WINDOW_MS = 60_000
const RATE_MAX       = 120           // POST/DELETE per IP per window
const rateHits = new Map()           // ip -> { count, resetAt }
function rateLimit(req, res, next) {
  const now = Date.now()
  const ip = req.ip || req.socket?.remoteAddress || 'unknown'
  let e = rateHits.get(ip)
  if (!e || now > e.resetAt) { e = { count: 0, resetAt: now + RATE_WINDOW_MS }; rateHits.set(ip, e) }
  e.count++
  if (e.count > RATE_MAX) {
    res.set('Retry-After', String(Math.ceil((e.resetAt - now) / 1000)))
    return res.status(429).json({ error: 'rate limit exceeded' })
  }
  next()
}
// Periodically drop expired buckets so the map can't grow unbounded.
const rateCleanup = setInterval(() => {
  const now = Date.now()
  for (const [ip, e] of rateHits) if (now > e.resetAt) rateHits.delete(ip)
}, RATE_WINDOW_MS)
rateCleanup.unref?.()

// Sanitise an {id: count} map: keep only sane string ids mapped to finite
// non-negative numbers; drop everything else; cap the number of entries.
function sanitizeItemMap(input) {
  const out = {}
  if (!input || typeof input !== 'object' || Array.isArray(input)) return out
  let n = 0
  for (const [id, rawCount] of Object.entries(input)) {
    if (n >= MAX_MAP_ENTRIES) break
    if (typeof id !== 'string' || id.length === 0 || id.length > MAX_ID_LEN) continue
    const count = Number(rawCount)
    if (!Number.isFinite(count) || count < 0) continue
    out[id] = Math.min(Math.floor(count), MAX_COUNT)
    n++
  }
  return out
}
function sanitizeName(v, fallback = '') {
  return typeof v === 'string' ? v.slice(0, MAX_NAME_LEN) : fallback
}

// POST /api/v1/rooms/:roomId/inventory - upsert one player's inventory
app.post('/api/v1/rooms/:roomId/inventory', rateLimit, requireToken, (req, res) => {
  const { roomId } = req.params
  if (!roomId || roomId.length > MAX_ID_LEN) {
    return res.status(400).json({ error: 'invalid roomId' })
  }

  const body = req.body || {}
  const characterId = typeof body.characterId === 'string' ? body.characterId : ''
  if (!characterId || characterId.length > MAX_ID_LEN) {
    return res.status(400).json({ error: 'valid characterId required' })
  }

  // Room cap: only reject when this would create a brand-new room.
  if (!rooms[roomId] && Object.keys(rooms).length >= MAX_ROOMS) {
    return res.status(429).json({ error: 'room limit reached' })
  }
  if (!rooms[roomId]) rooms[roomId] = {}

  // Per-room character cap: only reject when adding a brand-new character.
  if (!rooms[roomId][characterId] && Object.keys(rooms[roomId]).length >= MAX_CHARS_PER_ROOM) {
    return res.status(429).json({ error: 'character limit reached for room' })
  }

  // Client-side change timestamp (client clock) - used by the extension's
  // join-time sync to decide whether the server copy or the local copy is
  // newer. Kept separate from updatedAt (server clock).
  const clientUpdatedAt = Number(body.updatedAt)

  rooms[roomId][characterId] = {
    characterId,
    characterName: sanitizeName(body.characterName, characterId),
    playerName:    sanitizeName(body.playerName, ''),
    ingredients:   sanitizeItemMap(body.ingredients),
    potions:       sanitizeItemMap(body.potions),
    updatedAt:     Date.now(),
    clientUpdatedAt: Number.isFinite(clientUpdatedAt) && clientUpdatedAt > 0 ? clientUpdatedAt : 0,
  }
  persist()
  broadcast(roomId)
  res.json({ ok: true })
})

// GET /api/v1/rooms/:roomId/inventory - full snapshot (one-shot)
app.get('/api/v1/rooms/:roomId/inventory', (req, res) => {
  res.json(roomSnapshot(req.params.roomId))
})

// GET /api/v1/rooms/:roomId/inventory/:characterId - one player's raw copy
// (unenriched {id: count} maps + timestamps), used by the extension to sync
// its local inventory when joining the game.
app.get('/api/v1/rooms/:roomId/inventory/:characterId', (req, res) => {
  const { roomId, characterId } = req.params
  const p = rooms[roomId]?.[characterId]
  if (!p) return res.json({ exists: false })
  res.json({
    exists:          true,
    characterId:     p.characterId,
    characterName:   p.characterName,
    ingredients:     p.ingredients || {},
    potions:         p.potions || {},
    updatedAt:       p.updatedAt || 0,
    clientUpdatedAt: p.clientUpdatedAt || 0,
  })
})

// DELETE /api/v1/rooms/:roomId/inventory/:characterId - remove a player
app.delete('/api/v1/rooms/:roomId/inventory/:characterId', rateLimit, requireToken, (req, res) => {
  const { roomId, characterId } = req.params
  if (rooms[roomId] && rooms[roomId][characterId]) {
    delete rooms[roomId][characterId]
    persist()
    broadcast(roomId)
  }
  res.json({ ok: true })
})

// GET /api/v1/rooms/:roomId/stream - Server-Sent Events live feed
app.get('/api/v1/rooms/:roomId/stream', (req, res) => {
  const { roomId } = req.params
  // Note: the Access-Control-Allow-Origin header is set by the cors() middleware
  // above (restricted to the allow-list), so it is intentionally not set here.
  res.writeHead(200, {
    'Content-Type':      'text/event-stream',
    'Cache-Control':     'no-cache',
    Connection:          'keep-alive',
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

// ========== GM GRANTS ROUTES ==========

const MAX_GRANTS_PER_CHAR = 200
let grantSeq = 0
const newGrantId = () => `g${Date.now().toString(36)}-${(grantSeq++).toString(36)}`

// Resolve a grant for delivery (attach the display name; store stays raw ids).
function enrichGrant(g) {
  const name = g.kind === 'potion' ? getRecipeById(g.id)?.name : getHerbById(g.id)?.name
  return { ...g, name: name || g.id }
}

function pendingGrants(roomId, characterId) {
  return (grants[roomId]?.[characterId] || []).map(enrichGrant)
}

// Push the current pending grants to the character's live SSE subscribers.
function notifyChar(roomId, characterId) {
  const subs = charSubscribers[roomId]?.[characterId]
  if (!subs || !subs.size) return
  const payload = `data: ${JSON.stringify({ grants: pendingGrants(roomId, characterId) })}\n\n`
  for (const res of subs) {
    try { res.write(payload) } catch (_) { /* dead connection, cleaned up on close */ }
  }
}

// POST /api/v1/rooms/:roomId/grants/:characterId - GM hands items to a player
app.post('/api/v1/rooms/:roomId/grants/:characterId', rateLimit, requireToken, (req, res) => {
  const { roomId, characterId } = req.params
  if (!roomId || roomId.length > MAX_ID_LEN || !characterId || characterId.length > MAX_ID_LEN) {
    return res.status(400).json({ error: 'invalid roomId or characterId' })
  }

  const body  = req.body || {}
  const kind  = body.kind === 'potion' ? 'potion' : body.kind === 'herb' ? 'herb' : null
  const id    = typeof body.id === 'string' ? body.id : ''
  const count = Math.floor(Number(body.count))
  if (!kind) return res.status(400).json({ error: 'kind must be "herb" or "potion"' })
  if (!id || id.length > MAX_ID_LEN) return res.status(400).json({ error: 'valid id required' })
  if (!(kind === 'herb' ? getHerbById(id) : getRecipeById(id))) {
    return res.status(400).json({ error: `unknown ${kind} id`, id })
  }
  if (!Number.isFinite(count) || count < 1 || count > MAX_COUNT) {
    return res.status(400).json({ error: 'count must be a positive number' })
  }

  if (!grants[roomId]) grants[roomId] = {}
  if (!grants[roomId][characterId]) grants[roomId][characterId] = []
  const queue = grants[roomId][characterId]
  if (queue.length >= MAX_GRANTS_PER_CHAR) {
    return res.status(429).json({ error: 'grant queue full for character' })
  }

  const grant = { grantId: newGrantId(), kind, id, count, ts: Date.now() }
  queue.push(grant)
  persistGrants()
  notifyChar(roomId, characterId)   // player picks it up live if online
  broadcast(roomId)                 // GM dashboards see the pending count
  res.json({ ok: true, grantId: grant.grantId, pending: queue.length })
})

// GET /api/v1/rooms/:roomId/grants/:characterId - pending grants (join-time poll)
app.get('/api/v1/rooms/:roomId/grants/:characterId', (req, res) => {
  const { roomId, characterId } = req.params
  res.json({ grants: pendingGrants(roomId, characterId) })
})

// POST /api/v1/rooms/:roomId/grants/:characterId/ack - player confirms receipt
app.post('/api/v1/rooms/:roomId/grants/:characterId/ack', rateLimit, requireToken, (req, res) => {
  const { roomId, characterId } = req.params
  const ids = Array.isArray(req.body?.grantIds) ? req.body.grantIds.filter(x => typeof x === 'string') : []
  const queue = grants[roomId]?.[characterId]
  if (queue && ids.length) {
    const before = queue.length
    grants[roomId][characterId] = queue.filter(g => !ids.includes(g.grantId))
    if (!grants[roomId][characterId].length) delete grants[roomId][characterId]
    if (!Object.keys(grants[roomId]).length) delete grants[roomId]
    if (before !== (grants[roomId]?.[characterId]?.length || 0)) {
      persistGrants()
      broadcast(roomId)             // pending count went down
    }
  }
  res.json({ ok: true, pending: grants[roomId]?.[characterId]?.length || 0 })
})

// GET /api/v1/rooms/:roomId/grants/:characterId/stream - per-character SSE feed
// so an in-game player receives GM grants instantly (initial payload + pushes).
app.get('/api/v1/rooms/:roomId/grants/:characterId/stream', (req, res) => {
  const { roomId, characterId } = req.params
  res.writeHead(200, {
    'Content-Type':      'text/event-stream',
    'Cache-Control':     'no-cache',
    Connection:          'keep-alive',
    'X-Accel-Buffering': 'no',
  })
  res.write(': connected\n\n')
  res.write(`data: ${JSON.stringify({ grants: pendingGrants(roomId, characterId) })}\n\n`)

  if (!charSubscribers[roomId]) charSubscribers[roomId] = {}
  if (!charSubscribers[roomId][characterId]) charSubscribers[roomId][characterId] = new Set()
  charSubscribers[roomId][characterId].add(res)

  const heartbeat = setInterval(() => {
    try { res.write(': ping\n\n') } catch (_) { /* closed */ }
  }, 25000)

  req.on('close', () => {
    clearInterval(heartbeat)
    charSubscribers[roomId]?.[characterId]?.delete(res)
  })
})

// GET /api/v1/gm - standalone live dashboard page (served under the proxied /api path)
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
      'rooms/:roomId/inventory/:characterId': 'GET one player\'s raw inventory copy (extension sync)',
      'rooms/:roomId/stream': 'GET Server-Sent Events live feed (GM dashboard)',
      'rooms/:roomId/grants/:characterId': 'POST GM grant / GET pending / POST …/ack / GET …/stream',
      gm: '/api/v1/gm - live GM dashboard'
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
