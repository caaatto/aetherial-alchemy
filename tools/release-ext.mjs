#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Publish the current Roll20-extension version as a GitHub release so installed
// copies can auto-update from GitHub (update_url → raw updates.xml → release
// asset). Tag: ext-v<version>. Assets:
//
//   aetherial-roll20.crx  - signed package; installed/updated by Chrome itself
//                           via the ExtensionSettings policy (chrome-policy.json)
//   aetherial-roll20.zip  - for "Load unpacked" (Windows/Mac/Edge)
//   updates.xml           - copy of the update manifest (served live from
//                           raw.githubusercontent.com/…/roll20-extension/updates.xml)
//
// Idempotent: exits quietly when the release already exists, so the deploy can
// run it on every push. Needs an authenticated `gh` CLI plus the signing key
// (CRX_KEY env or /home/amke/.secrets/aetherial-ext.pem - NEVER in the repo).
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, existsSync, mkdtempSync, rmSync } from 'fs'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { tmpdir } from 'os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot  = join(__dirname, '..')
const extDir    = join(repoRoot, 'roll20-extension')

const REPO = 'caaatto/aetherial-alchemy'
const KEY  = process.env.CRX_KEY || '/home/amke/.secrets/aetherial-ext.pem'

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts })

const manifest = JSON.parse(readFileSync(join(extDir, 'manifest.json'), 'utf8'))
const version  = manifest.version
const tag      = `ext-v${version}`
const crxUrl   = `https://github.com/${REPO}/releases/download/${tag}/aetherial-roll20.crx`

// Guard 1: updates.xml must point at THIS version (i.e. bump:ext was used).
const updatesXml = readFileSync(join(extDir, 'updates.xml'), 'utf8')
if (!updatesXml.includes(`version='${version}'`) || !updatesXml.includes(crxUrl)) {
  console.error(`[release-ext] updates.xml does not match manifest v${version} - run: npm run bump:ext ${version}`)
  process.exit(1)
}

// Guard 2: release from committed state only (the zip is built via git archive).
if (run('git', ['status', '--porcelain', 'roll20-extension']).trim()) {
  console.error('[release-ext] roll20-extension/ has uncommitted changes - commit first')
  process.exit(1)
}

// Already released? Then there is nothing to do (deploy calls this every push).
try {
  run('gh', ['release', 'view', tag, '--repo', REPO, '--json', 'tagName'])
  console.log(`[release-ext] ${tag} already exists - nothing to do`)
  process.exit(0)
} catch { /* not released yet */ }

if (!existsSync(KEY)) {
  console.error(`[release-ext] signing key not found at ${KEY} - cannot release`)
  process.exit(1)
}

const staging = mkdtempSync(join(tmpdir(), 'aetherial-ext-release-'))
try {
  // Signed .crx whose embedded updates.xml points at the GitHub asset URL.
  run('node', [join(repoRoot, 'tools', 'build-crx.mjs')], {
    env: { ...process.env, CRX_KEY: KEY, CRX_OUT: staging, CRX_URL: crxUrl },
    stdio: 'inherit',
  })

  // Zip of the committed extension folder, for "Load unpacked" installs.
  run('git', [
    'archive', '--format=zip', '--prefix=roll20-extension/',
    '-o', join(staging, 'aetherial-roll20.zip'), 'HEAD:roll20-extension',
  ])

  const notes = [
    `Roll20-Extension **v${version}**: Alchemie-Sidebar direkt in Roll20 (Inventar, Brauen, Bogen-Sync, GM-Dashboard).`,
    '',
    '## Installation',
    '',
    '### Linux (Chrome/Chromium): Auto-Update über Policy-Datei',
    '',
    'Chrome blockiert selbst-gehostete `.crx`-Dateien (auch per Drag-and-drop:',
    '`CRX_REQUIRED_PROOF_MISSING`). Auto-Update geht über die mitgelieferte Policy-Datei:',
    '',
    '1. `aetherial-roll20.zip` (unten bei Assets) herunterladen und entpacken.',
    '2. Im entpackten Ordner: `sudo install -D -m 644 chrome-policy.json /etc/opt/chrome/policies/managed/aetherial-alchemy.json`',
    '   (Chromium: Zielordner `/etc/chromium/policies/managed/`).',
    '3. Chrome komplett beenden und neu starten. Die Extension installiert und aktualisiert sich selbst.',
    '',
    'Eine vorher entpackt geladene Version zuerst unter `chrome://extensions` entfernen.',
    '',
    '### Windows / Mac / Edge (oder ohne Root-Rechte): Zip entpackt laden',
    '',
    '1. `aetherial-roll20.zip` (unten bei Assets) herunterladen und entpacken.',
    '2. `chrome://extensions` öffnen (Edge: `edge://extensions`) und den **Entwicklermodus** aktivieren.',
    '3. **„Entpackt laden"** anklicken und den entpackten Ordner `roll20-extension/` auswählen.',
    '',
    'Bei neuen Versionen erscheint am Extension-Icon ein rotes **„NEU"-Badge**: Icon anklicken,',
    'neues Zip herunterladen, über den alten Ordner entpacken, auf der Extensions-Seite **Neu laden**.',
    '',
    '## Danach',
    '',
    'Roll20-Spiel öffnen, rechts auf den **Alchemie-Button** (Kolben-Symbol) klicken und oben den',
    'eigenen Charakter wählen (muss dir per „Controlled by" zugewiesen sein).',
    '',
    `Gruppen-Setup (Backend, GM-Dashboard, Mod-Script): [SETUP.md](https://github.com/${REPO}/blob/master/SETUP.md).`,
  ].join('\n')

  run('gh', [
    'release', 'create', tag,
    join(staging, 'aetherial-roll20.crx'),
    join(staging, 'aetherial-roll20.zip'),
    join(extDir, 'updates.xml'),
    '--repo', REPO,
    '--title', `Roll20-Extension v${version}`,
    '--notes', notes,
  ], { stdio: 'inherit' })

  console.log(`[release-ext] published ${tag} → https://github.com/${REPO}/releases/tag/${tag}`)
} finally {
  rmSync(staging, { recursive: true, force: true })
}
