#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Bump the Roll20 extension version AND regenerate its git-tracked update
// manifest in one step, so the two can never drift apart:
//
//   npm run bump:ext 2.8
//     → roll20-extension/manifest.json   version = 2.8
//     → roll20-extension/updates.xml     codebase = …/releases/download/ext-v2.8/…
//
// Installed extensions poll updates.xml via raw.githubusercontent.com (see
// "update_url" in manifest.json). Commit + push the result; the deploy then
// publishes the matching GitHub release (tools/release-ext.mjs).
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'fs'
import { createHash } from 'crypto'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname    = dirname(fileURLToPath(import.meta.url))
const extDir       = join(__dirname, '..', 'roll20-extension')
const manifestPath = join(extDir, 'manifest.json')
const updatesPath  = join(extDir, 'updates.xml')

const REPO = 'caaatto/aetherial-alchemy'

const version = process.argv[2]
if (!/^\d+(\.\d+){0,3}$/.test(version ?? '')) {
  console.error('Usage: npm run bump:ext <version>   (e.g. npm run bump:ext 2.8)')
  process.exit(1)
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const previous = manifest.version
manifest.version = version

// Chrome extension id = first 16 bytes of SHA-256 over the DER public key
// ("key" in the manifest), each nibble mapped to a-p.
const keyHash = createHash('sha256').update(Buffer.from(manifest.key, 'base64')).digest()
const appId = [...keyHash.subarray(0, 16)]
  .map(b => String.fromCharCode(97 + (b >> 4)) + String.fromCharCode(97 + (b & 15)))
  .join('')

const crxUrl = `https://github.com/${REPO}/releases/download/ext-v${version}/aetherial-roll20.crx`

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
writeFileSync(updatesPath, `<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='${appId}'>
    <updatecheck codebase='${crxUrl}' version='${version}'/>
  </app>
</gupdate>
`)

console.log(`[bump-ext] ${previous} → ${version} (extension id ${appId})`)
console.log(`[bump-ext] updated: manifest.json + updates.xml`)
console.log(`[bump-ext] next: commit + push — the deploy publishes release ext-v${version}`)
