// Potion Icon Mapper - Maps potion categories and tiers to pixel art images

export const getPotionIcon = (category, tier, rarity) => {
  // Mapping based on category and tier
  const mapping = {
    // Healing potions - RED
    healing: {
      1: 'Small Vial - RED - 0000.png',
      2: 'Round Potion - RED - 0000.png',
      3: 'Big Vial - RED - 0000.png',
      4: 'Large Bottle - RED - 0000.png',
      5: 'Glowing Potion - RED - 0000.png'
    },

    // Mana potions - BLUE/CYAN
    mana: {
      1: 'Small Vial - BLUE - 0000.png',
      2: 'Round Potion - BLUE - 0000.png',
      3: 'Big Vial - BLUE - 0000.png',
      4: 'Large Bottle - BLUE - 0000.png',
      5: 'Glowing Potion - CYAN - 0000.png'
    },

    // Fire/Heat potions - ORANGE/GOLD
    resistance: {
      // Fire
      fire: {
        1: 'Small Vial - ORANGE - 0000.png',
        2: 'Round Potion - ORANGE - 0000.png',
        3: 'Large Tonic - ORANGE - 0000.png',
        4: 'Glowing Potion - GOLD - 0000.png'
      },
      // Cold
      cold: {
        1: 'Small Vial - TURQUOISE - 0000.png',
        2: 'Round Potion - TURQUOISE - 0000.png',
        3: 'Large Tonic - TURQUOISE - 0000.png',
        4: 'Glowing Potion - CYAN - 0000.png'
      },
      // Lightning
      lightning: {
        1: 'Small Vial - YELLOW - 0000.png',
        2: 'Round Potion - YELLOW - 0000.png',
        3: 'Large Tonic - YELLOW - 0000.png'
      },
      // Poison
      poison: {
        1: 'Small Vial - GREEN - 0000.png',
        2: 'Round Potion - GREEN - 0000.png',
        3: 'Large Tonic - GREEN - 0000.png',
        4: 'Glowing Potion - GREEN - 0000.png'
      },
      // Generic resistance
      default: {
        1: 'Small Bottle - TEAL - 0000.png',
        2: 'Classic Jar - TEAL - 0000.png',
        3: 'Large Jar - TEAL - 0000.png'
      }
    },

    // Combat potions - PURPLE/MAGENTA
    combat: {
      1: 'Small Bottle - PURPLE - 0000.png',
      2: 'Round Potion - PURPLE - 0000.png',
      3: 'Big Vial - PURPLE - 0000.png',
      4: 'Large Bottle - PURPLE - 0000.png',
      5: 'Glowing Potion - PURPLE - 0000.png'
    },

    // Stealth potions - BLACK/PURPLE
    stealth: {
      1: 'Small Elixir - PURPLE -0000.png',
      2: 'Encased Potion - BROWN_PURPLE - 0000.png',
      3: 'Bubbly Brew Bottle - BLACK - 0000.png',
      4: 'Glowing Potion - BLACK - 0000.png'
    },

    // Transformation potions - MAGENTA/PINK
    transformation: {
      1: 'Small Vial - PINK - 0000.png',
      2: 'Round Potion - MAGENTA - 0000.png',
      3: 'Bubbly Brew Bottle Rising - PINK - 0000.png',
      4: 'Large Bottle - PINK - 0000.png',
      5: 'Glowing Potion - PINK - 0000.png'
    },

    // Utility potions - GREEN/LIME
    utility: {
      1: 'Small Vial - LIME - 0000.png',
      2: 'Round Potion - LIME - 0000.png',
      3: 'Big Vial - LIME - 0000.png',
      4: 'Large Bottle - LIME - 0000.png',
      5: 'Glowing Potion - LIME - 0000.png'
    },

    // Protection potions - GOLD
    protection: {
      1: 'Small Bottle - GOLD - 0000.png',
      2: 'Classic Jar - GOLD - 0000.png',
      3: 'Large Jar - GOLD - 0000.png',
      4: 'Encased Potion - GOLD - 0000.png',
      5: 'Glowing Potion - GOLD - 0000.png'
    },

    // Hybrid potions - Multiple colors
    hybrid: {
      1: 'Small Bottle - PURPLE_LIME - 0000.png',
      2: 'Encased Potion - LIME_PURPLE - 0000.png',
      3: 'Classic Jar - BLUE_GOLD - 0000.png',
      4: 'Large Jar - TURQUOISE_GOLD - 0000.png',
      5: 'Bubbly Brew Bottle Rising - GOLD - 0000.png'
    },

    // Social potions - Pink/charm effects
    social: {
      1: 'Small Elixir - PINK - 0000.png',
      2: 'Round Potion - MAGENTA - 0000.png',
      3: 'Encased Potion - GOLD_PURPLE - 0000.png',
      4: 'Large Bottle - PINK - 0000.png',
      5: 'Glowing Potion - PINK - 0000.png'
    }
  }

  // Get the icon based on category and tier
  let icon = null

  if (category === 'resistance') {
    // Check if it's a specific resistance type
    const subTypes = ['fire', 'cold', 'lightning', 'poison']
    for (const subType of subTypes) {
      if (mapping.resistance[subType] && mapping.resistance[subType][tier]) {
        icon = mapping.resistance[subType][tier]
        break
      }
    }
    // Fallback to default resistance
    if (!icon && mapping.resistance.default[tier]) {
      icon = mapping.resistance.default[tier]
    }
  } else if (mapping[category]) {
    if (typeof mapping[category] === 'object' && !Array.isArray(mapping[category])) {
      icon = mapping[category][tier]
    }
  }

  // Fallback based on tier if no category match
  if (!icon) {
    const fallbackByTier = {
      1: 'Small Vial - GOLD - 0000.png',
      2: 'Round Potion - GOLD - 0000.png',
      3: 'Big Vial - GOLD - 0000.png',
      4: 'Large Bottle - GOLD - 0000.png',
      5: 'Glowing Potion - GOLD - 0000.png'
    }
    icon = fallbackByTier[tier] || fallbackByTier[1]
  }

  return `/assets/potions/${icon}`
}

// Helper: Determine resistance subtype from potion name
export const getResistanceSubtype = (potionName) => {
  const name = potionName.toLowerCase()
  if (name.includes('feuer') || name.includes('fire') || name.includes('drachen')) return 'fire'
  if (name.includes('kälte') || name.includes('cold') || name.includes('eis') || name.includes('frost')) return 'cold'
  if (name.includes('blitz') || name.includes('lightning') || name.includes('sturm')) return 'lightning'
  if (name.includes('gift') || name.includes('poison')) return 'poison'
  return 'default'
}
