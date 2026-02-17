// Complete Aetherial Herbs Database
// Based on: https://aetherial.fandom.com/wiki/List_of_Herbs
// Herb names are in German, descriptions and content are in English

export const herbsDatabase = {
  // ========== COMMON HERBS ==========
  wolfsfarn: {
    id: 'wolfsfarn',
    name: 'Wolfsfarn',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Silvery leaves that shimmer in moonlight and display a faint luminescence when exposed to mana. Potent healing properties, valued by those versed in the arcane. Represents protection in elven tradition. Delicate roots require careful harvesting.',
    location: 'Forests and meadows of the Kingdom of Tundral',
    manaContent: 3,
    properties: {
      healing: 'medium',
      stability: 'high',
      manaRegeneration: 'low',
      moonlight: true
    }
  },
  orgain: {
    id: 'orgain',
    name: 'Orgain',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Characterized by vivid green leaves that shimmer with an ethereal glow when exposed to moonlight. Prized for its restorative capabilities, employed by healers across centuries to address ailments ranging from superficial wounds to serious internal conditions. Holds significance in elven and human ceremonies, representing restoration and life force.',
    location: 'Flourishes in temperate areas of the White Dragons Kingdom, predominantly growing in clusters near freshwater sources such as rivers and lakes, thriving in nutrient-rich soil',
    manaContent: 0,
    properties: {
      healing: 'restorative',
      moonlightGlow: true,
      culturalSignificance: true
    }
  },
  feuerblute: {
    id: 'feuerblute',
    name: 'Feuerblüte',
    rarity: 'Common',
    categories: ['Medicinal', 'Culinary', 'Brewing/Crafting'],
    description: 'Vivid red-orange petals that flicker like flames in the wind. Serrated, fire-red leaves. Sharp, peppery scent with earthy undertones. Produces a heat burst when crushed, like glowing embers. Grows in volcanic environments near hot springs and dormant volcanoes.',
    location: 'Volcanic regions, hot springs, high mountain ranges',
    manaContent: 2,
    properties: {
      fire: 'resistance-medium',
      warmth: true,
      heat: 'burst'
    }
  },
  eisenkraut: {
    id: 'eisenkraut',
    name: 'Eisenkraut',
    rarity: 'Common',
    categories: ['Medicinal'],
    description: 'Thick, iron-grey stalks with small purple flower clusters. Serrated leaves with a faint metallic sheen. Natural antiseptic properties for wounds and infections. Brewed as tea it strengthens the body against exhaustion and stress. Popular among soldiers and travelers.',
    location: 'Wild meadows and forest edges throughout the kingdoms',
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
    description: 'A common yet strikingly beautiful herb that thrives in the cold, mountainous regions of Tundral. Features violet petals with frosty white edges and heart-shaped leaves covered in silvery hairs, demonstrating surprising resilience despite its delicate appearance. Treats respiratory ailments, soothes sore throats, and has mild pain-relieving effects.',
    location: 'Found in Tundral\'s mountainous terrain, particularly growing in clusters near rocky outcrops and along snow-fed streams',
    manaContent: 0,
    properties: {
      respiratory: 'healing',
      painRelief: 'mild',
      woundHealing: 'minor',
      coldResistant: true
    }
  },
  schattenkraut: {
    id: 'schattenkraut',
    name: 'Schattenkraut',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting', 'Poisonous'],
    description: 'Dark green foliage with delicate, midnight-blue blossoms that glow faintly at dusk. Dual nature: a powerful toxin or remedy depending on preparation. Properly processed, it improves mana regeneration or serves as an antidote. Improper handling causes severe hallucinations or death. Sought after by spies, assassins, and rogue mages.',
    location: 'Shaded undergrowth of dense forests, secluded valleys',
    manaContent: 5,
    properties: {
      stealth: 'medium',
      shadow: true,
      poison: 'high',
      manaRegeneration: 'medium',
      antidote: true,
      dangerous: true
    }
  },
  mondkresse: {
    id: 'mondkresse',
    name: 'Mondkresse',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'Silvery leaves with delicate, star-shaped blossoms that bloom under moonlight. A faint luminescence makes it popular for nocturnal remedies and rituals. Particularly effective as a poultice for burns and minor wounds. Enhances mana regeneration when ingested. Its ethereal appearance has established it as a fundamental resource in both household and arcane practice.',
    location: 'Shaded areas near streams and forest clearings',
    manaContent: 4,
    properties: {
      lunar: true,
      night_vision: 'low',
      healing: 'low',
      luminescent: true,
      manaRegeneration: 'low'
    }
  },
  dammerungslilie: {
    id: 'dammerungslilie',
    name: 'Dämmerungslilie',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'A common herb that flourishes in the twilight hours, when the boundary between day and night blurs. Its petals produce a soft, ethereal glow reminiscent of the fading light at dusk. Enhances mana flow, aids in recovery of depleted magical reserves, creates powerful wound-mending elixirs, and rejuvenates body and spirit.',
    location: 'Grows in secluded forest glades and ancient groves, often protected by enchantments or guarded by nature spirits. Thrives only in areas where magic is abundant and undisturbed',
    manaContent: 2,
    properties: {
      twilight: true,
      manaFlow: 'enhancement',
      manaRecovery: true,
      healing: 'medium',
      etherealGlow: true
    }
  },
  waldfarn: {
    id: 'waldfarn',
    name: 'Waldfarn',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'A forested herb characterized by vibrant green fronds and delicate, feathery leaves. Displays a distinctive spiral growth pattern and produces faint luminescence during twilight hours. Has mild restorative qualities with soothing effects on minor wounds and burns. Represents resilience and protection in traditional folklore.',
    location: 'Found throughout forested regions of the kingdoms, in shaded areas with rich, moist soil',
    manaContent: 0,
    properties: {
      healing: 'mild',
      burns: 'treatment',
      luminescence: 'twilight',
      resilience: true
    }
  },
  wiesensalbei: {
    id: 'wiesensalbei',
    name: 'Wiesensalbei',
    rarity: 'Common',
    categories: ['Medicinal', 'Culinary', 'Brewing/Crafting'],
    description: 'A resilient herb characterized by tall stalks adorned with vibrant purple-blue flowers and broad, aromatic leaves. Excellent for wound healing, soothes sore throats, and alleviates digestive issues. Commonly grown in household gardens and sold in local markets. Symbolizes resilience and renewal in elven tradition.',
    location: 'Meadows and fields across various kingdoms. Commonly grown in household gardens and sold in local markets',
    manaContent: 0,
    properties: {
      woundHealing: true,
      throatSoothing: true,
      digestion: true,
      aromatic: true,
      culturalSignificance: true
    }
  },
  nachtflieder: {
    id: 'nachtflieder',
    name: 'Nachtflieder',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'A magical herb with dark purple blossoms glowing faintly under the moonlight. Flourishes within shadowy forest environments and is valued for its ability to restore mana reserves. Has potent mana-restorative qualities, enhances protective magic, and facilitates concealment in spells and rituals. Magical essence concentrates at night.',
    location: 'Thrives in the shadowy underbrush of dense forests',
    manaContent: 1,
    properties: {
      manaRestorative: 'potent',
      protectiveMagic: 'enhancement',
      concealment: true,
      moonlightGlow: true,
      nightEssence: true
    }
  },
  sonnenlaub: {
    id: 'sonnenlaub',
    name: 'Sonnenlaub',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'A common herb with broad, golden-green leaves that shimmer faintly in the sunlight, giving it a radiant appearance. Adapts well to diverse environments. Has natural mana-boosting qualities, heightens mana sensitivity for efficient spellcasting, treats minor wounds, and accelerates physical recovery. Incorporated into life and renewal rituals.',
    location: 'Found across diverse landscapes throughout the kingdoms; widespread availability makes it relatively accessible',
    manaContent: 2,
    properties: {
      solar: true,
      manaBoost: true,
      manaSensitivity: 'enhancement',
      healing: 'minor',
      recovery: 'acceleration',
      radiance: true
    }
  },
  wanderkraut: {
    id: 'wanderkraut',
    name: 'Wanderkraut',
    rarity: 'Common',
    categories: ['Medicinal', 'Magical'],
    description: 'A mobile herb with a unique ability to relocate independently. Resembles a bilberry bush but does not produce bilberries as fruit. Demonstrates autonomous movement capabilities and typically found in clusters that disperse when disturbed. Has well-documented medicinal properties. Roots turned into oil for wound treatments.',
    location: 'Common throughout various areas; exhibits individual preferences causing groups to scatter when disturbed',
    manaContent: 0,
    properties: {
      mobility: 'autonomous',
      woundOil: true,
      medicinal: true,
      dispersal: 'cluster'
    }
  },

  // ========== UNCOMMON HERBS ==========
  peseilie: {
    id: 'peseilie',
    name: 'Peseilie',
    rarity: 'Uncommon',
    categories: ['Culinary', 'Magical'],
    description: 'An uncommon herb known for its deep emerald leaves and subtle, woodsy aroma. When consumed in mana-infused dishes, Peseilie provides a mild enhancement to magical abilities. Known as the "Green Jewel" among herbalists.',
    location: 'Flourishes in hidden groves within elven forests and occasionally in remote human gardens',
    manaContent: 5,
    properties: {
      magicEnhancement: 'mild',
      woodsyAroma: true,
      manaInfused: true
    }
  },
  elffuss: {
    id: 'elffuss',
    name: 'Elffuß',
    rarity: 'Uncommon',
    categories: ['Culinary', 'Magical'],
    description: 'An uncommon herb found in secluded, ancient forests with a strong elven presence. Features bioluminescent leaves that glow beneath moonlight and silver-white blossoms shaped to resemble an elf\'s foot. Enhances mana reserves when consumed and is valuable for magical practitioners.',
    location: 'Found in remote, ancient woodlands with significant elven influence; thrives in soil enriched with mana',
    manaContent: 5,
    properties: {
      manaReserves: 'enhancement',
      bioluminescent: true,
      moonlightGlow: true,
      elvenConnection: 'strong'
    }
  },
  manndrache: {
    id: 'manndrache',
    name: 'Manndrache',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'An uncommon and potent herb known for its vibrant crimson leaves and faint luminescent glow. According to legend, the first Manndrache sprouted from the blood of an ancient dragon defeated by elven warriors. Significantly increases user\'s mana reserves and serves as a powerful healing agent for severe wounds. Protected by nature spirits and magical wards.',
    location: 'Found exclusively in secluded, mana-rich environments including ancient forests and hidden groves',
    manaContent: 8,
    properties: {
      healing: 'powerful',
      manaReserves: 'significant',
      luminescent: true,
      dragonLegend: true,
      magicallyProtected: true
    }
  },
  glutwurz: {
    id: 'glutwurz',
    name: 'Glutwurz',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'A rare and potent magical herb characterized by vibrant, fiery red leaves that seem to shimmer with an inner heat. Amplifies magical abilities, enhances physical strength, and provides temporary protection against demonic influences. Can be brewed into a powerful elixir or ground into glowing powder that is luminescent under moonlight. Improper use causes severe mana depletion.',
    location: 'Found in the most secluded and mystical groves, deep within enchanted forests or hidden valleys guarded by ancient spirits; requires areas rich with mana',
    manaContent: 6,
    properties: {
      magicAmplification: true,
      strengthEnhancement: true,
      demonicProtection: 'temporary',
      luminescent: 'moonlight',
      manaDepletion: 'risk'
    }
  },
  alraunenkraut: {
    id: 'alraunenkraut',
    name: 'Alraunenkraut',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'An uncommon herb known for its potent magical properties. Displays distinctive dark green foliage exhibiting an ethereal glow beneath moonlight. Its root structure resembles contorted human limbs, inspiring various folklore and mythological accounts. Substantially boosts mana capacity, essential ingredient in powerful healing remedies, and used for crafting potent enchantments.',
    location: 'Found in the most remote sections of primordial woodlands, typically in areas protected by nature spirits or concealed within magically-enhanced groves',
    manaContent: 10,
    properties: {
      manaCapacity: 'substantial',
      healing: 'powerful',
      enchantmentCrafting: true,
      moonlightGlow: true,
      humanoidRoot: true
    }
  },
  silberspross: {
    id: 'silberspross',
    name: 'Silberspross',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'A rare and mystical herb known for its shimmering silver leaves that glow faintly under moonlight. Blooms infrequently—only once every decade—making it exceptionally difficult to cultivate or harvest. Enhances mana regeneration, heals severe injuries and wounds, and restores depleted magical reserves. Grants prophetic visions when consumed during a full moon. Believed to be spiritually blessed by forest spirits.',
    location: 'Grows exclusively in secluded, enchanted groves that are typically guarded by ancient magical protections',
    manaContent: 7,
    properties: {
      manaRegeneration: 'enhanced',
      healing: 'severe',
      prophecy: 'fullMoon',
      silverGlow: true,
      decadeBlooming: true,
      spiritBlessed: true
    }
  },
  silberdistel: {
    id: 'silberdistel',
    name: 'Silberdistel',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Culinary', 'Brewing/Crafting'],
    description: 'An uncommon medicinal herb known for its silver-hued leaves and delicate white flowers. Has a faintly sweet scent that belies its intensely bitter taste. Provides calming effects when dried and smoked, relieves stress and fatigue, aids digestion when brewed as tea, reduces inflammation, and boosts overall vitality. Highly valued by herbalists and healers.',
    location: 'Highland regions and shaded forest groves; requires cool, moist conditions',
    manaContent: 5,
    properties: {
      calming: true,
      stressRelief: true,
      digestion: 'aid',
      inflammation: 'reduction',
      vitality: 'boost',
      bitterTaste: 'intense'
    }
  },
  elfenhaar: {
    id: 'elfenhaar',
    name: 'Elfenhaar',
    rarity: 'Uncommon',
    categories: ['Medicinal', 'Culinary'],
    description: 'An uncommon and highly prized herb featuring delicate, thread-like leaves that shimmer with a faint silvery hue, reminiscent of moonlight filtering through the canopy. Has a subtle yet enchanting aroma blending hints of wildflowers and fresh rain. Enhances dish flavors with sweetness and earthiness, has mild restorative medicinal qualities, and can be brewed into therapeutic teas. Fragile structure requires careful handling.',
    location: 'Found in ancient elven forests, specifically in shadowed areas beneath tall trees and concealed within thick underbrush',
    manaContent: 6,
    properties: {
      culinaryEnhancement: true,
      restorative: 'mild',
      silverShimmer: true,
      aromaticBlend: true,
      delicate: true
    }
  },

  // ========== RARE HERBS ==========
  todeswurz: {
    id: 'todeswurz',
    name: 'Todeswurz',
    rarity: 'Rare',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'Deathroot is a rare and feared herb found in dark, forgotten corners of the world. It possesses potentially toxic properties requiring cautious handling by practitioners. Features a gnarled structure with deep green to nearly black foliage thriving in shadowy settings. Its roots are characteristically thick and twisted, often emitting an eerie glow in the dark. Used in death-related and curse potions, and for treatment of severe conditions. Symbolizes hidden knowledge and balance between life and death.',
    location: 'Dark, forgotten corners of the world; shadowy settings',
    manaContent: 15,
    properties: {
      toxic: 'potent',
      eerieGlow: true,
      deathMagic: true,
      cursePotions: true,
      severeConditions: 'treatment',
      hiddenKnowledge: true
    }
  },
  morak: {
    id: 'morak',
    name: 'Morak/Moraqu',
    rarity: 'Rare',
    categories: ['Medicinal', 'Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'A healing herb inhabiting moorland regions with extraordinary properties. The plant can absorb creature blood into its biological cycle, and when sufficient blood combines with the herb\'s spiritual essence, it manifests into a necromant—a ghost-like entity draped in tattered cloth. When harvested, Morak is a useful tool for stopping bleeding wounds through enzymes that create molecular bonds forming thin protective skin over wounds. Stronger than yarrow and requires no magical knowledge to use. Named after ancient mage Morak who protected forests.',
    location: 'Moorland environments',
    manaContent: 18,
    properties: {
      bleedingStopper: true,
      woundProtection: 'molecular',
      necromancy: 'manifestation',
      noMagicRequired: true,
      bloodAbsorption: true
    }
  },
  silberweide: {
    id: 'silberweide',
    name: 'Silberweide',
    rarity: 'Rare',
    categories: ['Medicinal', 'Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'A rare and mystical herb known for its silvery leaves that shimmer under moonlight. The plant is prized by alchemists and healers for its versatility in crafting restorative elixirs and magical rituals. Its roots draw from deep mana veins, providing exceptional vitality. Offers healing capabilities, mana replenishment, and magical enhancement. Blooms once per century during celestial alignments.',
    location: 'Exclusively in secluded, enchanted groves deep within ancient forests',
    manaContent: 20,
    properties: {
      healing: 'exceptional',
      manaReplenishment: true,
      magicalEnhancement: true,
      silveryShimmer: true,
      manaVeins: 'deep',
      centuryBloom: true
    }
  },
  hexenholz: {
    id: 'hexenholz',
    name: 'Hexenholz',
    rarity: 'Rare',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'A rare and highly sought-after herb renowned for its potent magical properties. It manifests as a gnarled, dark wood with vibrant green veins and produces a faint nocturnal glow. Enhances mana manipulation efficiency, improves spellcasting abilities, boosts alchemy effectiveness, and is valuable for transmutation and enchantment rituals. Attracts nocturnal predators and is dangerous to harvest—has claimed entire expeditions.',
    location: 'Ancient forests, typically in protected areas guarded by mystical creatures',
    manaContent: 22,
    properties: {
      manaEnhancement: 'potent',
      spellcasting: 'improved',
      alchemyBoost: true,
      transmutation: true,
      enchantment: true,
      nocturnalGlow: true,
      dangerous: 'expeditionClaimer'
    }
  },
  sternenfeuerkraut: {
    id: 'sternenfeuerkraut',
    name: 'Sternenfeuerkraut',
    rarity: 'Rare',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'This rare herb displays distinctive features: ethereal blue light, resembling tiny stars scattered among its leaves combined with delicate and fiery red petals. The dual coloration—celestial glow with flame-like appearance—inspires its name. Glows faintly with blue light and blooms under full moon conditions, absorbing lunar energy. Provides wound mending, poison curing, vitality restoration, and miraculous healing feats. Discovered by ancient elven druids for sacred rituals. Improper use can lead to severe side effects.',
    location: 'Found exclusively in the most secluded and magical parts of ancient forests',
    manaContent: 25,
    properties: {
      celestial: true,
      woundMending: true,
      poisonCure: true,
      vitalityRestoration: true,
      blueGlow: true,
      fullMoonBlooming: true,
      lunarEnergy: 'absorption',
      valuedMoreThanGold: true
    }
  },

  // ========== VERY RARE HERBS ==========
  flachlandische_grunwiesel: {
    id: 'flachlandische_grunwiesel',
    name: 'Flachländische Grünwiesel',
    rarity: 'Very Rare',
    categories: ['Culinary', 'Brewing/Crafting'],
    description: 'A very rare and difficult to grow seasonal wheat found only in the northern regions of Tundra. The plant thrives in specific conditions: temperatures between 19-24 degrees and very wet (but not flooded) surroundings, making spring its most common growing season. Prized as an excellent spice for beef and salad dishes. When dried and crushed, enhances color perception and environmental appreciation. In combat, grants Perception +3 but Dexterity -3, increasing battle awareness while making user more careless. Mixed with Blaubergische Hammelblume and Sträters Wurzel creates the legendary "Alven\'ula" (wind of senses) - ancient elven combat herb blend.',
    location: 'Northern regions of Tundra',
    manaContent: 30,
    properties: {
      seasonal: 'spring',
      culinarySpice: 'excellent',
      perceptionEnhancement: true,
      combatPerception: 3,
      combatDexterity: -3,
      legendaryBlend: 'Alvenula',
      growthDifficulty: 'very-high'
    }
  },
  blaubergische_hammelblume: {
    id: 'blaubergische_hammelblume',
    name: 'Blaubergische Hammelblume',
    rarity: 'Very Rare',
    categories: ['Medicinal', 'Brewing/Crafting', 'Ritual/Cultural'],
    description: 'A very rare perennial herb featuring distinctive deep blue-violet petals that spiral outward from a silvery center. Originates from high alpine regions of the dwarven Mountains. Only flowers during full moons when mountain rams graze nearby; their hooves activate dormant mana particles in soil. Stabilizes temporal ley line fluctuations, provides enhanced time perception, and grants brief glimpses of past/future events. As tea, increases natural mana regeneration by ~30%. Treats insomnia, anxiety, and exhaustion. Must be gathered during third hour after midnight on full moon nights using silver shears while reciting specific incantations. Controlled by Crimson Syndicate on black market; ARTEC monitors due to temporal manipulation potential.',
    location: 'High alpine regions of the dwarven Mountains',
    manaContent: 35,
    properties: {
      temporal: 'stabilization',
      timePerception: 'enhanced',
      prophecy: 'glimpses',
      manaRegeneration: 0.3,
      fullMoonBlooming: true,
      ramActivation: true,
      crimsonSyndicateControlled: true,
      temporalRisk: true
    }
  },
  straters_wurzel: {
    id: 'straters_wurzel',
    name: 'Sträters Wurzel',
    rarity: 'Very Rare',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'A rare tuberous root with a distinctive crimson interior found in shaded forest glens near minor ley line convergences. The plant has small, heart-shaped leaves and flowers that emit faint luminescence during full moons. The root naturally absorbs and stores mana from nearby ley lines, particularly vitality and passion-related magical energy with a ruby-hued mana signature. Enhances physical abilities, emotional intensity, and has aphrodisiac properties. Acts as stabilizing agent for physical capability potions and prevents mana burnout. Collection during waning moon using silver tools; offerings required for future growth.',
    location: 'Shaded forest glens near minor ley line convergences',
    manaContent: 40,
    properties: {
      leyLineAbsorption: true,
      passionEnergy: 'ruby-hued',
      physicalEnhancement: true,
      emotionalIntensity: true,
      aphrodisiac: true,
      manaBurnoutPrevention: true,
      fullMoonLuminescence: true
    }
  },
  drachenmelisse: {
    id: 'drachenmelisse',
    name: 'Drachenmelisse',
    rarity: 'Very Rare',
    categories: ['Medicinal', 'Culinary', 'Magical', 'Brewing/Crafting'],
    description: 'An exceptionally scarce herb distinguished by vibrant crimson leaves and faintly glowing edges. The plant combines a sharp minty bite with an underlying warmth that tingles on the tongue. Accelerates healing when brewed as tea or made into paste, restores depleted mana reserves, and grants temporary fire resistance.',
    location: 'Grows exclusively in remote, dangerous locations, particularly near dragon nests or ancient battlefields imbued with residual mana',
    manaContent: 50,
    properties: {
      healingAcceleration: true,
      manaRestoration: true,
      fireResistance: 'temporary',
      crimsonGlow: true,
      mintyWarmth: true,
      dragonAssociated: true
    }
  },
  geisterzunge: {
    id: 'geisterzunge',
    name: 'Geisterzunge',
    rarity: 'Very Rare',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'A magical herb with ghostly purple-ish leaves that resemble mushrooms and shimmer under moonlight. Features delicate, translucent petals resembling a tongue and emits a faint, ethereal glow visible in darkness. Only grows on the corpses of dead demons in areas with residual dark energies. Enhances mana reserves significantly, grants temporary immunity to certain dark magic types, and contains corrosive acidic compound that breaks down and reconfigures molecular structures. Essential for transformation potions and physical form alteration. In legendary uses, enables spirit communication and glimpses into nether realms. Perilous to obtain due to dangerous locations and lingering dark magical energies.',
    location: 'Only grows on corpses of dead demons in areas with residual dark energies',
    manaContent: 45,
    properties: {
      manaReserves: 'significant',
      darkMagicImmunity: 'temporary',
      molecularTransformation: true,
      spiritCommunication: 'legendary',
      netherRealms: 'glimpses',
      demonAssociated: true,
      corrosiveAcid: true,
      etherealGlow: true
    }
  },
  flussperlminze: {
    id: 'flussperlminze',
    name: 'Flussperlminze',
    rarity: 'Very Rare',
    categories: ['Culinary', 'Brewing/Crafting'],
    description: 'Known for its shimmering leaves that resemble tiny pearls, grows exclusively along the banks of enchanted rivers. The herb features a minty aroma with subtle sweet notes, making it a valued ingredient in both culinary and potion-brewing applications. Enhances magical properties (Enchantment school) and boosts vitality when consumed (Life school).',
    location: 'Exclusively along enchanted river banks',
    manaContent: 35,
    properties: {
      enchantmentMagic: 'enhancement',
      lifeMagic: 'vitalityBoost',
      pearlShimmer: true,
      mintySweet: true,
      aquatic: true
    }
  },
  schattenmondblute: {
    id: 'schattenmondblute',
    name: 'Schattenmondblüte',
    rarity: 'Very Rare',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'An exceptionally rare herb that blooms only during specific lunar alignments when shadows cast by moonlight intersect with dormant Ley Lines. The plant appears as a midnight-blue flower with silver-edged petals that seem to absorb rather than reflect light, creating an ethereal, dimensional quality. Blossoms dissolve into mist by dawn. Enables perception of multiple timelines simultaneously, brief movement between moments in time, and enhances manipulation of light/darkness and reality/illusion boundaries. Sacred to Aurora. Used in Tierfolk coming-of-age ceremonies for ancestral spirit communion. Commands prices equivalent to a noble\'s annual income.',
    location: 'Exclusively in areas with concentrated Shadow Mana, particularly in ancient forests and ruins where significant temporal disturbances have occurred',
    manaContent: 48,
    properties: {
      timelinePerception: 'multiple',
      temporalMovement: 'brief',
      lightDarknessManipulation: true,
      realityIllusionBoundary: true,
      lightAbsorption: true,
      dawnDissolution: true,
      auroraConnection: 'sacred',
      nobleIncome: 'equivalent'
    }
  },

  // ========== LEGENDARY/MYTHICAL HERBS ==========
  mondfarn: {
    id: 'mondfarn',
    name: 'Mondfarn',
    rarity: 'Legendary',
    categories: ['Magical', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'A rare and mystical herb featuring silvery-blue fronds that absorb temporal mana, creating a subtle luminescence that follows lunar cycles. Grows exclusively at ley line nexus points during specific lunar phases. Highest mana concentration when harvested during full moons. Cornerstone catalyst for Weather Magic, enhancing connection to atmospheric manipulation. Used in ritual incense for Aurora communion. Smoke patterns interpreted for future guidance. Timemist Tea enables perception of past/future echoes. Enables novices to sense atmospheric mana currents and acts as external mana source for weather mages. Strictly regulated by weather mage guilds. Improper harvesting disrupts local ley line flows and causes unpredictable weather phenomena.',
    location: 'Exclusively at ley line nexus points during specific lunar phases',
    manaContent: 80,
    properties: {
      weatherMagic: 'cornerstone',
      temporalMana: 'absorption',
      lunarLuminescence: true,
      atmosphericManipulation: true,
      prophecy: 'smokePatterns',
      timePerception: 'echoes',
      weatherMageSource: true,
      weatherPhenomena: 'risk'
    },
    manaLevelRequired: 3
  },
  ewiggrün: {
    id: 'ewiggrün',
    name: 'Ewiggrün',
    rarity: 'Legendary',
    categories: ['Medicinal', 'Magical', 'Brewing/Crafting'],
    description: 'A rare and mystical herb with the distinctive property of never wilting or decaying. Its leaves maintain a vibrant emerald green appearance, appearing perpetually fresh. The plant\'s origins remain mysterious, with no recorded history of cultivation or harvesting. Legend suggests it may be a divine gift to protect sacred lands and possesses an almost sentient quality, remaining hidden from those who seek it greedily. Enhances longevity and vitality when used in potions and rituals. Reveals itself selectively to pure-hearted seekers.',
    location: 'Grows in sacred and isolated areas: ancient groves, secluded forest glades untouched by civilization, forgotten altars dedicated to old deities',
    manaContent: 100,
    properties: {
      neverWilts: true,
      perpetualFreshness: true,
      longevity: 'enhancement',
      vitality: 'enhancement',
      sentientQuality: true,
      divineGift: 'legend',
      selectiveRevelation: true
    },
    manaLevelRequired: 3
  },
  bernsteinthymian: {
    id: 'bernsteinthymian',
    name: 'Bernsteinthymian',
    rarity: 'Legendary',
    categories: ['Culinary', 'Brewing/Crafting'],
    description: 'A rare mythical herb belonging to the Illusion School of Magic with amber-hued leaves that shimmer gold under moonlight. Grows in small clusters with spiraling stems reaching approximately six inches tall and emits a faint, ever-changing aroma that shifts according to the observer\'s recent memories. Manipulates taste perception through illusion magic: makes poison taste sweet, bitter medicine palatable, and simple food taste elaborate. Absorbs concentrated mana from Ley Lines. Effects last several hours and can cause "taste echoing" in mana-sensitive individuals. Notoriously difficult to cultivate. Regulated by royal decree; legitimate herbalists must register and maintain detailed sales records. According to legend, Aurora planted the first seeds along Ley Lines to help healers administer unpalatable remedies. Used by assassins, poisoners, and the Crimson Syndicate.',
    location: 'Naturally grows only where Ley Lines intersect with water sources; specialized magical greenhouses maintained by the Arcane Botanical Society',
    manaContent: 75,
    properties: {
      illusionMagic: 'taste',
      tasteManipulation: true,
      memoryAroma: true,
      leyLineAbsorption: true,
      moonlightShimmer: true,
      tasteEchoing: 'risk',
      royalRegulation: true,
      auroraLegend: true,
      crimsonSyndicateUsed: true
    },
    manaLevelRequired: 3
  },
  drachenauge: {
    id: 'drachenauge',
    name: 'Drachenauge',
    rarity: 'Legendary',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'Characterized by vibrant crimson petals that shimmer with an ethereal glow, reminiscent of dragon scales. The flower features a luminescent core believed to pulse with magical energy. Found exclusively in remote, treacherous regions of the world and is considered a priceless treasure. Increases mana reserves and amplifies spellcasting abilities exponentially. Protected by nature spirits; grows in areas with ancient dragons or formidable creatures.',
    location: 'Exclusively in remote, treacherous regions; protected areas inhabited by ancient dragons or formidable creatures',
    manaContent: 120,
    properties: {
      manaReserves: 'exponential',
      spellcastingAmplification: 'exponential',
      dragonScaleAppearance: true,
      luminousCore: true,
      pricelessTreasure: true,
      dragonProtected: true
    },
    manaLevelRequired: 4
  },

  // ========== DIVINE HERBS ==========
  runenwurz: {
    id: 'runenwurz',
    name: 'Runenwurz',
    rarity: 'Legendary',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'A rare divine herb that grows exclusively along temporal ley lines where life magic flows abundantly. Features luminescent blue-green leaves that pulse rhythmically and roots naturally forming runic patterns. Draws power directly from life magic with mana concentrated in cellular structures resembling miniature ley line networks. Temporarily enhances mana capacity, restores vitality, amplifies sensory experiences and emotional states. Enhances potency of healing runes and longevity of enhancement runes. Creates time dilation sensations when consumed raw, valuable for time-sensitive spellwork. Responds to Soul Color of caretakers with life magic affinity. Requires mana-conductive tools for harvesting; ordinary metal causes rapid power loss. Heavily controlled; unauthorized possession carries severe penalties. ARTEC maintains specialized units preventing illegal trade. Originally gifted to mortals by Aurora herself according to ancient texts.',
    location: 'Exclusively along temporal ley lines where life magic flows abundantly',
    manaContent: 150,
    properties: {
      lifeMagic: 'direct',
      temporalLeyLines: true,
      runicPatterns: 'natural',
      manaCapacity: 'enhancement',
      sensoryAmplification: true,
      timeDilation: 'consumption',
      runeEnhancement: true,
      soulColorResponse: true,
      auroraGift: 'legend',
      artecControlled: true
    },
    manaLevelRequired: 4
  },
  phonixfederkraut: {
    id: 'phonixfederkraut',
    name: 'Phönixfederkraut',
    rarity: 'Legendary',
    categories: ['Medicinal', 'Culinary', 'Ritual/Cultural', 'Brewing/Crafting'],
    description: 'A rare and mystical herb displaying ethereal qualities. Features delicate and feather-like leaves with iridescent hues of red, orange, and gold, emitting a soft golden glow. The sensory experience includes a warm scent reminiscent of fresh rain mixed with the subtle aroma of burning incense, and creates a unique tactile sensation when touched. Has a very hot taste and creates cool and warm sensations simultaneously with an invigorating effect. Associated with fire elements and fire deities.',
    location: 'Grows in secluded mountainous regions where the air is thin and pure, typically near ancient ruins or sacred sites associated with fire deities; inhabits rocky crevices and hidden groves',
    manaContent: 200,
    properties: {
      phoenixFire: true,
      iridescentGlow: true,
      dualSensation: 'cool-warm',
      invigorating: true,
      veryHot: true,
      featherDelicate: true,
      fireDeityAssociated: true,
      goldenGlow: true
    },
    manaLevelRequired: 4
  },
  gotterbalsam: {
    id: 'gotterbalsam',
    name: 'Götterbalsam',
    rarity: 'Legendary',
    categories: ['Medicinal'],
    description: 'An extraordinarily rare botanical phenomenon manifesting as a luminescent, silver-blue sap that crystallizes into delicate, frost-like patterns on the bark of ordinary trees. Unlike conventional plants, it appears exclusively at nexus points where reality has been altered by divine intervention or profound magical events—locations where miracles have occurred. Forms through convergence of Temporal Mana and Life magic rather than biological processes. Heals fatal wounds, restores lost limbs, cures incurable diseases, temporarily halts aging, and can anchor souls to bodies. Unparalleled potion potency. Appears during specific celestial alignments and remains viable for just hours before dissolving into pure mana. Cannot be artificially synthesized. Worth more than its weight in gold; a single vial could purchase a small kingdom. Requires tools carved from iron-untouched wood and incantations from Divine and Life magic schools. Powerful potions carry metaphysical costs including vivid visions of alternate timelines or temporary temporal sensitivity. Religious institutions claim ownership as evidence of divine favor.',
    location: 'Exclusively at nexus points where reality has been altered by divine intervention or profound magical events; locations where miracles have occurred',
    manaContent: 180,
    properties: {
      fatalWoundHealing: true,
      limbRestoration: true,
      diseasesCure: 'incurable',
      agingHalt: 'temporary',
      soulAnchoring: true,
      luminousBlue: true,
      frostPatterns: true,
      temporalLifeMagic: 'convergence',
      celestialAlignment: 'required',
      hourViability: true,
      kingdomWorth: true,
      metaphysicalCosts: true,
      divineIntervention: 'required'
    },
    manaLevelRequired: 4
  },

  // ===== ADDITIONAL HERBS FOR NEW POTIONS =====
  eisblume: {
    id: 'eisblume',
    name: 'Eisblume',
    rarity: 'Uncommon',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'A crystalline flower formed from eternal ice, cold to the touch.',
    location: 'Ice deserts, frozen mountain peaks',
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
    description: 'A delicate, translucent fern with intricate fractal patterns that naturally form small ice crystals along its edges. The crystalline structures contain concentrated frost mana that maintains its frozen state regardless of environmental temperature. Glows soft blue during winter solstice and pulsates in rhythm with Ley Lines. Master brewers create Frostmead from it, a beverage that temporarily enhances frost magic connection and provides cold resistance. Incorporated into Mana-Tech devices as a natural conduit for frost-aligned spells, particularly in cooling systems and preservation chambers. Produces temporal stabilization compounds that slow organic material degradation.',
    location: 'Native to the frigid northern regions of the Kingdom of the White Dragon. Grows exclusively along frost-aligned Ley Lines where mana flow is potent',
    manaContent: 5,
    properties: {
      frostMana: 'concentrated',
      crystalline: true,
      temperatureIndependent: true,
      winterSolsticeGlow: true,
      leyLinePulsation: true,
      frostMagicEnhancement: true,
      temporalStabilization: true,
      coldResistance: true
    }
  },
  blitzgras: {
    id: 'blitzgras',
    name: 'Blitzgras',
    rarity: 'Uncommon',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Grass blades that are statically charged and emit small sparks.',
    location: 'Storm plains, high plateaus',
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
    description: 'A rare, luminescent herb that grows exclusively along Temporal Ley Lines, particularly where these lines intersect with weather-influencing Nexus Points. Manifests as a silvery-blue fern featuring delicate crystalline formations along stems and leaves that shimmer and pulse in rhythm with approaching storms. Absorbs atmospheric mana particles. Primary ingredient in weather-manipulation potions. When infused into metals during runecarving, creates weather-sensitive enchantments. Creates "Storm Essence" amplifying weather magic spells tenfold. Regulates internal mana flow, treats mana depletion and burnout, stabilizes erratic Soul Colors. Aged specimens develop chronomantic properties, allowing practitioners to glimpse past or future weather patterns.',
    location: 'Grows exclusively along Temporal Ley Lines at intersections with weather-influencing Nexus Points',
    manaContent: 8,
    properties: {
      luminescent: true,
      temporalLeyLines: true,
      weatherNexusPoints: true,
      stormPulsation: true,
      atmosphericManaAbsorption: true,
      weatherManipulation: true,
      manaFlowRegulation: true,
      chronomantic: 'aged',
      weatherProphecy: true
    }
  },
  bitterlaub: {
    id: 'bitterlaub',
    name: 'Bitterlaub',
    rarity: 'Common',
    categories: ['Medicinal', 'Brewing/Crafting'],
    description: 'A distinctive herb with silver-veined leaves that grow in clusters near Ley Line nexus points. Features deep blue-green foliage and a bitter aroma that intensifies when dried. Has dual nature: beneficial when harvested during waxing moon and dried in shade for exactly thirteen days; toxic when harvested during waning moon or dried in direct sunlight. Enhances flavors and preserves food in stews, meats, and specialty breads. Essential ingredient in Dwarven Stoneheart Ale believed to grant courage and stamina. Dried leaves in healing tonics combined with manaparticles create remedies that accelerate natural recovery processes. Improperly prepared, causes symptoms from mild discomfort to paralysis and death. Embodies duality symbolizing balance between life and death.',
    location: 'Grows in clusters near Ley Line nexus points at magical energy convergence points',
    manaContent: 0,
    properties: {
      silverVeined: true,
      leyLineGrowth: true,
      dualNature: true,
      culinaryEnhancement: true,
      foodPreservation: true,
      healingAcceleration: true,
      toxicWhenImproper: true,
      duality: 'lifeAndDeath',
      regulated: true
    }
  },
  wolkenkraut: {
    id: 'wolkenkraut',
    name: 'Wolkenkraut',
    rarity: 'Rare',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'A feather-light herb that floats in the air.',
    location: 'High mountains, floating islands',
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
    description: 'A rare aquatic herb featuring iridescent blue-violet petals that seem to shift phases like the moon. Grows exclusively along ley lines where water intersects with concentrated temporal mana areas. Has a fibrous stem capable of absorbing and storing mana particles. Powerful transmutation magic catalyst that can temporarily alter substance properties when brewed into potions or tinctures. Effects include making rigid materials flexible, enhancing emotional connections, and slightly manipulating time perception. Runecarvers infuse extracted essence into inks for enhanced transmutation rune potency. White Dragons Kingdom traditionally gifts it to newlyweds as blessing ritual symbolizing life transformation. Optimal harvesting occurs during the full moon and dried in moonlight to maximize potency.',
    location: 'Grows exclusively along ley lines where water intersects with concentrated temporal mana areas',
    manaContent: 5,
    properties: {
      iridescentPetals: true,
      moonPhaseShifting: true,
      leyLineGrowth: true,
      temporalMana: true,
      manaStorage: true,
      transmutationCatalyst: 'powerful',
      propertyAlteration: true,
      timePerceptionManipulation: 'slight',
      ceremonialSignificance: true
    }
  },
  seealge: {
    id: 'seealge',
    name: 'Seealge',
    rarity: 'Common',
    categories: ['Culinary', 'Brewing/Crafting'],
    description: 'A rare aquatic herb with shimmering blue-green plant with translucent, undulating fronds that seem to exist partially between states of matter. Grows exclusively where freshwater and saltwater converge. Exists simultaneously in multiple temporal states (past, present, potential future). Properties shift with tidal cycles. Absorbs Change Magic mana particles. Highly valued for stabilizing volatile magical reactions. Dried/crushed has savory umami quality; fresh has sweet, refreshing taste. Meals containing Seealge adapt their flavor to complement individual diner palate preferences. Treats imbalance and transition-related conditions, eases aging symptoms, stabilizes fluctuating health conditions, effective for temporal displacement sickness. Facilitates transformation spells and remedies for major life adaptations.',
    location: 'Grows exclusively where freshwater and saltwater converge',
    manaContent: 0,
    properties: {
      shimmeringBlueGreen: true,
      betweenStates: true,
      multipleTemporalStates: true,
      tidalShifting: true,
      changeMagic: true,
      volatileStabilization: true,
      flavorAdaptation: true,
      transitionTreatment: true,
      temporalDisplacement: 'treatment',
      transformationFacilitation: true
    }
  },
  nachtschatten: {
    id: 'nachtschatten',
    name: 'Nachtschatten',
    rarity: 'Common',
    categories: ['Magical', 'Brewing/Crafting'],
    description: 'Distinctive purple-black leaves that naturally absorb ambient mana, particularly from shadow energies. When harvested under moonlight, its shadow-absorbing properties are enhanced. Has bittersweet flavor with mild euphoric effects. Powerful analgesic and sedative brewed into teas or tinctures to treat chronic pain, insomnia, and anxiety without clouding mental faculties. Catalyst for Shadow Magic enabling darkness manipulation and illusion creation. Allows temporary passage between shadows. Ground with mana particles creates paste for runecarving that enhances stealth and concealment enchantments. Creates dyes producing fabrics that seem to shift and move in low light. Excessive consumption causes hallucinations with independently moving shadows. Prolonged raw exposure temporarily strengthens shadow realm connection.',
    location: 'Shaded areas, forest undergrowth, and ley line intersections with higher mana concentrations',
    manaContent: 8,
    properties: {
      purpleBlackLeaves: true,
      manaAbsorption: 'ambient',
      shadowEnergy: 'absorption',
      moonlightEnhancement: true,
      analgesic: 'powerful',
      sedative: true,
      shadowMagicCatalyst: true,
      darknessManipulation: true,
      shadowPassage: 'temporary',
      stealthEnchantment: true,
      hallucinogenicRisk: true
    }
  },
  silberzunge: {
    id: 'silberzunge',
    name: 'Silberzunge',
    rarity: 'Uncommon',
    categories: ['Magical', 'Ritual/Cultural'],
    description: 'A tongue-shaped leaf that facilitates communication.',
    location: 'Trading cities, diplomacy gardens',
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
    description: 'Heart-shaped red leaves that awaken affection.',
    location: 'Romantic gardens, love shrines',
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
    description: 'A grayish-green lichen that grows abundantly on rocks and stone structures throughout the realm, with particular prevalence where magical ley lines intersect natural stone formations. Available year-round with minimal cultivation requirements. Full moon gathering yields strongest transmutative effects. Poultices extract toxins from the body. Dried tea preparations alleviate respiratory ailments and enhance circulation. Young specimens impart distinctive earthy flavor to stews and broths. Aged varieties develop peppery characteristics. Incorporated into Dwarven stone ales for reported mental clarity and physical fortitude. Transmutation magic foundation component that can temporarily alter object properties when properly prepared. Can transform brittle materials into flexible substances and render porous materials waterproof. Followers of Thoth particularly value it for rituals symbolizing intellectual transformation and personal growth.',
    location: 'Grows abundantly on rocks and stone structures throughout the realm, with particular prevalence where magical ley lines intersect natural stone formations',
    manaContent: 0,
    properties: {
      grayishGreen: true,
      leyLineIntersections: true,
      yearRoundAvailability: true,
      lunarPhaseVariation: true,
      toxinExtraction: true,
      respiratoryTreatment: true,
      circulationEnhancement: true,
      transmutationFoundation: true,
      materialTransformation: true,
      intellectualTransformation: 'symbolic'
    }
  },
  waldbeere: {
    id: 'waldbeere',
    name: 'Waldbeere',
    rarity: 'Common',
    categories: ['Culinary', 'Medicinal'],
    description: 'Sweet berries from the forest, popular among animals.',
    location: 'Forests, clearings',
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
