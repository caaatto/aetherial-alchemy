// Aetherial Module - Skill Tree Structure

export const aetherialModule = {
  id: 'aetherial',
  name: 'Aetherial Herbs & Recipes',
  description: 'Ancient knowledge of Aetherial herbs and powerful brewing recipes',
  icon: '🌿',

  skillTree: [
    // Tier 1: Common Herbs Foundation
    {
      id: 'common-herbs',
      tier: 1,
      name: 'Common Herbs',
      description: 'Unlock basic Aetherial herbs',
      icon: '🌱',
      cost: 0,
      unlocks: ['uncommon-herbs-1', 'uncommon-herbs-2'],
      rewards: {
        ingredients: [
          'Wolfsfarn', 'Orgain', 'Feuerblüte', 'Eisenkraut',
          'Bergveilchen', 'Schattenkraut', 'Mondkresse'
        ],
        recipes: ['Heiltrank (Klein)', 'Stamina Trank']
      }
    },
    {
      id: 'common-herbs-2',
      tier: 1,
      name: 'Common Herbs II',
      description: 'More common herbs and basic recipes',
      icon: '🌾',
      cost: 0,
      unlocks: ['uncommon-herbs-3'],
      rewards: {
        ingredients: [
          'Dämmerungslilie', 'Waldfarn', 'Wiesensalbei',
          'Nachtflieder', 'Sonnenlaub', 'Wanderkraut'
        ],
        recipes: ['Giftwiderstand', 'Nachtseher Elixir']
      }
    },

    // Tier 2: Uncommon Herbs
    {
      id: 'uncommon-herbs-1',
      tier: 2,
      name: 'Magical Herbs',
      description: 'Learn about magical uncommon herbs',
      icon: '✨',
      cost: 1,
      requires: ['common-herbs'],
      unlocks: ['rare-herbs-1'],
      rewards: {
        ingredients: ['Peseilie', 'Elffuß', 'Manndrache'],
        recipes: ['Heiltrank (Mittel)', 'Magische Resistenz']
      }
    },
    {
      id: 'uncommon-herbs-2',
      tier: 2,
      name: 'Elemental Herbs',
      description: 'Master elemental uncommon herbs',
      icon: '🔥',
      cost: 1,
      requires: ['common-herbs'],
      unlocks: ['rare-herbs-2'],
      rewards: {
        ingredients: ['Glutwurz', 'Alraunenkraut', 'Silberspross'],
        recipes: ['Feuerwiderstand', 'Eiswiderstand']
      }
    },
    {
      id: 'uncommon-herbs-3',
      tier: 2,
      name: 'Silver Herbs',
      description: 'Discover silver-touched herbs',
      icon: '🌙',
      cost: 1,
      requires: ['common-herbs-2'],
      unlocks: ['rare-herbs-2'],
      rewards: {
        ingredients: ['Silberdistel', 'Elfenhaar'],
        recipes: ['Mondlicht Trank', 'Silberschutz']
      }
    },

    // Tier 3: Rare Herbs
    {
      id: 'rare-herbs-1',
      tier: 3,
      name: 'Dark Herbs',
      description: 'Dangerous but powerful rare herbs',
      icon: '💀',
      cost: 2,
      requires: ['uncommon-herbs-1'],
      unlocks: ['very-rare-herbs-1'],
      rewards: {
        ingredients: ['Todeswurz', 'Hexenholz', 'Morak/Moraqu'],
        recipes: ['Unsichtbarkeitstrank', 'Schattengang Elixir', 'Gift des Todes']
      }
    },
    {
      id: 'rare-herbs-2',
      tier: 3,
      name: 'Mystical Herbs',
      description: 'Mystical rare herbs of great power',
      icon: '🔮',
      cost: 2,
      requires: ['uncommon-herbs-2', 'uncommon-herbs-3'],
      unlocks: ['very-rare-herbs-2'],
      rewards: {
        ingredients: ['Silberweide', 'Sternenfeuerkraut'],
        recipes: ['Heiltrank (Stark)', 'Sternenfeuer Elixir', 'Hellsicht Trank']
      }
    },

    // Tier 4: Very Rare Herbs
    {
      id: 'very-rare-herbs-1',
      tier: 4,
      name: 'Regional Rarities',
      description: 'Extremely rare regional herbs',
      icon: '⭐',
      cost: 3,
      requires: ['rare-herbs-1'],
      unlocks: ['legendary-herbs-1'],
      rewards: {
        ingredients: [
          'Flachländische Grünwiesel', 'Blaubergische Hammelblume',
          'Flussperlminze'
        ],
        recipes: ['Großer Heiltrank', 'Ausdauer des Berges', 'Wasseratmung']
      }
    },
    {
      id: 'very-rare-herbs-2',
      tier: 4,
      name: 'Mystical Creatures',
      description: 'Herbs connected to mystical beings',
      icon: '🐉',
      cost: 3,
      requires: ['rare-herbs-2'],
      unlocks: ['legendary-herbs-2'],
      rewards: {
        ingredients: [
          'Drachenmelisse', 'Geisterzunge',
          'Schattenmondblüte', 'Sträters Wurzel'
        ],
        recipes: ['Drachenatem Trank', 'Geistergespräch Elixir', 'Schattenmeister Trank']
      }
    },

    // Tier 5: Legendary Herbs
    {
      id: 'legendary-herbs-1',
      tier: 5,
      name: 'Ancient Legends',
      description: 'Legendary herbs of myth',
      icon: '👑',
      cost: 5,
      requires: ['very-rare-herbs-1'],
      unlocks: ['divine-herbs'],
      rewards: {
        ingredients: ['Mondfarn', 'Ewiggrün', 'Bernsteinthymian'],
        recipes: ['Unsterblichkeit (Temporär)', 'Ewige Jugend Elixir', 'Zeit Stoppen']
      }
    },
    {
      id: 'legendary-herbs-2',
      tier: 5,
      name: 'Dragon\'s Legacy',
      description: 'Legendary dragon-touched herbs',
      icon: '🔥',
      cost: 5,
      requires: ['very-rare-herbs-2'],
      unlocks: ['divine-herbs'],
      rewards: {
        ingredients: ['Drachenauge'],
        recipes: ['Drachenform Trank', 'Heiltrank (Legendär)', 'Feuerodem Elixir']
      }
    },

    // Tier 6: Divine Herbs
    {
      id: 'divine-herbs',
      tier: 6,
      name: 'Divine Essence',
      description: 'Herbs touched by the gods themselves',
      icon: '✨',
      cost: 10,
      requires: ['legendary-herbs-1', 'legendary-herbs-2'],
      unlocks: [],
      rewards: {
        ingredients: ['Runenwurz', 'Phönixfederkraut', 'Götterbalsam'],
        recipes: [
          'Auferstehung Trank', 'Göttliche Heilung',
          'Macht der Götter', 'Wahre Unsichtbarkeit', 'Universalheilmittel'
        ]
      }
    }
  ]
}

