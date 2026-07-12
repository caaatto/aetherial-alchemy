import { getAllHerbs } from './src/data/herbsDatabase.js'
import fs from 'fs'

const WIKI_BASE = 'https://aetherial.fandom.com/wiki/'

// Liste aller Kräuter
const herbs = getAllHerbs()

console.log(` Fetching descriptions for ${herbs.length} herbs from Aetherial Wiki...`)
console.log('  This is a dry run - showing what would be fetched\n')

// Generiere die URL für jedes Kraut
const herbUrls = herbs.map(herb => {
  // Konvertiere Krautnamen zu Wiki-URL-Format
  const wikiName = herb.name
    .replace(/\s+/g, '_')  // Leerzeichen zu Unterstrichen
    .replace(/ä/g, 'ä')
    .replace(/ö/g, 'ö')
    .replace(/ü/g, 'ü')
    .replace(/Ä/g, 'Ä')
    .replace(/Ö/g, 'Ö')
    .replace(/Ü/g, 'Ü')
    .replace(/ß/g, 'ß')

  return {
    id: herb.id,
    name: herb.name,
    rarity: herb.rarity,
    url: `${WIKI_BASE}${wikiName}`,
    currentDescription: herb.description
  }
})

// Gruppiere nach Rarität
const byRarity = {
  'Common': herbUrls.filter(h => h.rarity === 'Common'),
  'Uncommon': herbUrls.filter(h => h.rarity === 'Uncommon'),
  'Rare': herbUrls.filter(h => h.rarity === 'Rare'),
  'Very Rare': herbUrls.filter(h => h.rarity === 'Very Rare'),
  'Legendary': herbUrls.filter(h => h.rarity === 'Legendary')
}

// Ausgabe
Object.entries(byRarity).forEach(([rarity, herbs]) => {
  if (herbs.length === 0) return

  console.log(`\n ${rarity} (${herbs.length} herbs)`)
  console.log('─'.repeat(80))

  herbs.forEach((herb, i) => {
    console.log(`${i + 1}. ${herb.name}`)
    console.log(`   URL: ${herb.url}`)
    console.log(`   Current: "${herb.currentDescription}"`)
    console.log()
  })
})

console.log('\n To fetch descriptions, you can use the Claude Code WebFetch tool')
console.log('   for each URL and update the herbsDatabase.js file.')

// Speichere die URLs in eine JSON-Datei für spätere Verwendung
fs.writeFileSync(
  '.herb-wiki-urls.json',
  JSON.stringify(herbUrls, null, 2),
  'utf8'
)

console.log('\n Herb URLs saved to .herb-wiki-urls.json')
