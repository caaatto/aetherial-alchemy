import fs from 'fs'

// Fix non-existent icon paths
const filePath = './src/data/aetherialRecipeTree.js'
let content = fs.readFileSync(filePath, 'utf8')

// First, apply fixes for known missing icons
const fixes = [
  { from: 'Encased Potion - RED - 0000.png', to: 'Small Bottle - RED - 0000.png' }
]

fixes.forEach(({ from, to }) => {
  const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
  const count = (content.match(regex) || []).length
  if (count > 0) {
    content = content.replace(regex, to)
    console.log(` Fixed: ${from} → ${to} (${count} instances)`)
  }
})

// Write back immediately
fs.writeFileSync(filePath, content, 'utf8')

// Re-read for verification
content = fs.readFileSync(filePath, 'utf8')

// Check which images exist
const existingImages = fs.readdirSync('./public/assets/potions/')

// Find all non-existent icon references
const iconRegex = /icon: '\/assets\/potions\/([^']+)'/g
let match
const usedIcons = new Set()

while ((match = iconRegex.exec(content)) !== null) {
  usedIcons.add(match[1])
}

console.log('Checking for non-existent icons...')
const nonExistent = []

usedIcons.forEach(icon => {
  if (!existingImages.includes(icon)) {
    console.log(` Missing: ${icon}`)
    nonExistent.push(icon)
  }
})

if (nonExistent.length > 0) {
  console.log(`\nFound ${nonExistent.length} non-existent icons`)
  console.log('Please update potionIconMapper.js to use correct image names')
} else {
  console.log(' All icons exist!')
}
