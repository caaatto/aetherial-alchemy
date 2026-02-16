// Herb to Color Mapping - Each herb has a hue value for CSS filter
// Colors based on herb properties and categories

export const herbColors = {
  // === HEALING HERBS === (Red hues: 0-20)
  wolfsfarn: { hue: 10, saturation: 1.3, name: 'Hellrot' },
  eisenkraut: { hue: 0, saturation: 1.1, brightness: 1.1, name: 'Blassrot' },

  // === FIRE/COMBAT HERBS === (Orange hues: 20-40)
  feuerblute: { hue: 30, saturation: 1.5, name: 'Feuerrot' },
  glutwurz: { hue: 35, saturation: 1.6, name: 'Glutrot' },

  // === DIVINE/LEGENDARY HERBS === (Gold hues: 40-60)
  sonnenlaub: { hue: 50, saturation: 1.4, name: 'Gold' },
  wiesensalbei: { hue: 55, saturation: 1.2, name: 'Gelb' },

  // === LIGHTNING HERBS === (Yellow hues: 60-75)
  blitzgras: { hue: 60, saturation: 1.6, brightness: 1.2, name: 'Blitzgelb' },
  sturmklee: { hue: 65, saturation: 1.4, name: 'Sturmgelb' },

  // === NATURE/UTILITY HERBS === (Green hues: 90-120)
  waldfarn: { hue: 110, saturation: 1.3, name: 'Waldgrün' },
  wanderkraut: { hue: 100, saturation: 1.2, name: 'Grün' },

  // === POISON HERBS === (Toxic green: 120-140)
  todeswurz: { hue: 130, saturation: 1.2, brightness: 0.8, name: 'Giftgrün' },
  bitterlaub: { hue: 125, saturation: 1.1, brightness: 0.9, name: 'Bittergrün' },

  // === REGENERATION HERBS === (Emerald: 140-160)
  alraunenkraut: { hue: 145, saturation: 1.4, name: 'Smaragdgrün' },
  ewiggrün: { hue: 150, saturation: 1.5, brightness: 1.1, name: 'Ewiges Grün' },

  // === COLD/FROST HERBS === (Cyan hues: 180-200)
  eisblume: { hue: 180, saturation: 1.4, name: 'Eisblau' },
  frostfarn: { hue: 185, saturation: 1.3, name: 'Frostcyan' },
  elfenhaar: { hue: 190, saturation: 0.9, name: 'Silber-Cyan' },

  // === MANA HERBS === (Blue hues: 210-230)
  mondkresse: { hue: 210, saturation: 1.4, name: 'Mondblau' },
  mondfarn: { hue: 220, saturation: 1.4, name: 'Tiefblau' },

  // === STEALTH/SHADOW HERBS === (Purple hues: 270-290)
  schattenkraut: { hue: 270, saturation: 1.3, brightness: 0.8, name: 'Schattenviolett' },
  schattenmondblute: { hue: 275, saturation: 1.4, brightness: 0.7, name: 'Schattenlila' },
  nachtflieder: { hue: 280, saturation: 1.3, name: 'Violett' },
  dammerungslilie: { hue: 285, saturation: 1.2, name: 'Purpur' },

  // === NEUTRAL/BROWN HERBS === (Low saturation, neutral tones)
  bergveilchen: { hue: 280, saturation: 1.1, name: 'Violett' },
  orgain: { hue: 30, saturation: 0.8, name: 'Braun' },
  manndrache: { hue: 30, saturation: 0.9, brightness: 0.9, name: 'Erdbraun' },

  // === LEGENDARY/DIVINE HERBS ===
  phonixfederkraut: { hue: 15, saturation: 2.0, brightness: 1.3, name: 'Phönixrot' },
  gotterbalsam: { hue: 50, saturation: 1.8, brightness: 1.4, name: 'Göttergold' },
  bernsteinthymian: { hue: 45, saturation: 1.5, brightness: 1.3, name: 'Bernsteingold' },
  drachenauge: { hue: 10, saturation: 1.8, brightness: 1.4, name: 'Drachenrot' },
  runenwurz: { hue: 280, saturation: 1.5, brightness: 1.2, name: 'Arkanes Violett' },

  // === DRAGON/COMBAT HERBS ===
  drachenmelisse: { hue: 20, saturation: 1.6, brightness: 1.2, name: 'Drachenrot' },

  // === UNCOMMON HERBS ===
  peseilie: { hue: 95, saturation: 1.2, name: 'Hellgrün' },
  elffuss: { hue: 160, saturation: 1.1, name: 'Elfengrün' },

  // === NEUTRAL/SUPPORT HERBS === (These don't heavily influence color)
  silberspross: { hue: 0, saturation: 0.3, brightness: 1.3, name: 'Silber' },
  silberdistel: { hue: 0, saturation: 0.3, brightness: 1.2, name: 'Silber' },
  silberweide: { hue: 0, saturation: 0.2, brightness: 1.4, name: 'Silberweiß' },
  silberzunge: { hue: 0, saturation: 0.2, brightness: 1.4, name: 'Silber' },

  // === RARE/SPECIAL HERBS ===
  morak: { hue: 140, saturation: 1.1, name: 'Rituelles Grün' },
  hexenholz: { hue: 275, saturation: 0.9, brightness: 0.6, name: 'Hexenviolett' },
  sternenfeuerkraut: { hue: 220, saturation: 1.5, brightness: 1.5, name: 'Sternenblau' },
  geisterzunge: { hue: 270, saturation: 0.7, brightness: 1.3, name: 'Geisterviolett' },

  // === VERY RARE HERBS ===
  flachlandische_grunwiesel: { hue: 100, saturation: 1.2, name: 'Wiesengrün' },
  blaubergische_hammelblume: { hue: 220, saturation: 1.3, name: 'Bergblau' },
  straters_wurzel: { hue: 40, saturation: 1.4, name: 'Alchemistengold' },
  flussperlminze: { hue: 180, saturation: 1.2, name: 'Wassertürkis' },

  // === WATER/AQUATIC HERBS ===
  wasserlilie: { hue: 190, saturation: 1.1, name: 'Wasserblau' },
  seealge: { hue: 160, saturation: 1.2, name: 'Seegrün' },

  // === NIGHT/DARKNESS HERBS ===
  nachtschatten: { hue: 275, saturation: 1.0, brightness: 0.6, name: 'Nachtviolett' },

  // === LOVE/PASSION HERBS ===
  liebeskraut: { hue: 340, saturation: 1.5, name: 'Liebesrot' },
  waldbeere: { hue: 340, saturation: 1.3, name: 'Beerenrot' },

  // === EARTH/STONE HERBS ===
  steinflechte: { hue: 30, saturation: 0.6, brightness: 0.8, name: 'Steingrau' },
  wolkenkraut: { hue: 0, saturation: 0.1, brightness: 1.5, name: 'Wolkenweiß' }
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
