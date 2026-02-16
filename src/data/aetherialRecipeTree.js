// Aetherial Recipe Tree - D&D 5e basierte Tränke erweitert
// Mana-Integration + Aetherial Kräuter

import { getPotionIcon, getResistanceSubtype } from './potionIconMapper.js'

// Helper function to get icon for a recipe
const getIcon = (recipe) => {
  let category = recipe.category

  // Special handling for resistance potions
  if (category === 'resistance') {
    const subtype = getResistanceSubtype(recipe.name)
    // Temporarily store subtype in recipe for icon selection
    recipe._subtype = subtype
  }

  return getPotionIcon(category, recipe.tier, recipe.rarity)
}

export const aetherialRecipeTree = {
  recipes: [
    // ========== TIER 1: BASIC POTIONS (Common) ==========
    {
      id: 'healing-potion',
      name: 'Heiltrank',
      tier: 1,
      category: 'healing',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Heilt 2d4+2 HP',
      dc: 10,
      brewTime: '1 Stunde',
      cost: 0,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 1, y: 1 },
      requires: [],
      unlocks: ['greater-healing', 'healing-regen', 'healing-mana-combo'],
      ingredients: [
        { id: 'wolfsfarn', amount: 2 },
        { id: 'eisenkraut', amount: 1 }
      ],
      dndSource: 'DMG p.187 - Potion of Healing'
    },
    {
      id: 'mana-potion-minor',
      name: 'Kleiner Mana-Trank',
      tier: 1,
      category: 'mana',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Regeneriert 10 Mana',
      dc: 10,
      brewTime: '1 Stunde',
      cost: 0,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 2.5, y: 1 },
      requires: [],
      unlocks: ['mana-potion-greater', 'healing-mana-combo'],
      ingredients: [
        { id: 'mondkresse', amount: 3 },
        { id: 'schattenkraut', amount: 2 }
      ],
      dndSource: 'Homebrew - basiert auf Spell Slot Recovery'
    },
    {
      id: 'fire-resistance',
      name: 'Feuerwiderstand',
      tier: 1,
      category: 'resistance',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Resistenz gegen Feuerschaden für 1 Stunde',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 5, y: 1 },
      requires: [],
      unlocks: ['fire-immunity', 'elemental-ward'],
      ingredients: [
        { id: 'feuerblute', amount: 3 },
        { id: 'glutwurz', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Potion of Fire Resistance'
    },
    {
      id: 'climbing',
      name: 'Klettertrank',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Kletter-Geschwindigkeit = Laufgeschwindigkeit für 1 Stunde',
      dc: 11,
      brewTime: '2 Stunden',
      cost: 0,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 6.5, y: 1 },
      requires: [],
      unlocks: ['spider-climb'],
      ingredients: [
        { id: 'waldfarn', amount: 2 },
        { id: 'wanderkraut', amount: 2 }
      ],
      dndSource: 'DMG p.187 - Potion of Climbing'
    },

    // ========== TIER 2: IMPROVED POTIONS (Uncommon) ==========
    {
      id: 'greater-healing',
      name: 'Großer Heiltrank',
      tier: 2,
      category: 'healing',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Heilt 4d4+4 HP',
      dc: 13,
      brewTime: '4 Stunden',
      cost: 1,
      manaCost: 5,
      manaLevelRequired: 1,
      position: { x: 1, y: 2 },
      requires: ['healing-potion'],
      unlocks: ['superior-healing', 'healing-restoration'],
      ingredients: [
        { id: 'wolfsfarn', amount: 3 },
        { id: 'manndrache', amount: 2 },
        { id: 'eisenkraut', amount: 2 }
      ],
      dndSource: 'DMG p.187 - Potion of Greater Healing'
    },
    {
      id: 'healing-regen',
      name: 'Regenerations-Elixier',
      tier: 2,
      category: 'healing',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Heilt 1d4 HP zu Beginn deines Zuges für 10 Runden',
      dc: 14,
      brewTime: '3 Stunden',
      cost: 1,
      manaCost: 8,
      manaLevelRequired: 1,
      position: { x: 0.5, y: 2 },
      requires: ['healing-potion'],
      unlocks: ['regeneration-strong'],
      ingredients: [
        { id: 'wolfsfarn', amount: 2 },
        { id: 'alraunenkraut', amount: 2 },
        { id: 'mondkresse', amount: 2 }
      ],
      dndSource: 'Homebrew - basiert auf Regeneration Zauber'
    },
    {
      id: 'healing-mana-combo',
      name: 'Vitalitäts-Elixier',
      tier: 2,
      category: 'hybrid',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Heilt 2d4+2 HP und regeneriert 10 Mana',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 1,
      manaCost: 5,
      manaLevelRequired: 2,
      position: { x: 1.75, y: 2 },
      requires: ['healing-potion', 'mana-potion-minor'],
      unlocks: ['vitality-supreme'],
      ingredients: [
        { id: 'wolfsfarn', amount: 2 },
        { id: 'mondkresse', amount: 2 },
        { id: 'manndrache', amount: 1 }
      ],
      dndSource: 'Homebrew - Hybrid Potion'
    },
    {
      id: 'mana-potion-greater',
      name: 'Großer Mana-Trank',
      tier: 2,
      category: 'mana',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Regeneriert 25 Mana',
      dc: 13,
      brewTime: '4 Stunden',
      cost: 1,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 2.5, y: 2 },
      requires: ['mana-potion-minor'],
      unlocks: ['mana-potion-superior', 'mana-burst'],
      ingredients: [
        { id: 'mondkresse', amount: 4 },
        { id: 'alraunenkraut', amount: 2 },
        { id: 'sonnenlaub', amount: 2 }
      ],
      dndSource: 'Homebrew - Mana Recovery'
    },
    {
      id: 'invisibility',
      name: 'Unsichtbarkeit',
      tier: 2,
      category: 'stealth',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Unsichtbarkeit für 1 Stunde (bricht bei Angriff)',
      dc: 15,
      brewTime: '8 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 8, y: 2 },
      requires: [],
      unlocks: ['greater-invisibility', 'shadow-step'],
      ingredients: [
        { id: 'schattenkraut', amount: 4 },
        { id: 'todeswurz', amount: 2 },
        { id: 'hexenholz', amount: 1 }
      ],
      dndSource: 'DMG p.188 - Potion of Invisibility'
    },
    {
      id: 'spider-climb',
      name: 'Spinnenklettern',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Klettere an Wänden und Decken für 1 Stunde',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 1,
      manaCost: 10,
      manaLevelRequired: 1,
      position: { x: 6.5, y: 2 },
      requires: ['climbing'],
      unlocks: ['levitation'],
      ingredients: [
        { id: 'waldfarn', amount: 3 },
        { id: 'elfenhaar', amount: 2 },
        { id: 'wanderkraut', amount: 2 }
      ],
      dndSource: 'Homebrew - basiert auf Spider Climb Zauber'
    },

    // ========== TIER 3: STRONG POTIONS (Rare) ==========
    {
      id: 'superior-healing',
      name: 'Überlegener Heiltrank',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Heilt 8d4+8 HP',
      dc: 15,
      brewTime: '8 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 1, y: 3 },
      requires: ['greater-healing'],
      unlocks: ['supreme-healing'],
      ingredients: [
        { id: 'wolfsfarn', amount: 4 },
        { id: 'manndrache', amount: 3 },
        { id: 'silberweide', amount: 2 },
        { id: 'sternenfeuerkraut', amount: 1 }
      ],
      dndSource: 'DMG p.187 - Potion of Superior Healing'
    },
    {
      id: 'healing-restoration',
      name: 'Heilung & Restaurierung',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Heilt 4d4+4 HP und entfernt 1 Krankheit oder Zustand',
      dc: 16,
      brewTime: '10 Stunden',
      cost: 2,
      manaCost: 20,
      manaLevelRequired: 2,
      position: { x: 1.5, y: 3 },
      requires: ['greater-healing'],
      unlocks: ['greater-restoration-potion'],
      ingredients: [
        { id: 'silberweide', amount: 3 },
        { id: 'bergveilchen', amount: 3 },
        { id: 'manndrache', amount: 2 }
      ],
      dndSource: 'Homebrew - basiert auf Lesser Restoration'
    },
    {
      id: 'regeneration-strong',
      name: 'Starke Regeneration',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Heilt 2d4 HP zu Beginn deines Zuges für 1 Minute',
      dc: 17,
      brewTime: '10 Stunden',
      cost: 2,
      manaCost: 25,
      manaLevelRequired: 2,
      position: { x: 0.5, y: 3 },
      requires: ['healing-regen'],
      unlocks: ['troll-regeneration'],
      ingredients: [
        { id: 'alraunenkraut', amount: 4 },
        { id: 'silberweide', amount: 2 },
        { id: 'ewiggrün', amount: 1 }
      ],
      dndSource: 'Homebrew - Strong Regeneration'
    },
    {
      id: 'fire-immunity',
      name: 'Feuerimmunität',
      tier: 3,
      category: 'resistance',
      icon: '/assets/potions/Large Tonic - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Immunität gegen Feuerschaden für 10 Minuten',
      dc: 18,
      brewTime: '12 Stunden',
      cost: 2,
      manaCost: 30,
      manaLevelRequired: 2,
      position: { x: 5, y: 3 },
      requires: ['fire-resistance'],
      unlocks: ['dragon-breath', 'elemental-immunity'],
      ingredients: [
        { id: 'feuerblute', amount: 5 },
        { id: 'glutwurz', amount: 4 },
        { id: 'drachenmelisse', amount: 2 }
      ],
      dndSource: 'Homebrew - Immunity Potion'
    },
    {
      id: 'dragon-breath',
      name: 'Drachenatem',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Kann 3x Drachenatem verwenden (8d6 Feuerschaden, DC 15 DEX)',
      dc: 20,
      brewTime: '24 Stunden',
      cost: 3,
      manaCost: 40,
      manaLevelRequired: 3,
      position: { x: 5.5, y: 3.5 },
      requires: ['fire-resistance'],
      unlocks: ['dragon-transformation'],
      ingredients: [
        { id: 'glutwurz', amount: 5 },
        { id: 'drachenmelisse', amount: 3 },
        { id: 'feuerblute', amount: 4 }
      ],
      dndSource: 'Homebrew - Dragon Breath'
    },
    {
      id: 'greater-invisibility',
      name: 'Wahre Unsichtbarkeit',
      tier: 3,
      category: 'stealth',
      icon: '/assets/potions/Bubbly Brew Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Unsichtbarkeit für 1 Stunde (bricht NICHT bei Angriff)',
      dc: 22,
      brewTime: '16 Stunden',
      cost: 3,
      manaCost: 50,
      manaLevelRequired: 3,
      position: { x: 8, y: 3 },
      requires: ['invisibility'],
      unlocks: ['etherealness'],
      ingredients: [
        { id: 'schattenmondblute', amount: 4 },
        { id: 'todeswurz', amount: 3 },
        { id: 'hexenholz', amount: 2 },
        { id: 'mondfarn', amount: 1 }
      ],
      dndSource: 'Homebrew - Greater Invisibility Spell'
    },
    {
      id: 'shadow-step',
      name: 'Schattensch ritt',
      tier: 3,
      category: 'stealth',
      icon: '/assets/potions/Bubbly Brew Bottle - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Teleportiere 3x durch Schatten (60ft)',
      dc: 18,
      brewTime: '12 Stunden',
      cost: 2,
      manaCost: 35,
      manaLevelRequired: 2,
      position: { x: 8.5, y: 3 },
      requires: ['invisibility'],
      unlocks: ['shadow-mastery'],
      ingredients: [
        { id: 'schattenkraut', amount: 6 },
        { id: 'schattenmondblute', amount: 3 },
        { id: 'todeswurz', amount: 2 }
      ],
      dndSource: 'Homebrew - Shadow Teleportation'
    },
    {
      id: 'mana-potion-superior',
      name: 'Überlegener Mana-Trank',
      tier: 3,
      category: 'mana',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Regeneriert 50 Mana',
      dc: 16,
      brewTime: '10 Stunden',
      cost: 2,
      manaCost: 0,
      manaLevelRequired: 2,
      position: { x: 2.5, y: 3 },
      requires: ['mana-potion-greater'],
      unlocks: ['mana-potion-supreme'],
      ingredients: [
        { id: 'mondkresse', amount: 6 },
        { id: 'alraunenkraut', amount: 3 },
        { id: 'silberweide', amount: 2 },
        { id: 'mondfarn', amount: 1 }
      ],
      dndSource: 'Homebrew - Superior Mana Recovery'
    },

    // ========== TIER 4: VERY RARE POTIONS (Legendary) ==========
    {
      id: 'supreme-healing',
      name: 'Supremer Heiltrank',
      tier: 4,
      category: 'healing',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Heilt 10d4+20 HP',
      dc: 18,
      brewTime: '24 Stunden',
      cost: 3,
      manaCost: 40,
      manaLevelRequired: 3,
      position: { x: 1, y: 4 },
      requires: ['superior-healing'],
      unlocks: ['divine-healing'],
      ingredients: [
        { id: 'wolfsfarn', amount: 8 },
        { id: 'silberweide', amount: 5 },
        { id: 'drachenmelisse', amount: 3 },
        { id: 'ewiggrün', amount: 2 }
      ],
      dndSource: 'DMG p.187 - Potion of Supreme Healing'
    },
    {
      id: 'troll-regeneration',
      name: 'Troll-Regeneration',
      tier: 4,
      category: 'healing',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Regeneriere 3d6 HP pro Runde für 10 Runden (außer Feuer/Säure)',
      dc: 20,
      brewTime: '48 Stunden',
      cost: 4,
      manaCost: 60,
      manaLevelRequired: 3,
      position: { x: 0.5, y: 4 },
      requires: ['regeneration-strong'],
      unlocks: ['immortality-temp'],
      ingredients: [
        { id: 'alraunenkraut', amount: 8 },
        { id: 'ewiggrün', amount: 4 },
        { id: 'silberweide', amount: 3 }
      ],
      dndSource: 'Homebrew - Troll Regeneration'
    },
    {
      id: 'vitality-supreme',
      name: 'Supremes Vitalitäts-Elixier',
      tier: 4,
      category: 'hybrid',
      icon: '/assets/potions/Large Jar - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Heilt 8d4+8 HP und regeneriert 50 Mana',
      dc: 20,
      brewTime: '24 Stunden',
      cost: 3,
      manaCost: 30,
      manaLevelRequired: 3,
      position: { x: 1.75, y: 4 },
      requires: ['healing-mana-combo'],
      unlocks: ['ultimate-vitality'],
      ingredients: [
        { id: 'wolfsfarn', amount: 5 },
        { id: 'mondkresse', amount: 6 },
        { id: 'silberweide', amount: 3 },
        { id: 'mondfarn', amount: 2 }
      ],
      dndSource: 'Homebrew - Supreme Hybrid'
    },
    {
      id: 'mana-potion-supreme',
      name: 'Supremer Mana-Trank',
      tier: 4,
      category: 'mana',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Regeneriert 100 Mana',
      dc: 19,
      brewTime: '24 Stunden',
      cost: 3,
      manaCost: 0,
      manaLevelRequired: 3,
      position: { x: 2.5, y: 4 },
      requires: ['mana-potion-superior'],
      unlocks: ['mana-overflow'],
      ingredients: [
        { id: 'mondfarn', amount: 5 },
        { id: 'alraunenkraut', amount: 6 },
        { id: 'ewiggrün', amount: 3 }
      ],
      dndSource: 'Homebrew - Supreme Mana'
    },
    {
      id: 'dragon-transformation',
      name: 'Drachengestalt',
      tier: 4,
      category: 'transformation',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Verwandle dich in einen jungen Drachen für 10 Minuten',
      dc: 25,
      brewTime: '7 Tage',
      cost: 5,
      manaCost: 100,
      manaLevelRequired: 4,
      position: { x: 5.5, y: 4 },
      requires: ['fire-immunity', 'dragon-breath'],
      unlocks: [],
      ingredients: [
        { id: 'drachenmelisse', amount: 10 },
        { id: 'drachenauge', amount: 3 },
        { id: 'glutwurz', amount: 8 },
        { id: 'feuerblute', amount: 6 }
      ],
      dndSource: 'Homebrew - Polymorph Dragon'
    },
    {
      id: 'etherealness',
      name: 'Äthergestalt',
      tier: 4,
      category: 'stealth',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Werde ätherisch für 1 Stunde (Ethereal Plane)',
      dc: 22,
      brewTime: '48 Stunden',
      cost: 4,
      manaCost: 80,
      manaLevelRequired: 3,
      position: { x: 8, y: 4 },
      requires: ['greater-invisibility'],
      unlocks: [],
      ingredients: [
        { id: 'geisterzunge', amount: 5 },
        { id: 'schattenmondblute', amount: 4 },
        { id: 'hexenholz', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Oil of Etherealness'
    },

    // ========== TIER 5: DIVINE POTIONS (Legendary/Divine) ==========
    {
      id: 'divine-healing',
      name: 'Göttliche Heilung',
      tier: 5,
      category: 'healing',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Volle Heilung + Regeneriert Gliedmaßen + entfernt ALLE Zustände',
      dc: 27,
      brewTime: '21 Tage',
      cost: 10,
      manaCost: 150,
      manaLevelRequired: 4,
      position: { x: 1, y: 5 },
      requires: ['supreme-healing'],
      unlocks: [],
      ingredients: [
        { id: 'phonixfederkraut', amount: 5 },
        { id: 'gotterbalsam', amount: 3 },
        { id: 'ewiggrün', amount: 4 },
        { id: 'runenwurz', amount: 2 }
      ],
      dndSource: 'Homebrew - True Divine Healing'
    },
    {
      id: 'immortality-temp',
      name: 'Temporäre Unsterblichkeit',
      tier: 5,
      category: 'protection',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Kannst nicht unter 1 HP fallen für 24 Stunden',
      dc: 28,
      brewTime: '30 Tage',
      cost: 10,
      manaCost: 200,
      manaLevelRequired: 4,
      position: { x: 0.5, y: 5 },
      requires: ['troll-regeneration'],
      unlocks: [],
      ingredients: [
        { id: 'ewiggrün', amount: 10 },
        { id: 'phonixfederkraut', amount: 5 },
        { id: 'drachenauge', amount: 3 }
      ],
      dndSource: 'Homebrew - Temporary Immortality'
    },
    {
      id: 'ultimate-vitality',
      name: 'Ultimatives Vitalitäts-Elixier',
      tier: 5,
      category: 'hybrid',
      icon: '/assets/potions/Bubbly Brew Bottle Rising - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Volle Heilung + Regeneriert 150 Mana + +4 auf alle Rettungswürfe für 1 Stunde',
      dc: 26,
      brewTime: '30 Tage',
      cost: 10,
      manaCost: 100,
      manaLevelRequired: 4,
      position: { x: 1.75, y: 5 },
      requires: ['vitality-supreme'],
      unlocks: [],
      ingredients: [
        { id: 'phonixfederkraut', amount: 4 },
        { id: 'mondfarn', amount: 6 },
        { id: 'ewiggrün', amount: 4 },
        { id: 'runenwurz', amount: 3 }
      ],
      dndSource: 'Homebrew - Ultimate Hybrid'
    },
    {
      id: 'mana-overflow',
      name: 'Mana-Überlauf',
      tier: 5,
      category: 'mana',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Regeneriert 200 Mana + Doppelte Zauber-Wirkung für 10 Minuten',
      dc: 25,
      brewTime: '21 Tage',
      cost: 10,
      manaCost: 0,
      manaLevelRequired: 4,
      position: { x: 2.5, y: 5 },
      requires: ['mana-potion-supreme'],
      unlocks: [],
      ingredients: [
        { id: 'mondfarn', amount: 10 },
        { id: 'runenwurz', amount: 5 },
        { id: 'phonixfederkraut', amount: 3 }
      ],
      dndSource: 'Homebrew - Mana Overflow'
    },

    // ========== ADDITIONAL RESISTANCE POTIONS ==========
    {
      id: 'cold-resistance',
      name: 'Kältewiderstand',
      tier: 1,
      category: 'resistance',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Resistenz gegen Kälteschaden für 1 Stunde',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 5, y: 2 },
      requires: [],
      unlocks: ['cold-immunity', 'elemental-ward'],
      ingredients: [
        { id: 'eisblume', amount: 3 },
        { id: 'frostfarn', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Potion of Cold Resistance'
    },
    {
      id: 'cold-immunity',
      name: 'Kälte-Immunität',
      tier: 3,
      category: 'resistance',
      icon: '/assets/potions/Large Tonic - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Immunität gegen Kälteschaden für 1 Stunde',
      dc: 18,
      brewTime: '8 Stunden',
      cost: 3,
      manaCost: 30,
      manaLevelRequired: 2,
      position: { x: 5, y: 3.5 },
      requires: ['cold-resistance'],
      unlocks: ['elemental-mastery'],
      ingredients: [
        { id: 'eisblume', amount: 6 },
        { id: 'frostfarn', amount: 5 },
        { id: 'bergveilchen', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Immunity'
    },
    {
      id: 'lightning-resistance',
      name: 'Blitzwiderstand',
      tier: 1,
      category: 'resistance',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Resistenz gegen Blitzschaden für 1 Stunde',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 4, y: 2 },
      requires: [],
      unlocks: ['lightning-immunity', 'elemental-ward'],
      ingredients: [
        { id: 'blitzgras', amount: 3 },
        { id: 'sturmklee', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Potion of Lightning Resistance'
    },
    {
      id: 'poison-resistance',
      name: 'Giftwiderstand',
      tier: 1,
      category: 'resistance',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Resistenz gegen Giftschaden für 1 Stunde, Vorteil bei Rettungswürfen gegen Gift',
      dc: 12,
      brewTime: '2 Stunden',
      cost: 1,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 3.5, y: 1 },
      requires: [],
      unlocks: ['poison-immunity', 'antitoxin-supreme'],
      ingredients: [
        { id: 'todeswurz', amount: 2 },
        { id: 'bitterlaub', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Poison Resistance'
    },
    {
      id: 'poison-immunity',
      name: 'Gift-Immunität',
      tier: 2,
      category: 'resistance',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Immunität gegen Giftschaden und vergiftet-Zustand für 1 Stunde',
      dc: 16,
      brewTime: '6 Stunden',
      cost: 2,
      manaCost: 20,
      manaLevelRequired: 2,
      position: { x: 3.5, y: 2.5 },
      requires: ['poison-resistance'],
      unlocks: ['antitoxin-supreme'],
      ingredients: [
        { id: 'todeswurz', amount: 5 },
        { id: 'bitterlaub', amount: 4 },
        { id: 'silberweide', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Potion of Immunity'
    },
    {
      id: 'elemental-ward',
      name: 'Elementarschutz',
      tier: 3,
      category: 'resistance',
      icon: '/assets/potions/Large Jar - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Resistenz gegen Feuer, Kälte, Blitz und Säure für 1 Stunde',
      dc: 20,
      brewTime: '12 Stunden',
      cost: 4,
      manaCost: 50,
      manaLevelRequired: 3,
      position: { x: 4.5, y: 3.5 },
      requires: ['fire-resistance', 'cold-resistance', 'lightning-resistance'],
      unlocks: ['elemental-mastery'],
      ingredients: [
        { id: 'feuerblute', amount: 4 },
        { id: 'eisblume', amount: 4 },
        { id: 'blitzgras', amount: 4 },
        { id: 'runenwurz', amount: 2 }
      ],
      dndSource: 'Homebrew - Multi-Resistance'
    },
    {
      id: 'elemental-mastery',
      name: 'Elementarmeisterschaft',
      tier: 5,
      category: 'resistance',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Immunität gegen alle Elementarschäden (Feuer, Kälte, Blitz, Säure, Donner) für 1 Stunde',
      dc: 25,
      brewTime: '24 Stunden',
      cost: 6,
      manaCost: 100,
      manaLevelRequired: 4,
      position: { x: 4.5, y: 5 },
      requires: ['elemental-ward', 'cold-immunity'],
      unlocks: [],
      ingredients: [
        { id: 'runenwurz', amount: 8 },
        { id: 'phonixfederkraut', amount: 5 },
        { id: 'drachenauge', amount: 3 },
        { id: 'gotterbalsam', amount: 2 }
      ],
      dndSource: 'Homebrew - Ultimate Elemental Immunity'
    },

    // ========== STRENGTH POTIONS ==========
    {
      id: 'giant-strength-hill',
      name: 'Riesenstärke (Hügel)',
      tier: 1,
      category: 'combat',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Stärke wird 21 für 1 Stunde',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 1,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 8, y: 1 },
      requires: [],
      unlocks: ['giant-strength-stone'],
      ingredients: [
        { id: 'eisenkraut', amount: 4 },
        { id: 'manndrache', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Hill Giant Strength'
    },
    {
      id: 'giant-strength-stone',
      name: 'Riesenstärke (Stein)',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Stärke wird 23 für 1 Stunde',
      dc: 16,
      brewTime: '6 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 8, y: 2 },
      requires: ['giant-strength-hill'],
      unlocks: ['giant-strength-frost'],
      ingredients: [
        { id: 'eisenkraut', amount: 5 },
        { id: 'manndrache', amount: 4 },
        { id: 'bergveilchen', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Stone Giant Strength'
    },
    {
      id: 'giant-strength-frost',
      name: 'Riesenstärke (Frost)',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Stärke wird 23 für 1 Stunde',
      dc: 16,
      brewTime: '6 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 8, y: 3 },
      requires: ['giant-strength-stone'],
      unlocks: ['giant-strength-fire'],
      ingredients: [
        { id: 'eisenkraut', amount: 5 },
        { id: 'frostfarn', amount: 4 },
        { id: 'bergveilchen', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Frost Giant Strength'
    },
    {
      id: 'giant-strength-fire',
      name: 'Riesenstärke (Feuer)',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Stärke wird 25 für 1 Stunde',
      dc: 17,
      brewTime: '8 Stunden',
      cost: 3,
      manaCost: 25,
      manaLevelRequired: 2,
      position: { x: 8, y: 4 },
      requires: ['giant-strength-frost'],
      unlocks: ['giant-strength-cloud'],
      ingredients: [
        { id: 'eisenkraut', amount: 6 },
        { id: 'feuerblute', amount: 5 },
        { id: 'drachenmelisse', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Fire Giant Strength'
    },
    {
      id: 'giant-strength-cloud',
      name: 'Riesenstärke (Wolken)',
      tier: 4,
      category: 'combat',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Stärke wird 27 für 1 Stunde',
      dc: 20,
      brewTime: '12 Stunden',
      cost: 4,
      manaCost: 40,
      manaLevelRequired: 3,
      position: { x: 8, y: 5 },
      requires: ['giant-strength-fire'],
      unlocks: ['giant-strength-storm'],
      ingredients: [
        { id: 'eisenkraut', amount: 8 },
        { id: 'wolkenkraut', amount: 5 },
        { id: 'ewiggrün', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Cloud Giant Strength'
    },
    {
      id: 'giant-strength-storm',
      name: 'Riesenstärke (Sturm)',
      tier: 5,
      category: 'combat',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Stärke wird 29 für 1 Stunde',
      dc: 24,
      brewTime: '24 Stunden',
      cost: 6,
      manaCost: 80,
      manaLevelRequired: 4,
      position: { x: 8, y: 6 },
      requires: ['giant-strength-cloud'],
      unlocks: [],
      ingredients: [
        { id: 'eisenkraut', amount: 10 },
        { id: 'sturmklee', amount: 8 },
        { id: 'runenwurz', amount: 5 },
        { id: 'drachenauge', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Storm Giant Strength'
    },

    // ========== SPEED & MOBILITY ==========
    {
      id: 'speed',
      name: 'Geschwindigkeit',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Verdoppelt Bewegungsrate, +2 AC, Vorteil auf DEX-Rettungswürfe, zusätzliche Aktion für 1 Minute',
      dc: 17,
      brewTime: '8 Stunden',
      cost: 3,
      manaCost: 30,
      manaLevelRequired: 2,
      position: { x: 7, y: 2 },
      requires: [],
      unlocks: ['time-stop'],
      ingredients: [
        { id: 'wanderkraut', amount: 6 },
        { id: 'sturmklee', amount: 4 },
        { id: 'blitzgras', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Speed'
    },
    {
      id: 'flying',
      name: 'Flug',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Fluggeschwindigkeit 60 Fuß für 1 Stunde',
      dc: 16,
      brewTime: '6 Stunden',
      cost: 2,
      manaCost: 25,
      manaLevelRequired: 2,
      position: { x: 7, y: 1.5 },
      requires: [],
      unlocks: ['levitation'],
      ingredients: [
        { id: 'wolkenkraut', amount: 5 },
        { id: 'elfenhaar', amount: 4 },
        { id: 'wanderkraut', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Flying'
    },
    {
      id: 'levitation',
      name: 'Levitation',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Levitieren (aufwärts/abwärts bewegen, nicht seitwärts) für 10 Minuten',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      manaCost: 10,
      manaLevelRequired: 1,
      position: { x: 6.5, y: 2.5 },
      requires: [],
      unlocks: ['flying'],
      ingredients: [
        { id: 'wolkenkraut', amount: 3 },
        { id: 'elfenhaar', amount: 2 }
      ],
      dndSource: 'Homebrew - Levitation Effect'
    },

    // ========== UTILITY POTIONS ==========
    {
      id: 'water-breathing',
      name: 'Wasseratmung',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Kann unter Wasser atmen für 1 Stunde',
      dc: 12,
      brewTime: '2 Stunden',
      cost: 1,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 9, y: 1 },
      requires: [],
      unlocks: ['aquatic-mastery'],
      ingredients: [
        { id: 'wasserlilie', amount: 4 },
        { id: 'seealge', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Water Breathing'
    },
    {
      id: 'aquatic-mastery',
      name: 'Aquatische Meisterschaft',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Wasseratmung + Schwimmgeschwindigkeit 60 Fuß für 4 Stunden',
      dc: 15,
      brewTime: '5 Stunden',
      cost: 2,
      manaCost: 20,
      manaLevelRequired: 2,
      position: { x: 9, y: 2 },
      requires: ['water-breathing'],
      unlocks: [],
      ingredients: [
        { id: 'wasserlilie', amount: 6 },
        { id: 'seealge', amount: 5 },
        { id: 'mondkresse', amount: 3 }
      ],
      dndSource: 'Homebrew - Enhanced Water Breathing'
    },
    {
      id: 'darkvision',
      name: 'Dunkelsicht',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Dunkelsicht 60 Fuß für 1 Stunde',
      dc: 12,
      brewTime: '2 Stunden',
      cost: 1,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 9.5, y: 1 },
      requires: [],
      unlocks: ['truesight'],
      ingredients: [
        { id: 'schattenkraut', amount: 3 },
        { id: 'nachtschatten', amount: 2 }
      ],
      dndSource: 'Homebrew - Darkvision Effect'
    },
    {
      id: 'truesight',
      name: 'Wahre Sicht',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Wahre Sicht 60 Fuß für 10 Minuten (sieht Unsichtbares, Illusionen durchschauen)',
      dc: 20,
      brewTime: '12 Stunden',
      cost: 5,
      manaCost: 60,
      manaLevelRequired: 3,
      position: { x: 9.5, y: 3 },
      requires: ['darkvision'],
      unlocks: [],
      ingredients: [
        { id: 'schattenmondblute', amount: 5 },
        { id: 'drachenauge', amount: 3 },
        { id: 'runenwurz', amount: 3 }
      ],
      dndSource: 'Homebrew - Truesight Effect'
    },
    {
      id: 'comprehend-languages',
      name: 'Sprachen Verstehen',
      tier: 1,
      category: 'social',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Verstehe alle gesprochenen Sprachen für 1 Stunde',
      dc: 10,
      brewTime: '1 Stunde',
      cost: 0,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 10, y: 1 },
      requires: [],
      unlocks: ['tongues'],
      ingredients: [
        { id: 'silberzunge', amount: 3 },
        { id: 'bergveilchen', amount: 2 }
      ],
      dndSource: 'Homebrew - Comprehend Languages'
    },
    {
      id: 'tongues',
      name: 'Zungenband',
      tier: 2,
      category: 'social',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Verstehe und spreche alle Sprachen für 1 Stunde',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 10, y: 2 },
      requires: ['comprehend-languages'],
      unlocks: [],
      ingredients: [
        { id: 'silberzunge', amount: 5 },
        { id: 'bergveilchen', amount: 3 },
        { id: 'mondkresse', amount: 2 }
      ],
      dndSource: 'Homebrew - Tongues Effect'
    },

    // ========== DEFENSIVE POTIONS ==========
    {
      id: 'stoneskin',
      name: 'Steinhaut',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Resistenz gegen nicht-magische physische Schäden für 1 Stunde',
      dc: 17,
      brewTime: '8 Stunden',
      cost: 3,
      manaCost: 35,
      manaLevelRequired: 2,
      position: { x: 9, y: 2.5 },
      requires: [],
      unlocks: ['invulnerability'],
      ingredients: [
        { id: 'bergveilchen', amount: 6 },
        { id: 'eisenkraut', amount: 5 },
        { id: 'steinflechte', amount: 4 }
      ],
      dndSource: 'DMG p.188 - Potion of Stoneskin'
    },
    {
      id: 'invulnerability',
      name: 'Unverwundbarkeit',
      tier: 4,
      category: 'combat',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Immunität gegen alle Schäden für 1 Minute',
      dc: 23,
      brewTime: '16 Stunden',
      cost: 5,
      manaCost: 80,
      manaLevelRequired: 3,
      position: { x: 9, y: 4 },
      requires: ['stoneskin'],
      unlocks: [],
      ingredients: [
        { id: 'runenwurz', amount: 6 },
        { id: 'drachenauge', amount: 4 },
        { id: 'ewiggrün', amount: 5 },
        { id: 'phonixfederkraut', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Invulnerability'
    },
    {
      id: 'heroism',
      name: 'Heroismus',
      tier: 1,
      category: 'combat',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Uncommon',
      effect: '+10 temporäre HP, immun gegen Furcht für 1 Stunde',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      manaCost: 10,
      manaLevelRequired: 1,
      position: { x: 9.5, y: 1.5 },
      requires: [],
      unlocks: ['battle-fury'],
      ingredients: [
        { id: 'eisenkraut', amount: 4 },
        { id: 'manndrache', amount: 3 },
        { id: 'sonnenlaub', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Potion of Heroism'
    },
    {
      id: 'battle-fury',
      name: 'Kampfwut',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: '+20 temp HP, +2 auf Angriffswürfe, immun gegen Furcht und Bezauberung, Vorteil auf STR-Checks für 1 Stunde',
      dc: 18,
      brewTime: '10 Stunden',
      cost: 4,
      manaCost: 40,
      manaLevelRequired: 3,
      position: { x: 9.5, y: 3 },
      requires: ['heroism'],
      unlocks: [],
      ingredients: [
        { id: 'eisenkraut', amount: 7 },
        { id: 'drachenmelisse', amount: 5 },
        { id: 'manndrache', amount: 6 },
        { id: 'glutwurz', amount: 4 }
      ],
      dndSource: 'Homebrew - Enhanced Heroism'
    },

    // ========== SOCIAL & MIND POTIONS ==========
    {
      id: 'charm',
      name: 'Bezauberung',
      tier: 2,
      category: 'social',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Ziel muss WIS-Rettungswurf DC 13 machen oder ist bezaubert für 1 Stunde',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 10.5, y: 1.5 },
      requires: [],
      unlocks: ['dominate-mind'],
      ingredients: [
        { id: 'liebeskraut', amount: 5 },
        { id: 'silberzunge', amount: 3 },
        { id: 'mondkresse', amount: 2 }
      ],
      dndSource: 'Homebrew - Charm Person Effect'
    },
    {
      id: 'dominate-mind',
      name: 'Geistbeherrschung',
      tier: 4,
      category: 'social',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Ziel muss WIS-Rettungswurf DC 18 machen oder du kontrollierst seine Handlungen für 10 Minuten',
      dc: 22,
      brewTime: '16 Stunden',
      cost: 5,
      manaCost: 70,
      manaLevelRequired: 3,
      position: { x: 10.5, y: 3 },
      requires: ['charm'],
      unlocks: [],
      ingredients: [
        { id: 'geisterzunge', amount: 6 },
        { id: 'hexenholz', amount: 5 },
        { id: 'mondfarn', amount: 4 }
      ],
      dndSource: 'Homebrew - Dominate Person Effect'
    },
    {
      id: 'mind-reading',
      name: 'Gedankenlesen',
      tier: 2,
      category: 'social',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Lese die Oberflächengedanken einer Kreatur innerhalb 30 Fuß für 10 Minuten',
      dc: 16,
      brewTime: '6 Stunden',
      cost: 3,
      manaCost: 30,
      manaLevelRequired: 2,
      position: { x: 11, y: 2 },
      requires: [],
      unlocks: [],
      ingredients: [
        { id: 'geisterzunge', amount: 4 },
        { id: 'mondkresse', amount: 4 },
        { id: 'schattenmondblute', amount: 3 }
      ],
      dndSource: 'Homebrew - Detect Thoughts'
    },

    // ========== SPECIAL AETHERIAL POTIONS ==========
    {
      id: 'mana-sight',
      name: 'Mana-Sicht',
      tier: 2,
      category: 'mana',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Sehe magische Auren und Manaströme, Detect Magic-Effekt für 1 Stunde',
      dc: 15,
      brewTime: '6 Stunden',
      cost: 2,
      manaCost: 25,
      manaLevelRequired: 2,
      position: { x: 3, y: 2.5 },
      requires: [],
      unlocks: ['astral-vision'],
      ingredients: [
        { id: 'mondkresse', amount: 5 },
        { id: 'schattenmondblute', amount: 3 },
        { id: 'sternenfeuerkraut', amount: 3 }
      ],
      dndSource: 'Homebrew - Detect Magic + Mana Sight'
    },
    {
      id: 'astral-vision',
      name: 'Astrale Vision',
      tier: 4,
      category: 'mana',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Sehe in die Astralebene, wahre Form von Gestaltwandlern, alle magischen Effekte für 10 Minuten',
      dc: 21,
      brewTime: '14 Stunden',
      cost: 5,
      manaCost: 65,
      manaLevelRequired: 3,
      position: { x: 3, y: 4 },
      requires: ['mana-sight'],
      unlocks: [],
      ingredients: [
        { id: 'mondfarn', amount: 6 },
        { id: 'sternenfeuerkraut', amount: 5 },
        { id: 'geisterzunge', amount: 4 },
        { id: 'runenwurz', amount: 3 }
      ],
      dndSource: 'Homebrew - Astral Sight'
    },
    {
      id: 'time-slow',
      name: 'Zeitverlangsamung',
      tier: 4,
      category: 'combat',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Zeit verlangsamt sich für alle außer dir in 30 Fuß Radius für 1 Minute (sie können nur halbe Bewegung oder Aktion)',
      dc: 22,
      brewTime: '16 Stunden',
      cost: 5,
      manaCost: 75,
      manaLevelRequired: 3,
      position: { x: 7, y: 4 },
      requires: ['speed'],
      unlocks: ['time-stop'],
      ingredients: [
        { id: 'mondfarn', amount: 7 },
        { id: 'sternenfeuerkraut', amount: 6 },
        { id: 'ewiggrün', amount: 4 }
      ],
      dndSource: 'DMG p.189 - Potion of Slow'
    },
    {
      id: 'time-stop',
      name: 'Zeitstopp',
      tier: 5,
      category: 'combat',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Stoppe die Zeit für alle außer dir für 1d4+1 Runden',
      dc: 26,
      brewTime: '24 Stunden',
      cost: 7,
      manaCost: 120,
      manaLevelRequired: 4,
      position: { x: 7, y: 5.5 },
      requires: ['time-slow'],
      unlocks: [],
      ingredients: [
        { id: 'runenwurz', amount: 10 },
        { id: 'mondfarn', amount: 8 },
        { id: 'gotterbalsam', amount: 5 },
        { id: 'phonixfederkraut', amount: 4 }
      ],
      dndSource: 'DMG p.189 - Potion of Time Stop'
    },
    {
      id: 'antitoxin-supreme',
      name: 'Universalgegengift',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Heilung aller Gifte, Krankheiten und Flüche (bis Stufe 3)',
      dc: 18,
      brewTime: '10 Stunden',
      cost: 4,
      manaCost: 35,
      manaLevelRequired: 2,
      position: { x: 2.5, y: 3 },
      requires: ['poison-immunity'],
      unlocks: [],
      ingredients: [
        { id: 'bitterlaub', amount: 7 },
        { id: 'silberweide', amount: 5 },
        { id: 'bergveilchen', amount: 4 },
        { id: 'gotterbalsam', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Potion of Vitality + Antitoxin'
    },

    // ========== SIZE MANIPULATION POTIONS ==========
    {
      id: 'growth',
      name: 'Wachstum',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Größe verdoppelt sich, +1d4 Waffenschaden, Vorteil auf STR-Checks für 1 Stunde',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 11, y: 1 },
      requires: [],
      unlocks: ['giant-form'],
      ingredients: [
        { id: 'manndrache', amount: 5 },
        { id: 'eisenkraut', amount: 4 },
        { id: 'bergveilchen', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Growth'
    },
    {
      id: 'diminution',
      name: 'Verkleinerung',
      tier: 2,
      category: 'stealth',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Größe wird halbiert, -1d4 Waffenschaden, Vorteil auf DEX (Stealth) für 1 Stunde',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 11, y: 1.5 },
      requires: [],
      unlocks: ['dust-form'],
      ingredients: [
        { id: 'elfenhaar', amount: 5 },
        { id: 'schattenkraut', amount: 4 },
        { id: 'mondkresse', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Diminution'
    },
    {
      id: 'giant-form',
      name: 'Riesenform',
      tier: 4,
      category: 'combat',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Größe wird Huge, +2d6 Waffenschaden, +20 temp HP, Vorteil auf STR-Checks/Saves für 10 Minuten',
      dc: 21,
      brewTime: '14 Stunden',
      cost: 5,
      manaCost: 60,
      manaLevelRequired: 3,
      position: { x: 11, y: 3 },
      requires: ['growth'],
      unlocks: [],
      ingredients: [
        { id: 'manndrache', amount: 8 },
        { id: 'drachenmelisse', amount: 6 },
        { id: 'eisenkraut', amount: 7 },
        { id: 'ewiggrün', amount: 3 }
      ],
      dndSource: 'Homebrew - Enhanced Enlarge Person'
    },

    // ========== FORM TRANSFORMATION ==========
    {
      id: 'gaseous-form',
      name: 'Gasform',
      tier: 3,
      category: 'stealth',
      icon: '/assets/potions/Bubbly Brew Bottle - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Werde gasförmig, kann durch Spalten fliegen, Resistenz gegen nicht-magischen Schaden für 1 Stunde',
      dc: 18,
      brewTime: '10 Stunden',
      cost: 4,
      manaCost: 45,
      manaLevelRequired: 2,
      position: { x: 11.5, y: 2.5 },
      requires: ['diminution'],
      unlocks: ['dust-form'],
      ingredients: [
        { id: 'wolkenkraut', amount: 6 },
        { id: 'geisterzunge', amount: 5 },
        { id: 'schattenkraut', amount: 5 }
      ],
      dndSource: 'DMG p.188 - Potion of Gaseous Form'
    },
    {
      id: 'dust-form',
      name: 'Staubform',
      tier: 4,
      category: 'stealth',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Werde mikroskopisch klein und gasförmig, unsichtbar, kann überallhin, Immunität gegen physischen Schaden für 10 Minuten',
      dc: 22,
      brewTime: '16 Stunden',
      cost: 6,
      manaCost: 70,
      manaLevelRequired: 3,
      position: { x: 11.5, y: 4 },
      requires: ['gaseous-form', 'diminution'],
      unlocks: [],
      ingredients: [
        { id: 'elfenhaar', amount: 8 },
        { id: 'geisterzunge', amount: 6 },
        { id: 'schattenmondblute', amount: 5 },
        { id: 'mondfarn', amount: 3 }
      ],
      dndSource: 'Homebrew - Extreme Gaseous + Diminution'
    },
    {
      id: 'animal-friendship',
      name: 'Tierfreundschaft',
      tier: 1,
      category: 'social',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Tiere müssen WIS-Rettungswurf DC 11 machen oder sind bezaubert (freundlich) für 1 Stunde',
      dc: 11,
      brewTime: '2 Stunden',
      cost: 0,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 12, y: 1 },
      requires: [],
      unlocks: ['beast-speech', 'animal-shape'],
      ingredients: [
        { id: 'waldbeere', amount: 4 },
        { id: 'liebeskraut', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Animal Friendship'
    },
    {
      id: 'beast-speech',
      name: 'Tiersprache',
      tier: 2,
      category: 'social',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Spreche mit Tieren und verstehe sie für 1 Stunde',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      manaCost: 10,
      manaLevelRequired: 1,
      position: { x: 12, y: 2 },
      requires: ['animal-friendship'],
      unlocks: ['animal-shape'],
      ingredients: [
        { id: 'waldbeere', amount: 5 },
        { id: 'silberzunge', amount: 3 },
        { id: 'waldfarn', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Speak with Animals'
    },
    {
      id: 'animal-shape',
      name: 'Tiergestalt',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Verwandle dich in ein Tier (CR 1 oder niedriger) für 1 Stunde',
      dc: 18,
      brewTime: '10 Stunden',
      cost: 4,
      manaCost: 40,
      manaLevelRequired: 2,
      position: { x: 12, y: 3 },
      requires: ['beast-speech', 'animal-friendship'],
      unlocks: ['polymorph'],
      ingredients: [
        { id: 'waldbeere', amount: 7 },
        { id: 'alraunenkraut', amount: 5 },
        { id: 'mondfarn', amount: 4 },
        { id: 'schattenkraut', amount: 4 }
      ],
      dndSource: 'DMG p.188 - Potion of Animal Shapes'
    },
    {
      id: 'polymorph',
      name: 'Gestaltwandlung',
      tier: 4,
      category: 'utility',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Verwandle dich oder andere in beliebige Kreatur (CR 4 oder niedriger) für 1 Stunde',
      dc: 21,
      brewTime: '14 Stunden',
      cost: 5,
      manaCost: 65,
      manaLevelRequired: 3,
      position: { x: 12, y: 4.5 },
      requires: ['animal-shape'],
      unlocks: [],
      ingredients: [
        { id: 'alraunenkraut', amount: 8 },
        { id: 'mondfarn', amount: 6 },
        { id: 'schattenmondblute', amount: 5 },
        { id: 'runenwurz', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Polymorph'
    },

    // ========== DIVINATION & PERCEPTION ==========
    {
      id: 'clairvoyance',
      name: 'Hellsicht',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Erstelle einen unsichtbaren Sensor an bekanntem Ort (1 Meile) zum Sehen/Hören für 10 Minuten',
      dc: 17,
      brewTime: '8 Stunden',
      cost: 3,
      manaCost: 35,
      manaLevelRequired: 2,
      position: { x: 10, y: 3 },
      requires: [],
      unlocks: ['scrying'],
      ingredients: [
        { id: 'sternenfeuerkraut', amount: 5 },
        { id: 'mondkresse', amount: 5 },
        { id: 'drachenauge', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Potion of Clairvoyance'
    },
    {
      id: 'scrying',
      name: 'Spähen',
      tier: 4,
      category: 'utility',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Spioniere eine bekannte Kreatur aus (unbegrenzte Reichweite), sie kann WIS DC 18 Rettungswurf machen, 10 Minuten',
      dc: 21,
      brewTime: '14 Stunden',
      cost: 5,
      manaCost: 60,
      manaLevelRequired: 3,
      position: { x: 10, y: 4.5 },
      requires: ['clairvoyance'],
      unlocks: [],
      ingredients: [
        { id: 'drachenauge', amount: 6 },
        { id: 'sternenfeuerkraut', amount: 6 },
        { id: 'mondfarn', amount: 5 },
        { id: 'runenwurz', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Scrying'
    },

    // ========== HEALING & VITALITY ==========
    {
      id: 'elixir-health',
      name: 'Elixier der Gesundheit',
      tier: 2,
      category: 'healing',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Heilung aller Krankheiten, vergiftet-Zustand endet, Blindheit/Taubheit geheilt',
      dc: 15,
      brewTime: '6 Stunden',
      cost: 2,
      manaCost: 20,
      manaLevelRequired: 2,
      position: { x: 2, y: 2.5 },
      requires: [],
      unlocks: ['vitality'],
      ingredients: [
        { id: 'silberweide', amount: 5 },
        { id: 'bergveilchen', amount: 4 },
        { id: 'gotterbalsam', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Elixir of Health'
    },
    {
      id: 'vitality',
      name: 'Vitalität',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Entfernt alle Erschöpfungsstufen, heilt alle Krankheiten/Gifte',
      dc: 18,
      brewTime: '10 Stunden',
      cost: 4,
      manaCost: 40,
      manaLevelRequired: 2,
      position: { x: 2, y: 3.5 },
      requires: ['elixir-health'],
      unlocks: [],
      ingredients: [
        { id: 'silberweide', amount: 6 },
        { id: 'ewiggrün', amount: 4 },
        { id: 'phonixfederkraut', amount: 3 },
        { id: 'gotterbalsam', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Vitality'
    },
    {
      id: 'longevity',
      name: 'Langlebigkeit',
      tier: 4,
      category: 'healing',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Biologisches Alter wird um 1d6+6 Jahre reduziert (min. 13 Jahre alt)',
      dc: 20,
      brewTime: '16 Stunden',
      cost: 5,
      manaCost: 50,
      manaLevelRequired: 3,
      position: { x: 1.5, y: 4 },
      requires: [],
      unlocks: [],
      ingredients: [
        { id: 'ewiggrün', amount: 8 },
        { id: 'phonixfederkraut', amount: 4 },
        { id: 'mondfarn', amount: 5 },
        { id: 'gotterbalsam', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Potion of Longevity'
    },

    // ========== DEFENSIVE & ILLUSORY ==========
    {
      id: 'mirror-image',
      name: 'Spiegelbilder',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: '3 illusorische Duplikate erscheinen, Angriffe haben 25% Chance dich zu treffen für 1 Minute',
      dc: 15,
      brewTime: '5 Stunden',
      cost: 2,
      manaCost: 20,
      manaLevelRequired: 2,
      position: { x: 11.5, y: 1.5 },
      requires: [],
      unlocks: ['blur', 'greater-mirror-image'],
      ingredients: [
        { id: 'sternenfeuerkraut', amount: 4 },
        { id: 'schattenkraut', amount: 4 },
        { id: 'mondkresse', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Mirror Image Effect'
    },
    {
      id: 'blur',
      name: 'Verschwimmen',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Angreifer haben Nachteil auf Angriffswürfe gegen dich für 1 Minute',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 11, y: 2 },
      requires: [],
      unlocks: ['displacement'],
      ingredients: [
        { id: 'schattenkraut', amount: 5 },
        { id: 'schattenmondblute', amount: 3 },
        { id: 'elfenhaar', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Blur Effect'
    },
    {
      id: 'displacement',
      name: 'Versetzung',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Erscheine 5 Fuß versetzt, Angreifer haben Nachteil auf Angriffe für 1 Stunde',
      dc: 17,
      brewTime: '8 Stunden',
      cost: 3,
      manaCost: 30,
      manaLevelRequired: 2,
      position: { x: 11, y: 3.5 },
      requires: ['blur'],
      unlocks: [],
      ingredients: [
        { id: 'schattenmondblute', amount: 5 },
        { id: 'geisterzunge', amount: 4 },
        { id: 'mondfarn', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Displacement Effect'
    },
    {
      id: 'greater-mirror-image',
      name: 'Große Spiegelbilder',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: '6 illusorische Duplikate, Angriffe haben nur 14% Chance dich zu treffen für 1 Minute',
      dc: 18,
      brewTime: '10 Stunden',
      cost: 4,
      manaCost: 35,
      manaLevelRequired: 2,
      position: { x: 11.5, y: 3 },
      requires: ['mirror-image'],
      unlocks: [],
      ingredients: [
        { id: 'sternenfeuerkraut', amount: 6 },
        { id: 'schattenmondblute', amount: 5 },
        { id: 'mondfarn', amount: 4 }
      ],
      dndSource: 'Homebrew - Enhanced Mirror Image'
    },

    // ========== SKILL & ABILITY ENHANCEMENT ==========
    {
      id: 'barkskin',
      name: 'Baumrinde',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'AC wird mindestens 16 (kann nicht höher als natürliche AC sein) für 1 Stunde',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 1,
      position: { x: 9, y: 1.5 },
      requires: [],
      unlocks: ['ironwood'],
      ingredients: [
        { id: 'waldfarn', amount: 5 },
        { id: 'eisenkraut', amount: 4 },
        { id: 'bergveilchen', amount: 3 }
      ],
      dndSource: 'DMG p.187 - Barkskin Effect'
    },
    {
      id: 'ironwood',
      name: 'Eisenholz',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'AC wird mindestens 18, Resistenz gegen nicht-magische Hiebwaffen für 1 Stunde',
      dc: 17,
      brewTime: '8 Stunden',
      cost: 3,
      manaCost: 30,
      manaLevelRequired: 2,
      position: { x: 9, y: 3 },
      requires: ['barkskin'],
      unlocks: [],
      ingredients: [
        { id: 'eisenkraut', amount: 7 },
        { id: 'steinflechte', amount: 5 },
        { id: 'bergveilchen', amount: 5 }
      ],
      dndSource: 'Homebrew - Enhanced Barkskin'
    },
    {
      id: 'jump',
      name: 'Sprungkraft',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Sprungdistanz verdreifacht sich für 1 Minute',
      dc: 10,
      brewTime: '1 Stunde',
      cost: 0,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 6.5, y: 1.5 },
      requires: [],
      unlocks: ['super-jump'],
      ingredients: [
        { id: 'wanderkraut', amount: 3 },
        { id: 'sturmklee', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Jump Effect'
    },
    {
      id: 'super-jump',
      name: 'Supersprung',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Sprungdistanz x5, nehme keinen Fallschaden für 10 Minuten',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 1,
      position: { x: 6.5, y: 2.5 },
      requires: ['jump'],
      unlocks: [],
      ingredients: [
        { id: 'wanderkraut', amount: 5 },
        { id: 'sturmklee', amount: 4 },
        { id: 'wolkenkraut', amount: 3 }
      ],
      dndSource: 'Homebrew - Enhanced Jump'
    },
    {
      id: 'oil-slipperiness',
      name: 'Öl der Schlüpfrigkeit',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Automatischer Escape aus Fesseln/Griffen, Vorteil auf Entkommen-Checks für 8 Stunden',
      dc: 13,
      brewTime: '3 Stunden',
      cost: 1,
      manaCost: 10,
      manaLevelRequired: 1,
      position: { x: 10.5, y: 1.5 },
      requires: [],
      unlocks: ['freedom-movement'],
      ingredients: [
        { id: 'seealge', amount: 5 },
        { id: 'wasserlilie', amount: 4 },
        { id: 'elfenhaar', amount: 2 }
      ],
      dndSource: 'DMG p.184 - Oil of Slipperiness'
    },
    {
      id: 'freedom-movement',
      name: 'Bewegungsfreiheit',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Immunität gegen Bewegungseinschränkung, schwieriges Gelände ignorieren, normal im Wasser bewegen für 1 Stunde',
      dc: 17,
      brewTime: '8 Stunden',
      cost: 3,
      manaCost: 30,
      manaLevelRequired: 2,
      position: { x: 10.5, y: 3 },
      requires: ['oil-slipperiness'],
      unlocks: [],
      ingredients: [
        { id: 'seealge', amount: 7 },
        { id: 'wanderkraut', amount: 6 },
        { id: 'wolkenkraut', amount: 4 }
      ],
      dndSource: 'DMG p.188 - Freedom of Movement'
    },

    // ========== LUCK & FORTUNE ==========
    {
      id: 'luck',
      name: 'Glück',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Würfle 1d10 bei jedem d20-Wurf und wähle welches Ergebnis du nutzt für 1 Stunde',
      dc: 18,
      brewTime: '10 Stunden',
      cost: 4,
      manaCost: 40,
      manaLevelRequired: 2,
      position: { x: 12.5, y: 2 },
      requires: [],
      unlocks: ['fortune-favor'],
      ingredients: [
        { id: 'sternenfeuerkraut', amount: 6 },
        { id: 'mondkresse', amount: 5 },
        { id: 'mondfarn', amount: 4 }
      ],
      dndSource: 'DMG p.188 - Potion of Luck'
    },
    {
      id: 'fortune-favor',
      name: 'Gunst des Schicksals',
      tier: 4,
      category: 'utility',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Würfle mit Vorteil auf alle d20-Würfe für 1 Stunde',
      dc: 21,
      brewTime: '14 Stunden',
      cost: 5,
      manaCost: 60,
      manaLevelRequired: 3,
      position: { x: 12.5, y: 3.5 },
      requires: ['luck'],
      unlocks: [],
      ingredients: [
        { id: 'sternenfeuerkraut', amount: 8 },
        { id: 'mondfarn', amount: 7 },
        { id: 'phonixfederkraut', amount: 4 },
        { id: 'runenwurz', amount: 3 }
      ],
      dndSource: 'Homebrew - Enhanced Luck'
    },
    {
      id: 'bless',
      name: 'Segen',
      tier: 1,
      category: 'combat',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Common',
      effect: '+1d4 auf Angriffswürfe und Rettungswürfe für 1 Minute',
      dc: 11,
      brewTime: '2 Stunden',
      cost: 1,
      manaCost: 5,
      manaLevelRequired: 1,
      position: { x: 12.5, y: 1 },
      requires: [],
      unlocks: ['divine-favor'],
      ingredients: [
        { id: 'sonnenlaub', amount: 4 },
        { id: 'gotterbalsam', amount: 2 }
      ],
      dndSource: 'DMG p.187 - Bless Effect'
    },
    {
      id: 'divine-favor',
      name: 'Göttliche Gunst',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: '+1d4 strahlender Schaden auf allen Waffenangriffen für 1 Minute',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 2,
      position: { x: 12.5, y: 1.5 },
      requires: ['bless'],
      unlocks: [],
      ingredients: [
        { id: 'sonnenlaub', amount: 5 },
        { id: 'gotterbalsam', amount: 4 },
        { id: 'phonixfederkraut', amount: 2 }
      ],
      dndSource: 'DMG p.187 - Divine Favor Effect'
    },

    // ========== WEAPON ENHANCEMENT ==========
    {
      id: 'oil-sharpness',
      name: 'Öl der Schärfe',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Waffe wird +3, maximaler Waffenschaden bei kritischen Treffern für 1 Stunde',
      dc: 19,
      brewTime: '12 Stunden',
      cost: 4,
      manaCost: 50,
      manaLevelRequired: 3,
      position: { x: 8.5, y: 2.5 },
      requires: [],
      unlocks: ['vorpal-edge'],
      ingredients: [
        { id: 'eisenkraut', amount: 8 },
        { id: 'steinflechte', amount: 6 },
        { id: 'drachenmelisse', amount: 5 }
      ],
      dndSource: 'DMG p.184 - Oil of Sharpness'
    },
    {
      id: 'vorpal-edge',
      name: 'Vorpal-Klinge',
      tier: 5,
      category: 'combat',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Waffe wird +3, bei Nat 20 wird Ziel enthauptet (wenn möglich) oder 6d8 extra Schaden für 1 Stunde',
      dc: 25,
      brewTime: '24 Stunden',
      cost: 7,
      manaCost: 100,
      manaLevelRequired: 4,
      position: { x: 8.5, y: 5 },
      requires: ['oil-sharpness'],
      unlocks: [],
      ingredients: [
        { id: 'runenwurz', amount: 10 },
        { id: 'drachenauge', amount: 6 },
        { id: 'phonixfederkraut', amount: 5 },
        { id: 'gotterbalsam', amount: 4 }
      ],
      dndSource: 'DMG - Vorpal Sword Effect'
    },
    {
      id: 'magic-weapon',
      name: 'Magische Waffe',
      tier: 1,
      category: 'combat',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Common',
      effect: 'Waffe wird +1 magisch für 1 Stunde',
      dc: 12,
      brewTime: '2 Stunden',
      cost: 1,
      manaCost: 10,
      manaLevelRequired: 1,
      position: { x: 8.5, y: 1 },
      requires: [],
      unlocks: ['enhanced-weapon'],
      ingredients: [
        { id: 'mondkresse', amount: 4 },
        { id: 'sternenfeuerkraut', amount: 3 }
      ],
      dndSource: 'DMG p.188 - Magic Weapon Effect'
    },
    {
      id: 'enhanced-weapon',
      name: 'Verbesserte Waffe',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Waffe wird +2 magisch für 1 Stunde',
      dc: 15,
      brewTime: '5 Stunden',
      cost: 2,
      manaCost: 20,
      manaLevelRequired: 2,
      position: { x: 8.5, y: 1.5 },
      requires: ['magic-weapon'],
      unlocks: ['oil-sharpness'],
      ingredients: [
        { id: 'mondkresse', amount: 6 },
        { id: 'sternenfeuerkraut', amount: 5 },
        { id: 'runenwurz', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Enhanced Magic Weapon'
    },

    // ========== DETECTION & AWARENESS ==========
    {
      id: 'watchful-rest',
      name: 'Wachsamer Schlaf',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Schlafe normal, aber wache sofort bei Gefahr auf, Vorteil auf Wahrnehmung während Rast',
      dc: 10,
      brewTime: '1 Stunde',
      cost: 0,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 13, y: 1 },
      requires: [],
      unlocks: ['alarm-sense'],
      ingredients: [
        { id: 'nachtschatten', amount: 3 },
        { id: 'bergveilchen', amount: 2 }
      ],
      dndSource: 'Homebrew - Alarm + Alert'
    },
    {
      id: 'alarm-sense',
      name: 'Alarmgefühl',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Spüre sofort wenn Feinde in 60 Fuß Radius sind für 8 Stunden',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 1,
      position: { x: 13, y: 2 },
      requires: ['watchful-rest'],
      unlocks: [],
      ingredients: [
        { id: 'nachtschatten', amount: 5 },
        { id: 'schattenkraut', amount: 4 },
        { id: 'mondkresse', amount: 3 }
      ],
      dndSource: 'Homebrew - Alarm + Detect Enemies'
    },
    {
      id: 'detect-magic-potion',
      name: 'Magie Entdecken',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Spüre Präsenz von Magie innerhalb 30 Fuß für 10 Minuten',
      dc: 11,
      brewTime: '2 Stunden',
      cost: 0,
      manaCost: 5,
      manaLevelRequired: 1,
      position: { x: 2.5, y: 1.5 },
      requires: [],
      unlocks: ['mana-sight'],
      ingredients: [
        { id: 'mondkresse', amount: 3 },
        { id: 'sternenfeuerkraut', amount: 2 }
      ],
      dndSource: 'DMG p.188 - Detect Magic'
    },

    // ========== ENVIRONMENTAL ADAPTATION ==========
    {
      id: 'endure-elements',
      name: 'Elemente Ertragen',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Immunität gegen extreme Hitze und Kälte (nicht magisch) für 24 Stunden',
      dc: 11,
      brewTime: '2 Stunden',
      cost: 0,
      manaCost: 0,
      manaLevelRequired: 1,
      position: { x: 4.5, y: 1.5 },
      requires: [],
      unlocks: ['environmental-mastery'],
      ingredients: [
        { id: 'feuerblute', amount: 2 },
        { id: 'eisblume', amount: 2 },
        { id: 'bergveilchen', amount: 2 }
      ],
      dndSource: 'Homebrew - Endure Elements'
    },
    {
      id: 'environmental-mastery',
      name: 'Umweltmeisterschaft',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Immunität gegen alle Umweltgefahren (Hitze, Kälte, Höhe, Druck) für 24 Stunden',
      dc: 14,
      brewTime: '4 Stunden',
      cost: 2,
      manaCost: 15,
      manaLevelRequired: 1,
      position: { x: 4.5, y: 2.5 },
      requires: ['endure-elements'],
      unlocks: [],
      ingredients: [
        { id: 'feuerblute', amount: 4 },
        { id: 'eisblume', amount: 4 },
        { id: 'bergveilchen', amount: 4 },
        { id: 'wolkenkraut', amount: 3 }
      ],
      dndSource: 'Homebrew - Enhanced Endure Elements'
    }
  ]
}

export const getRecipeById = (id) => {
  return aetherialRecipeTree.recipes.find(r => r.id === id)
}

export const getRecipesByTier = (tier) => {
  return aetherialRecipeTree.recipes.filter(r => r.tier === tier)
}

export const getRecipesByCategory = (category) => {
  return aetherialRecipeTree.recipes.filter(r => r.category === category)
}
