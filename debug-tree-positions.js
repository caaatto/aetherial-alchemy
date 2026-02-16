import { herbToPotionTree } from './src/data/herbToPotionTree.js'

console.log('=== Herb Position Debug ===')
console.log('Total herbs:', herbToPotionTree.herbs.length)
console.log('Herbs with positions:', herbToPotionTree.herbs.filter(h => h.position).length)
console.log('Herbs without positions:', herbToPotionTree.herbs.filter(h => !h.position).length)

const herbsWithoutPos = herbToPotionTree.herbs.filter(h => !h.position)
if (herbsWithoutPos.length > 0) {
  console.log('\nHerbs missing positions:')
  herbsWithoutPos.forEach(h => console.log(`  - ${h.name} (${h.id})`))
}

console.log('\n=== Potion Position Debug ===')
console.log('Total potions:', herbToPotionTree.potions.length)
console.log('Potions with positions:', herbToPotionTree.potions.filter(p => p.position).length)
console.log('Potions without positions:', herbToPotionTree.potions.filter(p => !p.position).length)

const potionsWithoutPos = herbToPotionTree.potions.filter(p => !p.position)
if (potionsWithoutPos.length > 0) {
  console.log('\nPotions missing positions:')
  potionsWithoutPos.forEach(p => console.log(`  - ${p.name} (${p.id})`))
}

console.log('\n=== Connection Debug ===')
console.log('Total connections:', herbToPotionTree.connections.length)

const invalidConnections = herbToPotionTree.connections.filter(conn => {
  if (conn.herbId) {
    return !conn.herbPos || !conn.potionPos
  } else if (conn.isRequirement) {
    return !conn.fromPos || !conn.toPos
  }
  return false
})

console.log('Invalid connections (missing positions):', invalidConnections.length)
if (invalidConnections.length > 0) {
  console.log('\nInvalid connections:')
  invalidConnections.forEach((conn, i) => {
    if (conn.herbId) {
      console.log(`  ${i+1}. Herb ${conn.herbId} -> Potion ${conn.potionId}`)
    } else {
      console.log(`  ${i+1}. Potion ${conn.fromPotionId} -> Potion ${conn.toPotionId}`)
    }
  })
}

console.log('\n=== Sample Positions ===')
const sampleHerb = herbToPotionTree.herbs.find(h => h.position)
if (sampleHerb) {
  console.log('Sample herb position:', sampleHerb.name, sampleHerb.position)
}

const samplePotion = herbToPotionTree.potions.find(p => p.position)
if (samplePotion) {
  console.log('Sample potion position:', samplePotion.name, samplePotion.position)
}
