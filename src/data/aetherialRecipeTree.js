// Aetherial Recipe Tree - D&D 5e based potions expanded
// Mana Integration + Aetherial Herbs

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
      name: 'Healing Potion',
      tier: 1,
      category: 'healing',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Heals 2d4+2 HP',
      dc: 10,
      brewTime: '1 hour',
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
      name: 'Minor Mana Potion',
      tier: 1,
      category: 'mana',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Regenerates 10 Mana',
      dc: 10,
      brewTime: '1 hour',
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
      dndSource: 'Homebrew - based on Spell Slot Recovery'
    },
    {
      id: 'fire-resistance',
      name: 'Fire Resistance',
      tier: 1,
      category: 'resistance',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Resistance to fire damage for 1 hour',
      dc: 13,
      brewTime: '3 hours',
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
      name: 'Climbing Potion',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Climbing speed equals walking speed for 1 hour',
      dc: 11,
      brewTime: '2 hours',
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
      name: 'Greater Healing Potion',
      tier: 2,
      category: 'healing',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Heals 4d4+4 HP',
      dc: 13,
      brewTime: '4 hours',
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
      name: 'Regeneration Elixir',
      tier: 2,
      category: 'healing',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Heals 1d4 HP at the start of your turn for 10 rounds',
      dc: 14,
      brewTime: '3 hours',
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
      dndSource: 'Homebrew - based on Regeneration Spell'
    },
    {
      id: 'healing-mana-combo',
      name: 'Vitality Elixir',
      tier: 2,
      category: 'hybrid',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Heals 2d4+2 HP and regenerates 10 Mana',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Greater Mana Potion',
      tier: 2,
      category: 'mana',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Regenerates 25 Mana',
      dc: 13,
      brewTime: '4 hours',
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
      name: 'Invisibility',
      tier: 2,
      category: 'stealth',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Invisibility for 1 hour (breaks on attack)',
      dc: 15,
      brewTime: '8 hours',
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
      name: 'Spider Climb',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Climb on walls and ceilings for 1 hour',
      dc: 14,
      brewTime: '4 hours',
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
      dndSource: 'Homebrew - based on Spider Climb Spell'
    },

    // ========== TIER 3: STRONG POTIONS (Rare) ==========
    {
      id: 'superior-healing',
      name: 'Superior Healing Potion',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Heals 8d4+8 HP',
      dc: 15,
      brewTime: '8 hours',
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
      name: 'Healing & Restoration',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Heals 4d4+4 HP and removes 1 disease or condition',
      dc: 16,
      brewTime: '10 hours',
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
      dndSource: 'Homebrew - based on Lesser Restoration'
    },
    {
      id: 'regeneration-strong',
      name: 'Strong Regeneration',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Heals 2d4 HP at the start of your turn for 1 minute',
      dc: 17,
      brewTime: '10 hours',
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
      name: 'Fire Immunity',
      tier: 3,
      category: 'resistance',
      icon: '/assets/potions/Large Tonic - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Immunity to fire damage for 10 minutes',
      dc: 18,
      brewTime: '12 hours',
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
      name: 'Dragon Breath',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Can use dragon breath 3x (8d6 fire damage, DC 15 DEX)',
      dc: 20,
      brewTime: '24 hours',
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
      name: 'True Invisibility',
      tier: 3,
      category: 'stealth',
      icon: '/assets/potions/Bubbly Brew Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Invisibility for 1 hour (does NOT break on attack)',
      dc: 22,
      brewTime: '16 hours',
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
      name: 'Shadow Step',
      tier: 3,
      category: 'stealth',
      icon: '/assets/potions/Bubbly Brew Bottle - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Teleport 3x through shadows (60ft)',
      dc: 18,
      brewTime: '12 hours',
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
      name: 'Superior Mana Potion',
      tier: 3,
      category: 'mana',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Regenerates 50 Mana',
      dc: 16,
      brewTime: '10 hours',
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
      name: 'Supreme Healing Potion',
      tier: 4,
      category: 'healing',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Heals 10d4+20 HP',
      dc: 18,
      brewTime: '24 hours',
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
      name: 'Troll Regeneration',
      tier: 4,
      category: 'healing',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Regenerate 3d6 HP per round for 10 rounds (except fire/acid)',
      dc: 20,
      brewTime: '48 hours',
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
      name: 'Supreme Vitality Elixir',
      tier: 4,
      category: 'hybrid',
      icon: '/assets/potions/Large Jar - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Heals 8d4+8 HP and regenerates 50 Mana',
      dc: 20,
      brewTime: '24 hours',
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
      name: 'Supreme Mana Potion',
      tier: 4,
      category: 'mana',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Regenerates 100 Mana',
      dc: 19,
      brewTime: '24 hours',
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
      name: 'Dragon Form',
      tier: 4,
      category: 'transformation',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Transform into a young dragon for 10 minutes',
      dc: 25,
      brewTime: '7 days',
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
      name: 'Ethereal Form',
      tier: 4,
      category: 'stealth',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Become ethereal for 1 hour (Ethereal Plane)',
      dc: 22,
      brewTime: '48 hours',
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
      name: 'Divine Healing',
      tier: 5,
      category: 'healing',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Full healing + Regenerates limbs + removes ALL conditions',
      dc: 27,
      brewTime: '21 days',
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
      name: 'Temporary Immortality',
      tier: 5,
      category: 'protection',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Cannot drop below 1 HP for 24 hours',
      dc: 28,
      brewTime: '30 days',
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
      name: 'Ultimate Vitality Elixir',
      tier: 5,
      category: 'hybrid',
      icon: '/assets/potions/Bubbly Brew Bottle Rising - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Full healing + Regenerates 150 Mana + +4 to all saving throws for 1 hour',
      dc: 26,
      brewTime: '30 days',
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
      name: 'Mana Overflow',
      tier: 5,
      category: 'mana',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Regenerates 200 Mana + Double spell effect for 10 minutes',
      dc: 25,
      brewTime: '21 days',
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
      name: 'Cold Resistance',
      tier: 1,
      category: 'resistance',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Resistance to cold damage for 1 hour',
      dc: 13,
      brewTime: '3 hours',
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
      name: 'Cold Immunity',
      tier: 3,
      category: 'resistance',
      icon: '/assets/potions/Large Tonic - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Immunity to cold damage for 1 hour',
      dc: 18,
      brewTime: '8 hours',
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
      name: 'Lightning Resistance',
      tier: 1,
      category: 'resistance',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Resistance to lightning damage for 1 hour',
      dc: 13,
      brewTime: '3 hours',
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
      name: 'Poison Resistance',
      tier: 1,
      category: 'resistance',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Resistance to poison damage for 1 hour, advantage on saving throws against poison',
      dc: 12,
      brewTime: '2 hours',
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
      name: 'Poison Immunity',
      tier: 2,
      category: 'resistance',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Immunity to poison damage and the poisoned condition for 1 hour',
      dc: 16,
      brewTime: '6 hours',
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
      name: 'Elemental Protection',
      tier: 3,
      category: 'resistance',
      icon: '/assets/potions/Large Jar - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Resistance to fire, cold, lightning, and acid for 1 hour',
      dc: 20,
      brewTime: '12 hours',
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
      name: 'Elemental Mastery',
      tier: 5,
      category: 'resistance',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Immunity to all elemental damage (fire, cold, lightning, acid, thunder) for 1 hour',
      dc: 25,
      brewTime: '24 hours',
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
      name: 'Giant Strength (Hill)',
      tier: 1,
      category: 'combat',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Strength becomes 21 for 1 hour',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Giant Strength (Stone)',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Strength becomes 23 for 1 hour',
      dc: 16,
      brewTime: '6 hours',
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
      name: 'Giant Strength (Frost)',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Strength becomes 23 for 1 hour',
      dc: 16,
      brewTime: '6 hours',
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
      name: 'Giant Strength (Fire)',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Strength becomes 25 for 1 hour',
      dc: 17,
      brewTime: '8 hours',
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
      name: 'Giant Strength (Cloud)',
      tier: 4,
      category: 'combat',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Strength becomes 27 for 1 hour',
      dc: 20,
      brewTime: '12 hours',
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
      name: 'Giant Strength (Storm)',
      tier: 5,
      category: 'combat',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Strength becomes 29 for 1 hour',
      dc: 24,
      brewTime: '24 hours',
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
      name: 'Speed',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Doubles movement speed, +2 AC, advantage on DEX saving throws, additional action for 1 minute',
      dc: 17,
      brewTime: '8 hours',
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
      name: 'Flying',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Flying speed 60 feet for 1 hour',
      dc: 16,
      brewTime: '6 hours',
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
      effect: 'Levitate (move up/down, not sideways) for 10 minutes',
      dc: 13,
      brewTime: '3 hours',
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
      name: 'Water Breathing',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Can breathe underwater for 1 hour',
      dc: 12,
      brewTime: '2 hours',
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
      name: 'Aquatic Mastery',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Water breathing + Swimming speed 60 feet for 4 hours',
      dc: 15,
      brewTime: '5 hours',
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
      name: 'Darkvision',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Darkvision 60 feet for 1 hour',
      dc: 12,
      brewTime: '2 hours',
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
      name: 'Truesight',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Truesight 60 feet for 10 minutes (sees invisible, see through illusions)',
      dc: 20,
      brewTime: '12 hours',
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
      name: 'Comprehend Languages',
      tier: 1,
      category: 'social',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Understand all spoken languages for 1 hour',
      dc: 10,
      brewTime: '1 hour',
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
      name: 'Tongues',
      tier: 2,
      category: 'social',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Understand and speak all languages for 1 hour',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Stoneskin',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Resistance to non-magical physical damage for 1 hour',
      dc: 17,
      brewTime: '8 hours',
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
      name: 'Invulnerability',
      tier: 4,
      category: 'combat',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Immunity to all damage for 1 minute',
      dc: 23,
      brewTime: '16 hours',
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
      name: 'Heroism',
      tier: 1,
      category: 'combat',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Uncommon',
      effect: '+10 temporary HP, immune to fear for 1 hour',
      dc: 13,
      brewTime: '3 hours',
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
      name: 'Battle Fury',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: '+20 temp HP, +2 to attack rolls, immune to fear and charm, advantage on STR checks for 1 hour',
      dc: 18,
      brewTime: '10 hours',
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
      name: 'Charm',
      tier: 2,
      category: 'social',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Target must make WIS saving throw DC 13 or is charmed for 1 hour',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Dominate Mind',
      tier: 4,
      category: 'social',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Target must make WIS saving throw DC 18 or you control its actions for 10 minutes',
      dc: 22,
      brewTime: '16 hours',
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
      name: 'Mind Reading',
      tier: 2,
      category: 'social',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Read the surface thoughts of a creature within 30 feet for 10 minutes',
      dc: 16,
      brewTime: '6 hours',
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
      name: 'Mana Sight',
      tier: 2,
      category: 'mana',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'See magical auras and mana flows, Detect Magic effect for 1 hour',
      dc: 15,
      brewTime: '6 hours',
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
      name: 'Astral Vision',
      tier: 4,
      category: 'mana',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'See into the Astral Plane, true form of shapeshifters, all magical effects for 10 minutes',
      dc: 21,
      brewTime: '14 hours',
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
      name: 'Time Slow',
      tier: 4,
      category: 'combat',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Time slows for everyone except you in a 30-foot radius for 1 minute (they can only use half movement or action)',
      dc: 22,
      brewTime: '16 hours',
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
      name: 'Time Stop',
      tier: 5,
      category: 'combat',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Stop time for everyone except you for 1d4+1 rounds',
      dc: 26,
      brewTime: '24 hours',
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
      name: 'Universal Antidote',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Cures all poisons, diseases, and curses (up to level 3)',
      dc: 18,
      brewTime: '10 hours',
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
      name: 'Growth',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Size doubles, +1d4 weapon damage, advantage on STR checks for 1 hour',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Diminution',
      tier: 2,
      category: 'stealth',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Size halved, -1d4 weapon damage, advantage on DEX (Stealth) for 1 hour',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Giant Form',
      tier: 4,
      category: 'combat',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Size becomes Huge, +2d6 weapon damage, +20 temp HP, advantage on STR checks/saves for 10 minutes',
      dc: 21,
      brewTime: '14 hours',
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
      name: 'Gaseous Form',
      tier: 3,
      category: 'stealth',
      icon: '/assets/potions/Bubbly Brew Bottle - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Become gaseous, can fly through cracks, resistance to non-magical damage for 1 hour',
      dc: 18,
      brewTime: '10 hours',
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
      name: 'Dust Form',
      tier: 4,
      category: 'stealth',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Become microscopically small and gaseous, invisible, can go anywhere, immunity to physical damage for 10 minutes',
      dc: 22,
      brewTime: '16 hours',
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
      name: 'Animal Friendship',
      tier: 1,
      category: 'social',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Animals must make WIS saving throw DC 11 or are charmed (friendly) for 1 hour',
      dc: 11,
      brewTime: '2 hours',
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
      name: 'Beast Speech',
      tier: 2,
      category: 'social',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Speak with animals and understand them for 1 hour',
      dc: 13,
      brewTime: '3 hours',
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
      name: 'Animal Shape',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Transform into an animal (CR 1 or lower) for 1 hour',
      dc: 18,
      brewTime: '10 hours',
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
      name: 'Polymorph',
      tier: 4,
      category: 'utility',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Transform yourself or others into any creature (CR 4 or lower) for 1 hour',
      dc: 21,
      brewTime: '14 hours',
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
      name: 'Clairvoyance',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Create an invisible sensor at a known location (1 mile) to see/hear for 10 minutes',
      dc: 17,
      brewTime: '8 hours',
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
      name: 'Scrying',
      tier: 4,
      category: 'utility',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Spy on a known creature (unlimited range), it can make WIS DC 18 saving throw, 10 minutes',
      dc: 21,
      brewTime: '14 hours',
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
      name: 'Elixir of Health',
      tier: 2,
      category: 'healing',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Cures all diseases, ends the poisoned condition, blindness/deafness healed',
      dc: 15,
      brewTime: '6 hours',
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
      name: 'Vitality',
      tier: 3,
      category: 'healing',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Removes all exhaustion levels, cures all diseases/poisons',
      dc: 18,
      brewTime: '10 hours',
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
      name: 'Longevity',
      tier: 4,
      category: 'healing',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Biological age reduced by 1d6+6 years (min. 13 years old)',
      dc: 20,
      brewTime: '16 hours',
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
      name: 'Mirror Image',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: '3 illusory duplicates appear, attacks have a 25% chance of hitting you for 1 minute',
      dc: 15,
      brewTime: '5 hours',
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
      name: 'Blur',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Attackers have disadvantage on attack rolls against you for 1 minute',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Displacement',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Appear 5 feet offset, attackers have disadvantage on attacks for 1 hour',
      dc: 17,
      brewTime: '8 hours',
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
      name: 'Greater Mirror Image',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: '6 illusory duplicates, attacks have only a 14% chance of hitting you for 1 minute',
      dc: 18,
      brewTime: '10 hours',
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
      name: 'Barkskin',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'AC becomes at least 16 (cannot exceed natural AC) for 1 hour',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Ironwood',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'AC becomes at least 18, resistance to non-magical bludgeoning weapons for 1 hour',
      dc: 17,
      brewTime: '8 hours',
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
      name: 'Jump',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Jump distance triples for 1 minute',
      dc: 10,
      brewTime: '1 hour',
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
      name: 'Super Jump',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Jump distance x5, take no fall damage for 10 minutes',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Oil of Slipperiness',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Automatic escape from bonds/grapples, advantage on escape checks for 8 hours',
      dc: 13,
      brewTime: '3 hours',
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
      name: 'Freedom of Movement',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Immunity to movement restriction, ignore difficult terrain, move normally in water for 1 hour',
      dc: 17,
      brewTime: '8 hours',
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
      name: 'Luck',
      tier: 3,
      category: 'utility',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Rare',
      effect: 'Roll 1d10 on every d20 roll and choose which result to use for 1 hour',
      dc: 18,
      brewTime: '10 hours',
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
      name: 'Fortune\'s Favor',
      tier: 4,
      category: 'utility',
      icon: '/assets/potions/Large Bottle - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Roll with advantage on all d20 rolls for 1 hour',
      dc: 21,
      brewTime: '14 hours',
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
      name: 'Bless',
      tier: 1,
      category: 'combat',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Common',
      effect: '+1d4 to attack rolls and saving throws for 1 minute',
      dc: 11,
      brewTime: '2 hours',
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
      name: 'Divine Favor',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: '+1d4 radiant damage on all weapon attacks for 1 minute',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Oil of Sharpness',
      tier: 3,
      category: 'combat',
      icon: '/assets/potions/Big Vial - RED - 0000.png',
      rarity: 'Very Rare',
      effect: 'Weapon becomes +3, maximum weapon damage on critical hits for 1 hour',
      dc: 19,
      brewTime: '12 hours',
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
      name: 'Vorpal Edge',
      tier: 5,
      category: 'combat',
      icon: '/assets/potions/Glowing Potion - RED - 0000.png',
      rarity: 'Legendary',
      effect: 'Weapon becomes +3, on Nat 20 target is decapitated (if possible) or 6d8 extra damage for 1 hour',
      dc: 25,
      brewTime: '24 hours',
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
      name: 'Magic Weapon',
      tier: 1,
      category: 'combat',
      icon: '/assets/potions/Small Bottle - RED - 0000.png',
      rarity: 'Common',
      effect: 'Weapon becomes +1 magical for 1 hour',
      dc: 12,
      brewTime: '2 hours',
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
      name: 'Enhanced Weapon',
      tier: 2,
      category: 'combat',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Weapon becomes +2 magical for 1 hour',
      dc: 15,
      brewTime: '5 hours',
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
      name: 'Watchful Rest',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Sleep normally but wake immediately at danger, advantage on Perception during rest',
      dc: 10,
      brewTime: '1 hour',
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
      name: 'Alarm Sense',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Immediately sense when enemies are within a 60-foot radius for 8 hours',
      dc: 14,
      brewTime: '4 hours',
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
      name: 'Detect Magic',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Sense the presence of magic within 30 feet for 10 minutes',
      dc: 11,
      brewTime: '2 hours',
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

    // ========== ANTIMAGIC ==========
    {
      id: 'antimagic-suppression',
      name: 'Mana-Damm Tinktur',
      tier: 3,
      category: 'protection',
      icon: '/assets/potions/Large Jar - GOLD - 0000.png',
      rarity: 'Very Rare',
      effect: 'Blocks mana flow and suppresses magical signature for 1 hour. Immune to magical detection, signature-based wards, and direct-target spells. AOE and external magical damage still apply. Cannot use magic or mana while active. After effect ends: CON save DC 10+CHA mod or 1 level exhaustion. Mana flow needs several hours to stabilize.',
      dc: 20,
      brewTime: '24 hours',
      cost: 4,
      manaCost: 0,
      manaLevelRequired: 2,
      position: { x: 6, y: 3 },
      requires: [],
      unlocks: [],
      ingredients: [
        { id: 'rote_lotusblute', amount: 4 },
        { id: 'nachtschatten', amount: 5 },
        { id: 'eisenkraut', amount: 3 },
        { id: 'bitterlaub', amount: 3 }
      ],
      dndSource: 'Homebrew - Bobi\'s Antimagic Research (Ruins of Eldrath)'
    },

    // ========== ENVIRONMENTAL ADAPTATION ==========
    {
      id: 'endure-elements',
      name: 'Endure Elements',
      tier: 1,
      category: 'utility',
      icon: '/assets/potions/Small Vial - RED - 0000.png',
      rarity: 'Common',
      effect: 'Immunity to extreme heat and cold (non-magical) for 24 hours',
      dc: 11,
      brewTime: '2 hours',
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
      name: 'Environmental Mastery',
      tier: 2,
      category: 'utility',
      icon: '/assets/potions/Round Potion - RED - 0000.png',
      rarity: 'Uncommon',
      effect: 'Immunity to all environmental hazards (heat, cold, altitude, pressure) for 24 hours',
      dc: 14,
      brewTime: '4 hours',
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
