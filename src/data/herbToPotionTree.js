// Kraut-zu-Trank Radial Tree (Path of Exile Style)
// Heiltrank im Zentrum, Kräuter und Tränke radial angeordnet

import { herbsDatabase, getAllHerbs } from './herbsDatabase'
import { aetherialRecipeTree } from './aetherialRecipeTree'

// Helper: Konvertiere Polarkoordinaten zu Kartesisch
const polarToCartesian = (angle, radius) => {
  const radians = (angle * Math.PI) / 180
  return {
    x: radius * Math.cos(radians),
    y: radius * Math.sin(radians)
  }
}

// Helper: Berechne Durchschnittswinkel von mehreren Winkeln
const averageAngles = (angles) => {
  if (angles.length === 0) return 0
  if (angles.length === 1) return angles[0]

  // Konvertiere zu Vektoren, mitteln, zurück zu Winkel
  let sumX = 0
  let sumY = 0
  angles.forEach(angle => {
    const rad = (angle * Math.PI) / 180
    sumX += Math.cos(rad)
    sumY += Math.sin(rad)
  })

  const avgRad = Math.atan2(sumY / angles.length, sumX / angles.length)
  let avgAngle = (avgRad * 180) / Math.PI
  if (avgAngle < 0) avgAngle += 360

  return avgAngle
}

// Berechne radiale Positionen für Kräuter
export const generateHerbPositions = () => {
  const herbs = getAllHerbs()
  const herbPositions = {}

  // Sortiere Kräuter nach Rarität
  const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']
  const herbsByRarity = {}

  rarityOrder.forEach(rarity => {
    herbsByRarity[rarity] = herbs.filter(h => h.rarity === rarity)
  })

  let currentAngle = 0
  const angleIncrement = 360 / herbs.length // Gleichmäßig verteilen

  // Verteile alle Kräuter gleichmäßig im Kreis
  herbs.forEach((herb, index) => {
    const rarityIndex = rarityOrder.indexOf(herb.rarity)
    const radius = 3 + rarityIndex * 2 // Radius basierend auf Rarität: 3, 5, 7, 9, 11

    const angle = currentAngle
    const pos = polarToCartesian(angle, radius)

    herbPositions[herb.id] = {
      x: pos.x,
      y: pos.y,
      angle: angle,
      radius: radius
    }

    currentAngle += angleIncrement
  })

  return herbPositions
}

// Berechne radiale Positionen für Tränke
export const generatePotionPositions = () => {
  const potions = aetherialRecipeTree.recipes
  const herbPositions = generateHerbPositions()
  const potionPositions = {}

  potions.forEach(potion => {
    // Sonderfall: Heiltrank im Zentrum
    if (potion.id === 'healing-potion') {
      potionPositions[potion.id] = {
        x: 0,
        y: 0,
        angle: 0,
        radius: 0
      }
      return
    }

    // Berechne Position basierend auf Zutaten
    const ingredientAngles = []
    let avgRadius = 0

    potion.ingredients.forEach(ing => {
      const herbPos = herbPositions[ing.id]
      if (herbPos) {
        ingredientAngles.push(herbPos.angle)
        avgRadius += herbPos.radius
      }
    })

    if (ingredientAngles.length > 0) {
      avgRadius = avgRadius / ingredientAngles.length

      // Position zwischen den Zutaten
      const angle = averageAngles(ingredientAngles)

      // Radius basierend auf Tier und durchschnittlicher Zutaten-Rarität
      const radius = avgRadius + potion.tier * 0.5

      const pos = polarToCartesian(angle, radius)

      potionPositions[potion.id] = {
        x: pos.x,
        y: pos.y,
        angle: angle,
        radius: radius
      }
    } else {
      // Fallback: Positioniere nach Tier
      const angle = (potion.tier * 137.5) % 360 // Golden angle
      const radius = 8 + potion.tier * 2
      const pos = polarToCartesian(angle, radius)

      potionPositions[potion.id] = {
        x: pos.x,
        y: pos.y,
        angle: angle,
        radius: radius
      }
    }
  })

  return potionPositions
}

// Generiere Verbindungen: Trank -> Zutaten
export const generateHerbToPotionConnections = () => {
  const connections = []
  const herbPositions = generateHerbPositions()
  const potionPositions = generatePotionPositions()

  aetherialRecipeTree.recipes.forEach(potion => {
    const potionPos = potionPositions[potion.id]
    if (!potionPos) return

    potion.ingredients.forEach(ingredient => {
      const herbPos = herbPositions[ingredient.id]
      if (herbPos) {
        connections.push({
          herbId: ingredient.id,
          potionId: potion.id,
          herbPos,
          potionPos,
          amount: ingredient.amount
        })
      }
    })

    // Verbindung zu vorausgesetzten Tränken
    if (potion.requires && potion.requires.length > 0) {
      potion.requires.forEach(reqId => {
        const reqPos = potionPositions[reqId]
        if (reqPos) {
          connections.push({
            fromPotionId: reqId,
            toPotionId: potion.id,
            fromPos: reqPos,
            toPos: potionPos,
            isRequirement: true
          })
        }
      })
    }
  })

  return connections
}

// Exportiere die komplette Tree-Struktur
export const herbToPotionTree = {
  herbs: getAllHerbs().map(herb => {
    const pos = generateHerbPositions()[herb.id]
    return {
      ...herb,
      position: pos
    }
  }),
  potions: aetherialRecipeTree.recipes.map(potion => {
    const pos = generatePotionPositions()[potion.id]
    return {
      ...potion,
      position: pos
    }
  }),
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
