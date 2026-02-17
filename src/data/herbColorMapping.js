// Herb to Color Mapping - Each herb has a hue value for CSS filter
// Colors based on herb properties and categories

export const herbColors = {
  // === HEALING HERBS === (Red hues: 0-20)
  wolfsfarn: { hue: 10, saturation: 1.3, name: 'Light Red' },
  eisenkraut: { hue: 0, saturation: 1.1, brightness: 1.1, name: 'Pale Red' },

  // === FIRE/COMBAT HERBS === (Orange hues: 20-40)
  feuerblute: { hue: 30, saturation: 1.5, name: 'Fire Red' },
  glutwurz: { hue: 35, saturation: 1.6, name: 'Ember Red' },

  // === DIVINE/LEGENDARY HERBS === (Gold hues: 40-60)
  sonnenlaub: { hue: 50, saturation: 1.4, name: 'Gold' },
  wiesensalbei: { hue: 55, saturation: 1.2, name: 'Yellow' },

  // === LIGHTNING HERBS === (Yellow hues: 60-75)
  blitzgras: { hue: 60, saturation: 1.6, brightness: 1.2, name: 'Lightning Yellow' },
  sturmklee: { hue: 65, saturation: 1.4, name: 'Storm Yellow' },

  // === NATURE/UTILITY HERBS === (Green hues: 90-120)
  waldfarn: { hue: 110, saturation: 1.3, name: 'Forest Green' },
  wanderkraut: { hue: 100, saturation: 1.2, name: 'Green' },

  // === POISON HERBS === (Toxic green: 120-140)
  todeswurz: { hue: 130, saturation: 1.2, brightness: 0.8, name: 'Toxic Green' },
  bitterlaub: { hue: 125, saturation: 1.1, brightness: 0.9, name: 'Bitter Green' },

  // === REGENERATION HERBS === (Emerald: 140-160)
  alraunenkraut: { hue: 145, saturation: 1.4, name: 'Emerald Green' },
  ewiggrün: { hue: 150, saturation: 1.5, brightness: 1.1, name: 'Eternal Green' },

  // === COLD/FROST HERBS === (Cyan hues: 180-200)
  eisblume: { hue: 180, saturation: 1.4, name: 'Ice Blue' },
  frostfarn: { hue: 185, saturation: 1.3, name: 'Frost Cyan' },
  elfenhaar: { hue: 190, saturation: 0.9, name: 'Silver Cyan' },

  // === MANA HERBS === (Blue hues: 210-230)
  mondkresse: { hue: 210, saturation: 1.4, name: 'Moon Blue' },
  mondfarn: { hue: 220, saturation: 1.4, name: 'Deep Blue' },

  // === STEALTH/SHADOW HERBS === (Purple hues: 270-290)
  schattenkraut: { hue: 270, saturation: 1.3, brightness: 0.8, name: 'Shadow Violet' },
  schattenmondblute: { hue: 275, saturation: 1.4, brightness: 0.7, name: 'Shadow Lilac' },
  nachtflieder: { hue: 280, saturation: 1.3, name: 'Violet' },
  dammerungslilie: { hue: 285, saturation: 1.2, name: 'Purple' },

  // === NEUTRAL/BROWN HERBS === (Low saturation, neutral tones)
  bergveilchen: { hue: 280, saturation: 1.1, name: 'Violet' },
  orgain: { hue: 30, saturation: 0.8, name: 'Brown' },
  manndrache: { hue: 30, saturation: 0.9, brightness: 0.9, name: 'Earth Brown' },

  // === LEGENDARY/DIVINE HERBS ===
  phonixfederkraut: { hue: 15, saturation: 2.0, brightness: 1.3, name: 'Phoenix Red' },
  gotterbalsam: { hue: 50, saturation: 1.8, brightness: 1.4, name: 'Divine Gold' },
  bernsteinthymian: { hue: 45, saturation: 1.5, brightness: 1.3, name: 'Amber Gold' },
  drachenauge: { hue: 10, saturation: 1.8, brightness: 1.4, name: 'Dragon Red' },
  runenwurz: { hue: 280, saturation: 1.5, brightness: 1.2, name: 'Arcane Violet' },

  // === DRAGON/COMBAT HERBS ===
  drachenmelisse: { hue: 20, saturation: 1.6, brightness: 1.2, name: 'Dragon Red' },

  // === UNCOMMON HERBS ===
  peseilie: { hue: 95, saturation: 1.2, name: 'Light Green' },
  elffuss: { hue: 160, saturation: 1.1, name: 'Elven Green' },

  // === NEUTRAL/SUPPORT HERBS === (These don't heavily influence color)
  silberspross: { hue: 0, saturation: 0.3, brightness: 1.3, name: 'Silver' },
  silberdistel: { hue: 0, saturation: 0.3, brightness: 1.2, name: 'Silver' },
  silberweide: { hue: 0, saturation: 0.2, brightness: 1.4, name: 'Silver White' },
  silberzunge: { hue: 0, saturation: 0.2, brightness: 1.4, name: 'Silver' },

  // === RARE/SPECIAL HERBS ===
  morak: { hue: 140, saturation: 1.1, name: 'Ritual Green' },
  hexenholz: { hue: 275, saturation: 0.9, brightness: 0.6, name: 'Witch Violet' },
  sternenfeuerkraut: { hue: 220, saturation: 1.5, brightness: 1.5, name: 'Star Blue' },
  geisterzunge: { hue: 270, saturation: 0.7, brightness: 1.3, name: 'Ghost Violet' },

  // === VERY RARE HERBS ===
  flachlandische_grunwiesel: { hue: 100, saturation: 1.2, name: 'Meadow Green' },
  blaubergische_hammelblume: { hue: 220, saturation: 1.3, name: 'Mountain Blue' },
  straters_wurzel: { hue: 40, saturation: 1.4, name: 'Alchemist Gold' },
  flussperlminze: { hue: 180, saturation: 1.2, name: 'Water Turquoise' },

  // === WATER/AQUATIC HERBS ===
  wasserlilie: { hue: 190, saturation: 1.1, name: 'Water Blue' },
  seealge: { hue: 160, saturation: 1.2, name: 'Sea Green' },

  // === NIGHT/DARKNESS HERBS ===
  nachtschatten: { hue: 275, saturation: 1.0, brightness: 0.6, name: 'Night Violet' },

  // === LOVE/PASSION HERBS ===
  liebeskraut: { hue: 340, saturation: 1.5, name: 'Love Red' },
  waldbeere: { hue: 340, saturation: 1.3, name: 'Berry Red' },

  // === EARTH/STONE HERBS ===
  steinflechte: { hue: 30, saturation: 0.6, brightness: 0.8, name: 'Stone Gray' },
  wolkenkraut: { hue: 0, saturation: 0.1, brightness: 1.5, name: 'Cloud White' }
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
