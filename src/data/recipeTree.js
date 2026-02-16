// Recipe Skill Tree - Aetherial Brewing System

export const recipeTree = {
  id: 'aetherial-recipes',
  name: 'Aetherial Recipe Tree',
  description: 'Learn and upgrade recipes by discovering new ingredient combinations',

  // Alle verfügbaren Zutaten
  ingredients: {
    // Common
    wolfsfarn: { name: 'Wolfsfarn', rarity: 'Common' },
    orgain: { name: 'Orgain', rarity: 'Common' },
    feuerblute: { name: 'Feuerblüte', rarity: 'Common' },
    eisenkraut: { name: 'Eisenkraut', rarity: 'Common' },
    bergveilchen: { name: 'Bergveilchen', rarity: 'Common' },
    schattenkraut: { name: 'Schattenkraut', rarity: 'Common' },
    mondkresse: { name: 'Mondkresse', rarity: 'Common' },
    waldfarn: { name: 'Waldfarn', rarity: 'Common' },
    wiesensalbei: { name: 'Wiesensalbei', rarity: 'Common' },

    // Uncommon
    manndrache: { name: 'Manndrache', rarity: 'Uncommon' },
    glutwurz: { name: 'Glutwurz', rarity: 'Uncommon' },
    alraunenkraut: { name: 'Alraunenkraut', rarity: 'Uncommon' },
    silberspross: { name: 'Silberspross', rarity: 'Uncommon' },
    elfenhaar: { name: 'Elfenhaar', rarity: 'Uncommon' },

    // Rare
    todeswurz: { name: 'Todeswurz', rarity: 'Rare' },
    silberweide: { name: 'Silberweide', rarity: 'Rare' },
    sternenfeuerkraut: { name: 'Sternenfeuerkraut', rarity: 'Rare' },
    hexenholz: { name: 'Hexenholz', rarity: 'Rare' },

    // Very Rare
    drachenmelisse: { name: 'Drachenmelisse', rarity: 'Very Rare' },
    geisterzunge: { name: 'Geisterzunge', rarity: 'Very Rare' },
    schattenmondblute: { name: 'Schattenmondblüte', rarity: 'Very Rare' },

    // Legendary
    mondfarn: { name: 'Mondfarn', rarity: 'Legendary' },
    ewiggrün: { name: 'Ewiggrün', rarity: 'Legendary' },
    drachenauge: { name: 'Drachenauge', rarity: 'Legendary' },
    phönixfederkraut: { name: 'Phönixfederkraut', rarity: 'Legendary' },
    runenwurz: { name: 'Runenwurz', rarity: 'Legendary' },
  },

  // Recipe Tree Structure
  recipes: [
    // ========== HEALING POTIONS BRANCH ==========
    {
      id: 'heal-small',
      name: 'Kleiner Heiltrank',
      tier: 1,
      category: 'healing',
      icon: '💚',
      rarity: 'Common',
      effect: 'Heilt 2d4+2 HP',
      dc: 10,
      brewTime: '1 Stunde',
      cost: 0,
      position: { x: 1, y: 1 },
      requires: [],
      unlocks: ['heal-medium', 'heal-regen'],
      ingredients: [
        { id: 'wolfsfarn', amount: 2 },
        { id: 'eisenkraut', amount: 1 }
      ]
    },
    {
      id: 'heal-medium',
      name: 'Mittlerer Heiltrank',
      tier: 2,
      category: 'healing',
      icon: '💙',
      rarity: 'Uncommon',
      effect: 'Heilt 4d4+4 HP',
      dc: 13,
      brewTime: '4 Stunden',
      cost: 1,
      position: { x: 1, y: 2 },
      requires: ['heal-small'],
      unlocks: ['heal-large', 'heal-fire', 'heal-frost'],
      ingredients: [
        { id: 'wolfsfarn', amount: 3 },
        { id: 'manndrache', amount: 2 },
        { id: 'eisenkraut', amount: 2 }
      ]
    },
    {
      id: 'heal-regen',
      name: 'Regenerations Elixir',
      tier: 2,
      category: 'healing',
      icon: '💗',
      rarity: 'Uncommon',
      effect: 'Heilt 1d4 HP pro Runde für 10 Runden',
      dc: 12,
      brewTime: '3 Stunden',
      cost: 1,
      position: { x: 0.5, y: 2 },
      requires: ['heal-small'],
      unlocks: ['heal-super-regen'],
      ingredients: [
        { id: 'wolfsfarn', amount: 2 },
        { id: 'alraunenkraut', amount: 1 },
        { id: 'mondkresse', amount: 2 }
      ]
    },
    {
      id: 'heal-large',
      name: 'Großer Heiltrank',
      tier: 3,
      category: 'healing',
      icon: '💜',
      rarity: 'Rare',
      effect: 'Heilt 8d4+8 HP',
      dc: 15,
      brewTime: '8 Stunden',
      cost: 2,
      position: { x: 1, y: 3 },
      requires: ['heal-medium'],
      unlocks: ['heal-legendary', 'heal-divine'],
      ingredients: [
        { id: 'wolfsfarn', amount: 4 },
        { id: 'manndrache', amount: 3 },
        { id: 'silberweide', amount: 2 },
        { id: 'sternenfeuerkraut', amount: 1 }
      ]
    },
    {
      id: 'heal-super-regen',
      name: 'Ewige Regeneration',
      tier: 3,
      category: 'healing',
      icon: '❤️',
      rarity: 'Rare',
      effect: 'Heilt 2d4 HP pro Runde für 1 Minute',
      dc: 16,
      brewTime: '10 Stunden',
      cost: 2,
      position: { x: 0.5, y: 3 },
      requires: ['heal-regen'],
      unlocks: ['heal-legendary'],
      ingredients: [
        { id: 'alraunenkraut', amount: 3 },
        { id: 'silberweide', amount: 2 },
        { id: 'mondkresse', amount: 3 }
      ]
    },
    {
      id: 'heal-legendary',
      name: 'Legendärer Heiltrank',
      tier: 4,
      category: 'healing',
      icon: '💛',
      rarity: 'Legendary',
      effect: 'Heilt komplett, entfernt alle negativen Zustände',
      dc: 23,
      brewTime: '7 Tage',
      cost: 5,
      position: { x: 1, y: 4 },
      requires: ['heal-large', 'heal-super-regen'],
      unlocks: ['heal-divine'],
      ingredients: [
        { id: 'wolfsfarn', amount: 10 },
        { id: 'drachenmelisse', amount: 3 },
        { id: 'ewiggrün', amount: 2 },
        { id: 'drachenauge', amount: 1 }
      ]
    },
    {
      id: 'heal-divine',
      name: 'Göttliche Heilung',
      tier: 5,
      category: 'healing',
      icon: '✨',
      rarity: 'Legendary',
      effect: 'Volle Heilung + Regeneriert verlorene Gliedmaßen + Verjüngung',
      dc: 27,
      brewTime: '21 Tage',
      cost: 10,
      position: { x: 1, y: 5 },
      requires: ['heal-legendary'],
      unlocks: [],
      ingredients: [
        { id: 'phönixfederkraut', amount: 5 },
        { id: 'ewiggrün', amount: 3 },
        { id: 'runenwurz', amount: 2 }
      ]
    },

    // ========== HYBRID HEALING POTIONS ==========
    {
      id: 'heal-fire',
      name: 'Heilendes Feuer',
      tier: 3,
      category: 'hybrid',
      icon: '🔥',
      rarity: 'Rare',
      effect: 'Heilt 4d4+4 HP + Feuerwiderstand 1 Stunde',
      dc: 16,
      brewTime: '8 Stunden',
      cost: 2,
      position: { x: 1.5, y: 3 },
      requires: ['heal-medium', 'fire-resist'],
      unlocks: [],
      ingredients: [
        { id: 'wolfsfarn', amount: 3 },
        { id: 'feuerblute', amount: 4 },
        { id: 'glutwurz', amount: 2 }
      ]
    },
    {
      id: 'heal-frost',
      name: 'Heilender Frost',
      tier: 3,
      category: 'hybrid',
      icon: '❄️',
      rarity: 'Rare',
      effect: 'Heilt 4d4+4 HP + Kältewiderstand 1 Stunde',
      dc: 16,
      brewTime: '8 Stunden',
      cost: 2,
      position: { x: 0.5, y: 3.5 },
      requires: ['heal-medium', 'frost-resist'],
      unlocks: [],
      ingredients: [
        { id: 'wolfsfarn', amount: 3 },
        { id: 'mondkresse', amount: 4 },
        { id: 'silberspross', amount: 2 }
      ]
    },

    // ========== RESISTANCE POTIONS BRANCH ==========
    {
      id: 'fire-resist',
      name: 'Feuerwiderstand',
      tier: 1,
      category: 'resistance',
      icon: '🔥',
      rarity: 'Uncommon',
      effect: 'Resistenz gegen Feuerschaden für 1 Stunde',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      position: { x: 3, y: 2 },
      requires: [],
      unlocks: ['fire-immunity', 'dragon-breath'],
      ingredients: [
        { id: 'feuerblute', amount: 3 },
        { id: 'glutwurz', amount: 2 }
      ]
    },
    {
      id: 'frost-resist',
      name: 'Kältewiderstand',
      tier: 1,
      category: 'resistance',
      icon: '❄️',
      rarity: 'Uncommon',
      effect: 'Resistenz gegen Kälteschaden für 1 Stunde',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      position: { x: 3.5, y: 2 },
      requires: [],
      unlocks: ['frost-immunity'],
      ingredients: [
        { id: 'mondkresse', amount: 3 },
        { id: 'silberspross', amount: 2 }
      ]
    },
    {
      id: 'fire-immunity',
      name: 'Feuerimmunität',
      tier: 2,
      category: 'resistance',
      icon: '🔥',
      rarity: 'Rare',
      effect: 'Immunität gegen Feuerschaden für 10 Minuten',
      dc: 18,
      brewTime: '12 Stunden',
      cost: 3,
      position: { x: 3, y: 3 },
      requires: ['fire-resist'],
      unlocks: ['dragon-form'],
      ingredients: [
        { id: 'feuerblute', amount: 5 },
        { id: 'glutwurz', amount: 4 },
        { id: 'drachenmelisse', amount: 2 }
      ]
    },
    {
      id: 'dragon-breath',
      name: 'Drachenatem',
      tier: 3,
      category: 'combat',
      icon: '🐉',
      rarity: 'Very Rare',
      effect: 'Kann 3x Drachenatem verwenden (8d6 Feuerschaden)',
      dc: 20,
      brewTime: '24 Stunden',
      cost: 3,
      position: { x: 3.5, y: 3.5 },
      requires: ['fire-resist'],
      unlocks: ['dragon-form'],
      ingredients: [
        { id: 'glutwurz', amount: 5 },
        { id: 'drachenmelisse', amount: 3 },
        { id: 'feuerblute', amount: 4 }
      ]
    },
    {
      id: 'dragon-form',
      name: 'Drachenform',
      tier: 4,
      category: 'transformation',
      icon: '🐲',
      rarity: 'Legendary',
      effect: 'Verwandlung in Drachen für 10 Minuten',
      dc: 25,
      brewTime: '14 Tage',
      cost: 5,
      position: { x: 3.25, y: 4 },
      requires: ['fire-immunity', 'dragon-breath'],
      unlocks: [],
      ingredients: [
        { id: 'drachenmelisse', amount: 10 },
        { id: 'drachenauge', amount: 3 },
        { id: 'glutwurz', amount: 8 }
      ]
    },

    // ========== STEALTH & MAGIC BRANCH ==========
    {
      id: 'invisibility',
      name: 'Unsichtbarkeit',
      tier: 2,
      category: 'stealth',
      icon: '👻',
      rarity: 'Rare',
      effect: 'Unsichtbarkeit für 1 Stunde',
      dc: 15,
      brewTime: '8 Stunden',
      cost: 2,
      position: { x: 5, y: 2 },
      requires: [],
      unlocks: ['greater-invisibility', 'shadow-walk'],
      ingredients: [
        { id: 'schattenkraut', amount: 4 },
        { id: 'todeswurz', amount: 2 },
        { id: 'hexenholz', amount: 1 }
      ]
    },
    {
      id: 'shadow-walk',
      name: 'Schattengang',
      tier: 3,
      category: 'stealth',
      icon: '🌑',
      rarity: 'Very Rare',
      effect: 'Kann 3x durch Schatten teleportieren (60ft)',
      dc: 18,
      brewTime: '16 Stunden',
      cost: 3,
      position: { x: 5, y: 3 },
      requires: ['invisibility'],
      unlocks: ['shadow-master'],
      ingredients: [
        { id: 'schattenkraut', amount: 6 },
        { id: 'schattenmondblute', amount: 3 },
        { id: 'todeswurz', amount: 2 }
      ]
    },
    {
      id: 'greater-invisibility',
      name: 'Wahre Unsichtbarkeit',
      tier: 4,
      category: 'stealth',
      icon: '✨',
      rarity: 'Legendary',
      effect: 'Unsichtbarkeit die nicht gebrochen werden kann, 1 Stunde',
      dc: 27,
      brewTime: '14 Tage',
      cost: 5,
      position: { x: 4.5, y: 4 },
      requires: ['shadow-walk'],
      unlocks: [],
      ingredients: [
        { id: 'schattenmondblute', amount: 5 },
        { id: 'mondfarn', amount: 3 },
        { id: 'runenwurz', amount: 2 }
      ]
    },
    {
      id: 'shadow-master',
      name: 'Schattenmeister',
      tier: 4,
      category: 'stealth',
      icon: '🌚',
      rarity: 'Legendary',
      effect: 'Kontrolle über Schatten, wie Shadow of Moil Zauber',
      dc: 24,
      brewTime: '10 Tage',
      cost: 4,
      position: { x: 5.5, y: 4 },
      requires: ['shadow-walk'],
      unlocks: [],
      ingredients: [
        { id: 'schattenmondblute', amount: 8 },
        { id: 'todeswurz', amount: 5 },
        { id: 'hexenholz', amount: 3 }
      ]
    }
  ]
}

// Helper function to get ingredient details
export const getIngredient = (id) => {
  return recipeTree.ingredients[id]
}

// Helper to get recipe by ID
export const getRecipe = (id) => {
  return recipeTree.recipes.find(r => r.id === id)
}

// Get all recipes in a category
export const getRecipesByCategory = (category) => {
  return recipeTree.recipes.filter(r => r.category === category)
}
