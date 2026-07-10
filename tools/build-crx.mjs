#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Build a signed CRX3 of the Roll20 extension + its update manifest, and publish
// them to the web root so installed copies auto-update (self-hosted, no store).
//
//   git push → deploy-alchemy.sh → this script → /home/amke/website/alchemy-ext/
//                                                   ├─ aetherial-roll20.crx
//                                                   └─ updates.xml
//
// The signing key lives OUTSIDE the repo and must NEVER be committed:
//   CRX_KEY env, or default /home/amke/.secrets/aetherial-ext.pem
// The key determines the extension id; losing/changing it breaks auto-update.
// ─────────────────────────────────────────────────────────────────────────────

import { createRequire } from 'module'
import { readFileSync, mkdirSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const require = createRequire(import.meta.url)
const crx3 = require('crx3')

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot  = join(__dirname, '..')
const extDir    = join(repoRoot, 'roll20-extension')

const KEY     = process.env.CRX_KEY || '/home/amke/.secrets/aetherial-ext.pem'
const OUT     = process.env.CRX_OUT || '/home/amke/website/alchemy-ext'
// Where the generated updates.xml claims the .crx lives. Default: catto.at
// mirror (legacy installs still poll it). tools/release-ext.mjs overrides this
// with the GitHub release asset URL.
const CRX_URL = process.env.CRX_URL || 'https://catto.at/alchemy-ext/aetherial-roll20.crx'

const manifest = JSON.parse(readFileSync(join(extDir, 'manifest.json'), 'utf8'))

if (!existsSync(KEY)) {
  // No key on this host (e.g. a dev checkout) — skip without failing the deploy.
  console.error(`[build-crx] signing key not found at ${KEY} — skipping CRX build`)
  process.exit(0)
}

mkdirSync(OUT, { recursive: true })

crx3([extDir], {
  keyPath:    KEY,
  crxPath:    join(OUT, 'aetherial-roll20.crx'),
  xmlPath:    join(OUT, 'updates.xml'),
  crxURL:     CRX_URL,
  appVersion: manifest.version,
})
  .then(() => console.log(`[build-crx] published v${manifest.version} → ${OUT}`))
  .catch((e) => { console.error('[build-crx] FAILED:', e && e.message); process.exit(1) })
