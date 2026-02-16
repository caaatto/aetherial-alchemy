// Vollständige Aetherial Kräuter-Datenbank
// Basierend auf: https://aetherial.fandom.com/wiki/List_of_Herbs

export const herbsDatabase = {
  // ========== COMMON HERBS ==========
  wolfsfarn: {
    id: 'wolfsfarn',
    name: 'Wolfsfarn',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Vielseitiges Kraut, wächst in schattigen Wäldern. Basis für die meisten Heiltränke.',
    location: 'Wälder, schattige Gebiete',
    manaContent: 0,
    properties: {
      healing: 'low',
      stability: 'high' // Macht Tränke stabiler
    }
  },
  orgain: {
    id: 'orgain',
    name: 'Orgain',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Stärkendes Kraut mit erdigen Eigenschaften.',
    location: 'Grasland, Felder',
    manaContent: 0,
    properties: {
      fortitude: 'low'
    }
  },
  feuerblute: {
    id: 'feuerblute',
    name: 'Feuerblüte',
    rarity: 'Common',
    categories: ['Medicinal', 'Culinary'],
    description: 'Rote Blüte mit wärmenden Eigenschaften. Basis für Feuer-Resistenz.',
    location: 'Warme Regionen, Vulkangebiete',
    manaContent: 0,
    properties: {
      fire: 'resistance-low',
      warmth: true
    }
  },
  eisenkraut: {
    id: 'eisenkraut',
    name: 'Eisenkraut',
    rarity: 'Common',
    categories: ['Medicinal'],
    description: 'Stärkt Körper und Geist, erhöht Widerstandskraft.',
    location: 'Bergregionen',
    manaContent: 0,
    properties: {
      constitution: 'boost-low'
    }
  },
  bergveilchen: {
    id: 'bergveilchen',
    name: 'Bergveilchen',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Wächst in hohen Bergen, reinigend.',
    location: 'Berge, Hochgebirge',
    manaContent: 0,
    properties: {
      purification: 'low'
    }
  },
  schattenkraut: {
    id: 'schattenkraut',
    name: 'Schattenkraut',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Gedeiht im Schatten, verleiht Stealth-Eigenschaften.',
    location: 'Schattige Wälder, Höhlen',
    manaContent: 2,
    properties: {
      stealth: 'low',
      shadow: true
    }
  },
  mondkresse: {
    id: 'mondkresse',
    name: 'Mondkresse',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Blüht bei Mondlicht, enthält lunare Energie.',
    location: 'Nachts, Mondlichtungen',
    manaContent: 3,
    properties: {
      lunar: true,
      night_vision: 'low'
    }
  },
  dammerungslilie: {
    id: 'dammerungslilie',
    name: 'Dämmerungslilie',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Öffnet sich in der Dämmerung.',
    location: 'Waldränder',
    manaContent: 2,
    properties: {
      twilight: true
    }
  },
  waldfarn: {
    id: 'waldfarn',
    name: 'Waldfarn',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Häufig in Wäldern, grundlegende Heilwirkung.',
    location: 'Wälder',
    manaContent: 0,
    properties: {
      healing: 'minimal'
    }
  },
  wiesensalbei: {
    id: 'wiesensalbei',
    name: 'Wiesensalbei',
    rarity: 'Common',
    categories: ['Medicinal', 'Culinary', 'Brewing/Crafting'],
    description: 'Aromatisches Würzkraut mit heilenden Eigenschaften.',
    location: 'Wiesen, Felder',
    manaContent: 0,
    properties: {
      flavor: true,
      digestion: true
    }
  },
  nachtflieder: {
    id: 'nachtflieder',
    name: 'Nachtflieder',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Duftet nachts intensiver, beruhigend.',
    location: 'Gärten, Waldränder',
    manaContent: 1,
    properties: {
      calming: true,
      sleep: 'aid'
    }
  },
  sonnenlaub: {
    id: 'sonnenlaub',
    name: 'Sonnenlaub',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Speichert Sonnenlicht, energetisierend.',
    location: 'Sonnige Lichtungen',
    manaContent: 2,
    properties: {
      solar: true,
      energy: 'boost-low'
    }
  },
  wanderkraut: {
    id: 'wanderkraut',
    name: 'Wanderkraut',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical'],
    description: 'Unterstützt Ausdauer auf langen Reisen.',
    location: 'Wanderwege, Straßenränder',
    manaContent: 0,
    properties: {
      stamina: 'boost-low'
    }
  },

  // ========== UNCOMMON HERBS ==========
  peseilie: {
    id: 'peseilie',
    name: 'Peseilie',
    rarity: 'Uncommon',
    categories: ['Culinary', 'Magical'],
    description: 'Magisch verstärktes Gewürzkraut.',
    location: 'Magische Gärten',
    manaContent: 5,
    properties: {
      magic_enhance: 'low'
    }
  },
  elffuss: {
    id: 'elffuss',
    name: 'Elffuß',
    rarity: 'Uncommon',
    categories: ['Culinary', 'Magical'],
    description: 'Von Elfen kultiviert, verleiht Anmut.',
    location: 'Elfenwälder',
    manaContent: 5,
    properties: {
      grace: true,
      dexterity: 'boost-low'
    }
  },
  manndrache: {
    id: 'manndrache',
    name: 'Manndrache',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Wurzel in humanoidischer Form, verstärkt Heilung.',
    location: 'Alte Friedhöfe, heilige Stätten',
    manaContent: 8,
    properties: {
      healing: 'medium',
      amplify: true
    }
  },
  glutwurz: {
    id: 'glutwurz',
    name: 'Glutwurz',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Feurig-scharfe Wurzel aus Vulkangebieten.',
    location: 'Vulkane, heiße Quellen',
    manaContent: 6,
    properties: {
      fire: 'resistance-medium',
      heat: true
    }
  },
  alraunenkraut: {
    id: 'alraunenkraut',
    name: 'Alraunenkraut',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Magische Wurzelpflanze mit Regenerationskräften.',
    location: 'Verzauberte Wälder',
    manaContent: 10,
    properties: {
      regeneration: 'low',
      magic: true
    }
  },
  silberspross: {
    id: 'silberspross',
    name: 'Silberspross',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Silbrig schimmernde Triebe, schützt vor Untoten.',
    location: 'Mondlichtungen',
    manaContent: 7,
    properties: {
      undead_protection: true,
      silver: true
    }
  },
  silberdistel: {
    id: 'silberdistel',
    name: 'Silberdistel',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Culinary', 'Brewing/Crafting'],
    description: 'Stachelige Pflanze mit Silberglanz.',
    location: 'Gebirge',
    manaContent: 5,
    properties: {
      protection: 'low'
    }
  },
  elfenhaar: {
    id: 'elfenhaar',
    name: 'Elfenhaar',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Culinary'],
    description: 'Feine, haarähnliche Fasern.',
    location: 'Elfenreiche',
    manaContent: 6,
    properties: {
      finesse: true
    }
  },

  // ========== RARE HERBS ==========
  todeswurz: {
    id: 'todeswurz',
    name: 'Todeswurz',
    rarity: 'Rare',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Gefährliche Pflanze, Basis für tödliche Gifte und Nekromantie.',
    location: 'Friedhöfe, Schlachtfelder',
    manaContent: 15,
    properties: {
      poison: 'strong',
      necrotic: true,
      death_magic: true
    }
  },
  morak: {
    id: 'morak',
    name: 'Morak/Moraqu',
    rarity: 'Rare',
    categories: ['Medicinal', 'Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Seltene rituelle Pflanze mit vielseitigen Eigenschaften.',
    location: 'Heilige Haine',
    manaContent: 18,
    properties: {
      ritual: true,
      versatile: true
    }
  },
  silberweide: {
    id: 'silberweide',
    name: 'Silberweide',
    rarity: 'Rare',
    categories: ['Medicinal', 'Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Zweige der magischen Weide, stark heilend.',
    location: 'Heilige Haine, Flüsse',
    manaContent: 20,
    properties: {
      healing: 'strong',
      purification: 'high',
      blessing: true
    }
  },
  hexenholz: {
    id: 'hexenholz',
    name: 'Hexenholz',
    rarity: 'Rare',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Holz mit dunkler Magie, verstärkt Flüche.',
    location: 'Hexenwälder, verfluchte Orte',
    manaContent: 22,
    properties: {
      curse: true,
      dark_magic: 'strong',
      hex: true
    }
  },
  sternenfeuerkraut: {
    id: 'sternenfeuerkraut',
    name: 'Sternenfeuerkraut',
    rarity: 'Rare',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Leuchtet wie Sternenlicht, celestiale Energie.',
    location: 'Berggipfel bei Nacht',
    manaContent: 25,
    properties: {
      celestial: true,
      radiant: 'medium',
      star_power: true
    }
  },

  // ========== VERY RARE HERBS ==========
  flachlandische_grunwiesel: {
    id: 'flachlandische_grunwiesel',
    name: 'Flachländische Grünwiesel',
    rarity: 'Very Rare',
    categories: ['Culinary', 'Brewing/Crafting'],
    description: 'Extrem seltenes Gewächs aus dem Flachland.',
    location: 'Flachland, spezifische Regionen',
    manaContent: 30,
    properties: {
      rare_flavor: true,
      potency: 'high'
    }
  },
  blaubergische_hammelblume: {
    id: 'blaubergische_hammelblume',
    name: 'Blaubergische Hammelblume',
    rarity: 'Very Rare',
    categories: ['Medicinal', 'Brewing/Crafting', 'Ritual/Cultural'],
    description: 'Nur in den Blaubergen zu finden.',
    location: 'Blauberge',
    manaContent: 35,
    properties: {
      mountain_power: true,
      fortitude: 'high'
    }
  },
  straters_wurzel: {
    id: 'straters_wurzel',
    name: 'Sträters Wurzel',
    rarity: 'Very Rare',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Nach dem berühmten Alchemisten benannt.',
    location: 'Alchemisten-Labore, versteckte Gärten',
    manaContent: 40,
    properties: {
      alchemy_boost: 'high',
      transmutation: true
    }
  },
  drachenmelisse: {
    id: 'drachenmelisse',
    name: 'Drachenmelisse',
    rarity: 'Very Rare',
    categories: ['Medicinal', 'Culinary', 'Magical', 'Brewing/Crafting'],
    description: 'Wächst in der Nähe von Drachennestern, Drachenkraft.',
    location: 'Drachenhöhlen, Drachennester',
    manaContent: 50,
    properties: {
      dragon_power: true,
      fire: 'immunity-low',
      strength: 'boost-high'
    }
  },
  geisterzunge: {
    id: 'geisterzunge',
    name: 'Geisterzunge',
    rarity: 'Very Rare',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Ermöglicht Kommunikation mit Geistern.',
    location: 'Geisterorte, Ruinen',
    manaContent: 45,
    properties: {
      spirit_communication: true,
      ethereal: true
    }
  },
  flussperlminze: {
    id: 'flussperlminze',
    name: 'Flussperlminze',
    rarity: 'Very Rare',
    categories: ['Culinary', 'Brewing/Crafting'],
    description: 'Wächst an reinen Flüssen, Wassermagie.',
    location: 'Klare Flüsse, Quellen',
    manaContent: 35,
    properties: {
      water_magic: true,
      aquatic: true
    }
  },
  schattenmondblute: {
    id: 'schattenmondblute',
    name: 'Schattenmondblüte',
    rarity: 'Very Rare',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Blüht nur bei Neumond, Schattenmagie.',
    location: 'Neumond-Nächte',
    manaContent: 48,
    properties: {
      shadow_magic: 'strong',
      lunar: true,
      stealth: 'high'
    }
  },

  // ========== LEGENDARY/MYTHICAL HERBS ==========
  mondfarn: {
    id: 'mondfarn',
    name: 'Mondfarn',
    rarity: 'Legendary',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Legendärer Farn mit Mondkraft, extrem selten.',
    location: 'Mondtempel, unter Vollmond',
    manaContent: 80,
    properties: {
      lunar_power: 'legendary',
      mana_restoration: 'high',
      moon_magic: true
    },
    manaLevelRequired: 3
  },
  ewiggrün: {
    id: 'ewiggrün',
    name: 'Ewiggrün',
    rarity: 'Legendary',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Verwelkt niemals, ewige Lebenskraft.',
    location: 'Zeitlose Orte, Feenreiche',
    manaContent: 100,
    properties: {
      immortality: 'temporary',
      life_force: 'legendary',
      regeneration: 'extreme'
    },
    manaLevelRequired: 3
  },
  bernsteinthymian: {
    id: 'bernsteinthymian',
    name: 'Bernsteinthymian',
    rarity: 'Legendary',
    categories: ['Culinary', 'Brewing/Crafting'],
    description: 'In Bernstein konserviertes uraltes Kraut.',
    location: 'Bernsteinminen, prähistorische Stätten',
    manaContent: 75,
    properties: {
      time_preservation: true,
      ancient_power: true
    },
    manaLevelRequired: 3
  },
  drachenauge: {
    id: 'drachenauge',
    name: 'Drachenauge',
    rarity: 'Legendary',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Kristallisierte Träne eines Drachen.',
    location: 'Drachenschätze',
    manaContent: 120,
    properties: {
      dragon_essence: true,
      fire: 'immunity-high',
      vision: 'true_sight'
    },
    manaLevelRequired: 4
  },

  // ========== DIVINE HERBS ==========
  runenwurz: {
    id: 'runenwurz',
    name: 'Runenwurz',
    rarity: 'Legendary',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Göttliche Pflanze mit eingravierten Runen.',
    location: 'Göttertempel, divine Orte',
    manaContent: 150,
    properties: {
      divine_power: true,
      rune_magic: 'legendary',
      god_touched: true
    },
    manaLevelRequired: 4
  },
  phonixfederkraut: {
    id: 'phonixfederkraut',
    name: 'Phönixfederkraut',
    rarity: 'Legendary',
    categories: ['Medicinal', 'Culinary', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Wächst aus Phönixfedern, Auferstehungskraft.',
    location: 'Phönixnester, Ascheplätze',
    manaContent: 200,
    properties: {
      resurrection: true,
      rebirth: true,
      phoenix_fire: true,
      immortality: 'true'
    },
    manaLevelRequired: 4
  },
  gotterbalsam: {
    id: 'gotterbalsam',
    name: 'Götterbalsam',
    rarity: 'Legendary',
    categories: ['Medicinal'],
    description: 'Heilsalbe der Götter, heilt alles.',
    location: 'Heilige Stätten, Götteraltäre',
    manaContent: 180,
    properties: {
      divine_healing: 'absolute',
      cure_all: true,
      blessing: 'divine'
    },
    manaLevelRequired: 4
  },

  // ===== ADDITIONAL HERBS FOR NEW POTIONS =====
  eisblume: {
    id: 'eisblume',
    name: 'Eisblume',
    rarity: 'Uncommon',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Kristallene Blume aus ewigem Eis, kalt bei Berührung.',
    location: 'Eiswüsten, gefrorene Berggipfel',
    manaContent: 15,
    properties: {
      cold_affinity: 'high',
      frost_resistance: true,
      ice_magic: 'moderate'
    }
  },
  frostfarn: {
    id: 'frostfarn',
    name: 'Frostfarn',
    rarity: 'Common',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Farngewächs mit eisigen Wedeln, wächst in kalten Regionen.',
    location: 'Schneewälder, Frostgebiete',
    manaContent: 5,
    properties: {
      cold_resistance: 'minor',
      frost_touch: true
    }
  },
  blitzgras: {
    id: 'blitzgras',
    name: 'Blitzgras',
    rarity: 'Uncommon',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Grashalme die statisch aufgeladen sind und kleine Funken sprühen.',
    location: 'Sturmebenen, Hochplateaus',
    manaContent: 12,
    properties: {
      lightning_affinity: 'high',
      electrical_charge: true,
      storm_magic: 'moderate'
    }
  },
  sturmklee: {
    id: 'sturmklee',
    name: 'Sturmklee',
    rarity: 'Common',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Wilder Klee der nur während Gewittern blüht.',
    location: 'Gewittergebiete, Windebenen',
    manaContent: 8,
    properties: {
      storm_connection: true,
      wind_affinity: 'moderate',
      speed_boost: 'minor'
    }
  },
  bitterlaub: {
    id: 'bitterlaub',
    name: 'Bitterlaub',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Extrem bittere Blätter, neutralisieren Gifte.',
    location: 'Sümpfe, Moorgebiete',
    manaContent: 0,
    properties: {
      antitoxin: 'strong',
      poison_neutralizer: true,
      bitter_taste: 'extreme'
    }
  },
  wolkenkraut: {
    id: 'wolkenkraut',
    name: 'Wolkenkraut',
    rarity: 'Rare',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Federleichtes Kraut das in der Luft schwebt.',
    location: 'Hohe Berge, schwebende Inseln',
    manaContent: 25,
    properties: {
      levitation: true,
      air_affinity: 'high',
      weightless: true,
      flight_magic: 'moderate'
    }
  },
  wasserlilie: {
    id: 'wasserlilie',
    name: 'Wasserlilie',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Aquatische Blume mit heilenden Eigenschaften.',
    location: 'Seen, Teiche, ruhige Gewässer',
    manaContent: 5,
    properties: {
      water_breathing: 'minor',
      aquatic_affinity: true,
      healing: 'minor'
    }
  },
  seealge: {
    id: 'seealge',
    name: 'Seealge',
    rarity: 'Common',
    categories: ['Culinary', 'Brewing/Crafting'],
    description: 'Glitschige Meeresalge, essbar und nährstoffreich.',
    location: 'Küsten, Unterwasser',
    manaContent: 0,
    properties: {
      slippery: true,
      water_adaptation: true,
      nutritious: 'high'
    }
  },
  nachtschatten: {
    id: 'nachtschatten',
    name: 'Nachtschatten',
    rarity: 'Common',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Dunkle Beeren die nur nachts sichtbar sind.',
    location: 'Schattige Wälder, Höhlen',
    manaContent: 8,
    properties: {
      darkvision: 'minor',
      night_affinity: true,
      shadow_magic: 'weak'
    }
  },
  silberzunge: {
    id: 'silberzunge',
    name: 'Silberzunge',
    rarity: 'Uncommon',
    categories: ['Magical', 'Ritual/Cultural'],
    description: 'Blatt in Form einer Zunge, erleichtert Kommunikation.',
    location: 'Handelsstädte, Diplomatie-Gärten',
    manaContent: 10,
    properties: {
      persuasion_boost: 'high',
      language_aid: true,
      charm_magic: 'moderate'
    }
  },
  liebeskraut: {
    id: 'liebeskraut',
    name: 'Liebeskraut',
    rarity: 'Uncommon',
    categories: ['Magical', 'Ritual/Cultural'],
    description: 'Herzförmige rote Blätter, wecken Zuneigung.',
    location: 'Romantische Gärten, Liebesschreine',
    manaContent: 12,
    properties: {
      charm_effect: 'strong',
      friendship: true,
      love_magic: 'moderate'
    }
  },
  steinflechte: {
    id: 'steinflechte',
    name: 'Steinflechte',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Harte Flechte die auf Felsen wächst, extrem widerstandsfähig.',
    location: 'Felsformationen, Steinbrüche',
    manaContent: 0,
    properties: {
      hardening: 'strong',
      durability: 'high',
      stone_affinity: true
    }
  },
  waldbeere: {
    id: 'waldbeere',
    name: 'Waldbeere',
    rarity: 'Common',
    categories: ['Culinary', 'Medicinal'],
    description: 'Süße Beeren aus dem Wald, beliebt bei Tieren.',
    location: 'Wälder, Lichtungen',
    manaContent: 0,
    properties: {
      animal_attraction: true,
      nutritious: 'moderate',
      sweet_taste: true
    }
  }
}

// Helper functions
export const getHerbById = (id) => herbsDatabase[id]

export const getHerbsByRarity = (rarity) => {
  return Object.values(herbsDatabase).filter(h => h.rarity === rarity)
}

export const getHerbsByCategory = (category) => {
  return Object.values(herbsDatabase).filter(h => h.categories.includes(category))
}

export const getHerbsWithMana = () => {
  return Object.values(herbsDatabase).filter(h => h.manaContent > 0)
}

export const getAllHerbs = () => Object.values(herbsDatabase)

export const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']

export const categoryList = [
  'Medicinal',
  'Culinary',
  'Magical',
  'Ritual/Cultural',
  'Brewing/Crafting'
]
