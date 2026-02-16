// Herb to Color Mapping - Each herb has a hue value for CSS filter
// Colors based on herb properties and categories

export const herbColors = {
  // Red/Pink herbs (0-30 hue)
  wolfsfarn: { hue: 120, saturation: 1.2, name: 'Grün' },
  eisenkraut: { hue: 280, saturation: 1.3, name: 'Silber' },

  // Fire/Orange herbs (30-60 hue)
  feuerblute: { hue: 15, saturation: 1.5, name: 'Feuerrot' },
  glutwurz: { hue: 25, saturation: 1.6, name: 'Glutrot' },

  // Yellow/Gold herbs (60-90 hue)
  sonnenlaub: { hue: 50, saturation: 1.4, name: 'Gold' },
  wiesensalbei: { hue: 70, saturation: 1.2, name: 'Gelb' },

  // Green herbs (90-150 hue)
  bergveilchen: { hue: 280, saturation: 1.1, name: 'Violett' },
  waldfarn: { hue: 110, saturation: 1.3, name: 'Waldgrün' },
  wanderkraut: { hue: 100, saturation: 1.2, name: 'Grün' },
  elfenhaar: { hue: 180, saturation: 0.8, name: 'Silber-Grün' },

  // Cyan/Turquoise herbs (150-210 hue)
  mondkresse: { hue: 200, saturation: 1.3, name: 'Mondblau' },
  mondfarn: { hue: 220, saturation: 1.4, name: 'Tiefblau' },

  // Blue herbs (210-270 hue)
  orgain: { hue: 30, saturation: 0.8, name: 'Braun' },

  // Purple herbs (270-330 hue)
  schattenkraut: { hue: 280, saturation: 1.2, name: 'Dunkelviolett' },
  nachtflieder: { hue: 290, saturation: 1.3, name: 'Violett' },
  dammerungslilie: { hue: 300, saturation: 1.2, name: 'Purpur' },

  // Special/Legendary herbs
  runenwurz: { hue: 280, saturation: 1.5, brightness: 1.2, name: 'Arkanes Violett' },
  phonixfederkraut: { hue: 15, saturation: 2.0, brightness: 1.3, name: 'Phönixrot' },
  gotterbalsam: { hue: 50, saturation: 1.8, brightness: 1.4, name: 'Göttergold' },
  ewiggrün: { hue: 120, saturation: 1.5, brightness: 1.1, name: 'Ewiges Grün' },

  // Uncommon herbs
  peseilie: { hue: 90, saturation: 1.2, name: 'Hellgrün' },
  elffuss: { hue: 160, saturation: 1.1, name: 'Elfengrün' },
  manndrache: { hue: 30, saturation: 1.3, name: 'Erdbraun' },
  alraunenkraut: { hue: 120, saturation: 1.4, name: 'Dunkelgrün' },
  silberspross: { hue: 200, saturation: 0.7, brightness: 1.3, name: 'Silber' },
  silberdistel: { hue: 200, saturation: 0.7, brightness: 1.2, name: 'Silber' },

  // Rare herbs
  todeswurz: { hue: 0, saturation: 0.3, brightness: 0.5, name: 'Todeschwarz' },
  morak: { hue: 140, saturation: 1.1, name: 'Rituelles Grün' },
  silberweide: { hue: 180, saturation: 0.6, brightness: 1.4, name: 'Silberweiß' },
  hexenholz: { hue: 280, saturation: 0.8, brightness: 0.6, name: 'Hexenviolett' },
  sternenfeuerkraut: { hue: 200, saturation: 1.5, brightness: 1.5, name: 'Sternenblau' },

  // Very Rare herbs
  flachlandische_grunwiesel: { hue: 100, saturation: 1.2, name: 'Wiesengrün' },
  blaubergische_hammelblume: { hue: 230, saturation: 1.3, name: 'Bergblau' },
  straters_wurzel: { hue: 40, saturation: 1.4, name: 'Alchemistengold' },
  drachenmelisse: { hue: 0, saturation: 1.6, brightness: 1.2, name: 'Drachenrot' },
  geisterzunge: { hue: 180, saturation: 0.5, brightness: 1.3, name: 'Geistersilber' },
  flussperlminze: { hue: 170, saturation: 1.2, name: 'Wassertürkis' },
  schattenmondblute: { hue: 280, saturation: 1.4, brightness: 0.7, name: 'Schattenlila' },

  // Additional herbs
  eisblume: { hue: 190, saturation: 1.3, name: 'Eisblau' },
  frostfarn: { hue: 200, saturation: 1.2, name: 'Frostblau' },
  blitzgras: { hue: 60, saturation: 1.6, brightness: 1.4, name: 'Blitzgelb' },
  sturmklee: { hue: 210, saturation: 1.1, name: 'Sturmblau' },
  bitterlaub: { hue: 100, saturation: 0.8, brightness: 0.7, name: 'Dunkelgrün' },
  wolkenkraut: { hue: 0, saturation: 0.1, brightness: 1.5, name: 'Wolkenweiß' },
  wasserlilie: { hue: 180, saturation: 1.1, name: 'Wasserblau' },
  seealge: { hue: 150, saturation: 1.2, name: 'Seegrün' },
  nachtschatten: { hue: 280, saturation: 1.0, brightness: 0.6, name: 'Nachtviolett' },
  silberzunge: { hue: 200, saturation: 0.5, brightness: 1.4, name: 'Silber' },
  liebeskraut: { hue: 340, saturation: 1.5, name: 'Liebesrot' },
  steinflechte: { hue: 30, saturation: 0.6, brightness: 0.8, name: 'Steingrau' },
  waldbeere: { hue: 340, saturation: 1.3, name: 'Beerenrot' },

  // Legendary herbs
  bernsteinthymian: { hue: 40, saturation: 1.5, brightness: 1.3, name: 'Bernsteingold' },
  drachenauge: { hue: 0, saturation: 1.8, brightness: 1.4, name: 'Drachenrot' }
}

// Get CSS filter string for a herb
export const getHerbColorFilter = (herbId) => {
  const color = herbColors[herbId]
  if (!color) {
    return '' // No filter if herb not found
  }

  const hue = color.hue || 0
  const saturation = color.saturation || 1
  const brightness = color.brightness || 1

  return `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`
}

// Get the main herb (first ingredient) from a recipe
export const getMainHerbId = (recipe) => {
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    return null
  }
  return recipe.ingredients[0].id
}
