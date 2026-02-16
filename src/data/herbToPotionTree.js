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

// Helper: Erstelle Bezier-Kurve für schönere Verbindungslinien
export const createCurvedPath = (from, to, centerX, centerY) => {
  // Berechne Kontrollpunkte für quadratische Bezier-Kurve
  // Die Kurve biegt sich leicht zum Zentrum hin
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2

  // Vektor zum Zentrum
  const toCenterX = centerX - midX
  const toCenterY = centerY - midY
  const length = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY)

  // Normalisiere und skaliere (20% zum Zentrum hin)
  const controlOffset = 0.2
  const controlX = midX + (toCenterX / length) * length * controlOffset
  const controlY = midY + (toCenterY / length) * length * controlOffset

  return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`
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

// Berechne radiale Positionen für Kräuter mit verbessertem Layout
export const generateHerbPositions = () => {
  const herbs = getAllHerbs()
  const herbPositions = {}

  // Sortiere Kräuter nach Rarität und Kategorie
  const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']
  const herbsByRarity = {}

  rarityOrder.forEach(rarity => {
    herbsByRarity[rarity] = herbs.filter(h => h.rarity === rarity)
  })

  // Größere Base-Radien für bessere Verteilung (wie D3.js separation)
  const baseRadii = {
    'Common': 6,
    'Uncommon': 10,
    'Rare': 14,
    'Very Rare': 18,
    'Legendary': 22
  }

  // Verteile Kräuter nach Rarität-Ringen
  rarityOrder.forEach((rarity, rarityIndex) => {
    const herbsInRing = herbsByRarity[rarity]
    if (!herbsInRing || herbsInRing.length === 0) return

    const radius = baseRadii[rarity]
    const angleIncrement = 360 / herbsInRing.length

    herbsInRing.forEach((herb, index) => {
      const angle = index * angleIncrement
      const pos = polarToCartesian(angle, radius)

      herbPositions[herb.id] = {
        x: pos.x,
        y: pos.y,
        angle: angle,
        radius: radius,
        rarity: rarity
      }
    })
  })

  return herbPositions
}

// Berechne radiale Positionen für Tränke
export const generatePotionPositions = (herbPositions = null) => {
  const potions = aetherialRecipeTree.recipes
  // Verwende übergebene Positionen oder generiere neue
  const herbs = herbPositions || generateHerbPositions()
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
      const herbPos = herbs[ing.id]
      if (herbPos) {
        ingredientAngles.push(herbPos.angle)
        avgRadius += herbPos.radius
      }
    })

    if (ingredientAngles.length > 0) {
      avgRadius = avgRadius / ingredientAngles.length

      // Position zwischen den Zutaten
      const angle = averageAngles(ingredientAngles)

      // Bessere Radius-Berechnung: Tränke liegen zwischen Zentrum und Kräutern
      // Tier 1: 60% des Weges, Tier 2: 65%, Tier 3: 70%, Tier 4: 75%, Tier 5: 80%
      const radiusMultiplier = 0.55 + (potion.tier * 0.05)
      const radius = avgRadius * radiusMultiplier

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
export const generateHerbToPotionConnections = (herbPositions = null, potionPositions = null) => {
  const connections = []
  const herbs = herbPositions || generateHerbPositions()
  const potions = potionPositions || generatePotionPositions(herbs)

  aetherialRecipeTree.recipes.forEach(potion => {
    const potionPos = potions[potion.id]
    if (!potionPos) return

    potion.ingredients.forEach(ingredient => {
      const herbPos = herbs[ingredient.id]
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
        const reqPos = potions[reqId]
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

// Generiere Positionen EINMAL und cache sie
const cachedHerbPositions = generateHerbPositions()
const cachedPotionPositions = generatePotionPositions(cachedHerbPositions)
const cachedConnections = generateHerbToPotionConnections(cachedHerbPositions, cachedPotionPositions)

// Exportiere die komplette Tree-Struktur
export const herbToPotionTree = {
  herbs: getAllHerbs().map(herb => {
    const pos = cachedHerbPositions[herb.id]
    return {
      ...herb,
      position: pos
    }
  }),
  potions: aetherialRecipeTree.recipes.map(potion => {
    const pos = cachedPotionPositions[potion.id]
    return {
      ...potion,
      position: pos
    }
  }),
  connections: cachedConnections
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
