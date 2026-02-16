// Kraut-zu-Trank Wallpaper Tree
// Zeigt welche Kräuter in welchen Tränken verwendet werden

import { herbsDatabase, getAllHerbs } from './herbsDatabase'
import { aetherialRecipeTree } from './aetherialRecipeTree'

// Berechne Positionen für Kräuter (oben)
export const generateHerbPositions = () => {
  const herbs = getAllHerbs()
  const herbPositions = {}

  // Sortiere Kräuter nach Rarität und dann alphabetisch
  const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']
  herbs.sort((a, b) => {
    const rarityDiff = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
    if (rarityDiff !== 0) return rarityDiff
    return a.name.localeCompare(b.name)
  })

  // Position Kräuter horizontal
  herbs.forEach((herb, index) => {
    herbPositions[herb.id] = {
      x: index * 1.5, // Horizontal spacing
      y: 0 // Alle Kräuter auf y=0
    }
  })

  return herbPositions
}

// Berechne Positionen für Tränke (unten)
export const generatePotionPositions = () => {
  const potions = aetherialRecipeTree.recipes
  const potionPositions = {}

  // Gruppiere nach Tier
  const tiers = [1, 2, 3, 4, 5]

  tiers.forEach(tier => {
    const tierPotions = potions.filter(p => p.tier === tier)
    tierPotions.forEach((potion, index) => {
      potionPositions[potion.id] = {
        x: index * 2, // Horizontal spacing
        y: tier * 3 // Vertikale Ebenen nach Tier
      }
    })
  })

  return potionPositions
}

// Generiere Verbindungen von Kräutern zu Tränken
export const generateHerbToPotionConnections = () => {
  const connections = []
  const herbPositions = generateHerbPositions()
  const potionPositions = generatePotionPositions()

  aetherialRecipeTree.recipes.forEach(potion => {
    potion.ingredients.forEach(ingredient => {
      const herbPos = herbPositions[ingredient.id]
      const potionPos = potionPositions[potion.id]

      if (herbPos && potionPos) {
        connections.push({
          herbId: ingredient.id,
          potionId: potion.id,
          herbPos,
          potionPos,
          amount: ingredient.amount
        })
      }
    })
  })

  return connections
}

// Exportiere die komplette Tree-Struktur
export const herbToPotionTree = {
  herbs: getAllHerbs().map(herb => ({
    ...herb,
    position: generateHerbPositions()[herb.id]
  })),
  potions: aetherialRecipeTree.recipes.map(potion => ({
    ...potion,
    position: generatePotionPositions()[potion.id]
  })),
  connections: generateHerbToPotionConnections()
}

// Helper: Finde welche Tränke ein bestimmtes Kraut verwenden
export const getPotionsUsingHerb = (herbId) => {
  return aetherialRecipeTree.recipes.filter(potion =>
    potion.ingredients.some(ing => ing.id === herbId)
  )
}

// Helper: Finde welche Kräuter ein bestimmter Trank verwendet
export const getHerbsForPotion = (potionId) => {
  const potion = aetherialRecipeTree.recipes.find(p => p.id === potionId)
  if (!potion) return []

  return potion.ingredients.map(ing => ({
    ...herbsDatabase[ing.id],
    amount: ing.amount
  }))
}