// Recipe Templates
export const aetherialRecipes = [
  // Common
  { name: 'Heiltrank (Klein)', rarity: 'Common', effect: 'Heilt 2d4+2 HP', dc: 10, brewTime: '1 Stunde' },
  { name: 'Stamina Trank', rarity: 'Common', effect: '+1 auf Ausdauer Checks für 1 Stunde', dc: 10, brewTime: '1 Stunde' },
  { name: 'Giftwiderstand', rarity: 'Common', effect: 'Vorteil auf Rettungswürfe gegen Gift für 1 Stunde', dc: 12, brewTime: '2 Stunden' },
  { name: 'Nachtseher Elixir', rarity: 'Common', effect: 'Dunkelsicht 60ft für 1 Stunde', dc: 11, brewTime: '1 Stunde' },

  // Uncommon
  { name: 'Heiltrank (Mittel)', rarity: 'Uncommon', effect: 'Heilt 4d4+4 HP', dc: 13, brewTime: '4 Stunden' },
  { name: 'Magische Resistenz', rarity: 'Uncommon', effect: 'Resistenz gegen einen Zaubertyp für 1 Stunde', dc: 14, brewTime: '3 Stunden' },
  { name: 'Feuerwiderstand', rarity: 'Uncommon', effect: 'Resistenz gegen Feuerschaden für 1 Stunde', dc: 13, brewTime: '3 Stunden' },
  { name: 'Eiswiderstand', rarity: 'Uncommon', effect: 'Resistenz gegen Kälteschaden für 1 Stunde', dc: 13, brewTime: '3 Stunden' },
  { name: 'Mondlicht Trank', rarity: 'Uncommon', effect: 'Erzeugt 30ft Mondlicht für 2 Stunden', dc: 12, brewTime: '2 Stunden' },
  { name: 'Silberschutz', rarity: 'Uncommon', effect: 'Schutz vor Lykanthropen für 1 Stunde', dc: 14, brewTime: '4 Stunden' },

  // Rare
  { name: 'Unsichtbarkeitstrank', rarity: 'Rare', effect: 'Unsichtbarkeit für 1 Stunde', dc: 15, brewTime: '8 Stunden' },
  { name: 'Schattengang Elixir', rarity: 'Rare', effect: 'Kann durch Schatten teleportieren 3x', dc: 16, brewTime: '6 Stunden' },
  { name: 'Gift des Todes', rarity: 'Rare', effect: '8d6 Giftschaden, DC 17 CON oder Tod', dc: 18, brewTime: '12 Stunden' },
  { name: 'Heiltrank (Stark)', rarity: 'Rare', effect: 'Heilt 8d4+8 HP', dc: 15, brewTime: '8 Stunden' },
  { name: 'Sternenfeuer Elixir', rarity: 'Rare', effect: 'Waffe macht zusätzlich 2d6 Strahlenschaden für 10 Minuten', dc: 16, brewTime: '10 Stunden' },
  { name: 'Hellsicht Trank', rarity: 'Rare', effect: 'True Seeing für 1 Stunde', dc: 17, brewTime: '8 Stunden' },

  // Very Rare
  { name: 'Großer Heiltrank', rarity: 'Very Rare', effect: 'Heilt 10d4+20 HP', dc: 18, brewTime: '24 Stunden' },
  { name: 'Ausdauer des Berges', rarity: 'Very Rare', effect: '+4 CON für 8 Stunden', dc: 19, brewTime: '16 Stunden' },
  { name: 'Wasseratmung', rarity: 'Very Rare', effect: 'Kann 8 Stunden unter Wasser atmen', dc: 17, brewTime: '12 Stunden' },
  { name: 'Drachenatem Trank', rarity: 'Very Rare', effect: 'Kann 3x Drachenatem (8d6) verwenden', dc: 20, brewTime: '24 Stunden' },
  { name: 'Geistergespräch Elixir', rarity: 'Very Rare', effect: 'Kann mit Toten sprechen für 1 Stunde', dc: 18, brewTime: '16 Stunden' },
  { name: 'Schattenmeister Trank', rarity: 'Very Rare', effect: 'Kontrolle über Schatten, wie Shadow of Moil', dc: 19, brewTime: '20 Stunden' },

  // Legendary
  { name: 'Unsterblichkeit (Temporär)', rarity: 'Legendary', effect: 'Kann 1x nicht unter 1 HP fallen, 24 Stunden', dc: 23, brewTime: '7 Tage' },
  { name: 'Ewige Jugend Elixir', rarity: 'Legendary', effect: 'Verjüngung um 2d20 Jahre', dc: 22, brewTime: '7 Tage' },
  { name: 'Zeit Stoppen', rarity: 'Legendary', effect: 'Time Stop Zauber', dc: 24, brewTime: '10 Tage' },
  { name: 'Drachenform Trank', rarity: 'Legendary', effect: 'Verwandlung in Drachen für 10 Minuten', dc: 25, brewTime: '14 Tage' },
  { name: 'Heiltrank (Legendär)', rarity: 'Legendary', effect: 'Heilt komplett, entfernt alle Zustände', dc: 23, brewTime: '7 Tage' },
  { name: 'Feuerodem Elixir', rarity: 'Legendary', effect: 'Permanenter Feuerodem 3/Tag', dc: 24, brewTime: '10 Tage' },

  // Divine
  { name: 'Auferstehung Trank', rarity: 'Legendary', effect: 'Auferstehung wie True Resurrection', dc: 28, brewTime: '30 Tage' },
  { name: 'Göttliche Heilung', rarity: 'Legendary', effect: 'Heilt komplett, regeneriert verlorene Gliedmaßen', dc: 27, brewTime: '21 Tage' },
  { name: 'Macht der Götter', rarity: 'Legendary', effect: '+4 auf alle Attributswerte für 1 Stunde', dc: 26, brewTime: '21 Tage' },
  { name: 'Wahre Unsichtbarkeit', rarity: 'Legendary', effect: 'Unsichtbarkeit die nicht gebrochen werden kann, 1 Stunde', dc: 27, brewTime: '14 Tage' },
  { name: 'Universalheilmittel', rarity: 'Legendary', effect: 'Heilt alle Krankheiten, Gifte, Flüche', dc: 25, brewTime: '14 Tage' }
]
