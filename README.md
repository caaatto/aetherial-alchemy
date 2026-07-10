# Aetherial Alchemy - D&D 5e Potion Crafting System

A web-based alchemy crafting system for D&D 5e campaigns set in the Aetherial world. Features a complete potion brewing system with RPG-style skill trees, 100+ recipes, and 40+ magical herbs.

![Pixel Art Style](https://img.shields.io/badge/style-pixel%20art-8bit?style=for-the-badge)
![D&D 5e](https://img.shields.io/badge/D%26D-5e-red?style=for-the-badge&logo=dungeonsanddragons)
![React](https://img.shields.io/badge/react-18.2-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

## Features

###  Recipe Skill Tree
- **100+ Potions** based on D&D 5e DMG rules
- **Dual View Modes**: List view (tier-based) and Wallpaper view (horizontal flowchart with SVG connection lines)
- **Unlock System**: Spend skill points to unlock recipes with prerequisites
- **Recipe Categories**: Healing, Mana, Resistance, Combat, Stealth, Utility, Social, Transformation
- **Visual Progression**: See upgrade paths from Basic → Greater → Superior → Supreme → Divine
- **Interactive Tree**: Click recipes to view details, requirements, and unlock paths

###  Aetherial Herbs Compendium
- **53 Magical Herbs** from the Aetherial world
- **Searchable Database** with filters by rarity and category
- **Detailed Information**: Properties, mana content, locations, required mana level
- **5 Rarity Tiers**: Common, Uncommon, Rare, Very Rare, Legendary
- **Categories**: Medicinal, Culinary, Magical, Ritual/Cultural, Brewing/Crafting

###  Mana System Integration
- **4 Mana Levels**: Character progression system (Level 1-4)
- **Mana Costs**: Powerful potions consume mana to brew (0-120 mana)
- **Mana Potions**: Restore mana reserves (10-200+ mana)
- **Herb Mana Content**: Some herbs contain magical energy
- **Level Gates**: Legendary potions require Mana Level 3-4

###  D&D 5e Brewing Mechanics
- **d20 + Bonus vs DC**: Classic D&D skill check system (DC 10-26)
- **Critical Success/Failure**: Natural 20s double output, Natural 1s fail
- **Brew Time System**: From 1 hour to 24 hours per potion
- **Recipe Sources**: All potions reference DMG pages or homebrew extensions
- **Difficulty Scaling**: DC increases with potion rarity and power

###  Retro Pixel Art Design
- **8-bit Aesthetic**: Press Start 2P font, pixelated borders, box-shadow 3D effects
- **Dark Fantasy Theme**: Atmospheric color palette with rarity-based color coding
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Animated Elements**: Pulsing unlockable recipes, smooth transitions, hover effects
- **Accessibility**: High contrast, clear typography, keyboard navigation

###  Additional Features
- **Inventory System**: Track crafted potions and collected herbs with quantities
- **LocalStorage Persistence**: Progress automatically saved in browser
- **Import/Export**: Share your inventory and progress with your party
- **Custom Recipes**: Add your own homebrew potions
- **Custom Ingredients**: Extend the herb database with your own creations

##  Roll20 Browser Extension

Bring the alchemy system directly into your [Roll20](https://roll20.net) game: an in-game
sidebar with inventory, brewing rolls, D&D character-sheet sync, and a live party-inventory
dashboard for the GM.

- **Install:** download from the [latest `Roll20-Extension` release](https://github.com/caaatto/aetherial-alchemy/releases):
  `aetherial-roll20.crx` (Linux Chrome, auto-updates) or `aetherial-roll20.zip`
  (Windows/Mac/Edge, "Load unpacked"; an update badge appears when a new version is out).
- **Full setup guide (German):** [SETUP.md](SETUP.md) covers the backend, the GM mod
  script, and per-player installation.

##  Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/aetherial-alchemy.git
cd aetherial-alchemy

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

##  How to Use

### 1. Recipe Tree
- Start with **15 Skill Points** and **Mana Level 1**
- Browse recipes in List View (organized by tier) or Wallpaper View (flowchart with connections)
- Click on recipes to view full details:
  - Required ingredients with herb information
  - Brewing DC and time
  - Mana cost and level requirement
  - Effect description
  - Prerequisites and unlock paths
- **Unlock recipes** by clicking "Unlock" when you meet requirements:
  - Have enough skill points
  - Meet mana level requirement
  - Have unlocked all prerequisite recipes
- **Filter by category** to find specific potion types
- Unlocked recipes are automatically added to your brewing station

### 2. Herbs Compendium
- Browse all 53 Aetherial herbs with detailed information
- **Search** by name to quickly find specific herbs
- **Filter by rarity**: Common, Uncommon, Rare, Very Rare, Legendary
- **Filter by category**: Medicinal, Culinary, Magical, Ritual/Cultural, Brewing/Crafting
- Click on herbs to see:
  - Full description and lore
  - Mana content (if magical)
  - Required mana level to harvest (for rare herbs)
  - All properties (frost affinity, healing, charm effects, etc.)
  - Where to find them in the Aetherial world

### 3. Brewing Station
- Select an unlocked recipe from your collection
- Enter your Alchemy skill bonus (proficiency + INT modifier)
- Roll d20 + your bonus vs the recipe DC
- **Critical Success (Natural 20)**: Double the output!
- **Success**: Normal potion brewed
- **Failure**: Recipe fails, ingredients lost
- **Critical Failure (Natural 1)**: Catastrophic failure
- Brewed potions are added to your inventory

### 4. Inventory Management
- View all crafted potions and collected ingredients
- Track quantities and rarities
- Use potions during gameplay
- Export your inventory as JSON for backups
- Import saved inventories to restore progress
- Share inventories with party members

### 5. Custom Content
- **Recipe Manager**: Create your own homebrew recipes
  - Choose ingredients from the herb database
  - Set custom DC and brew time
  - Define potion effects
- **Ingredients Library**: Add custom herbs
  - Set rarity level
  - Define properties and effects
  - Assign mana content

##  Potion Categories

###  Healing (15+ recipes)
From basic HP restoration to divine resurrection
- **Healing Potion** → **Greater** → **Superior** → **Supreme** → **Divine Healing**
- **Regeneration** potions for HP over time
- **Vitality** and **Elixir of Health** for condition removal
- **Longevity** to reduce biological age

###  Mana (10+ recipes)
Restore and boost magical energy
- **Minor Mana Potion** (10 mana) → **Greater** (40) → **Superior** (100) → **Supreme** (200) → **Mana Overflow**
- **Mana-Sight** to see magical auras
- **Astral Vision** to perceive the astral plane

###  Resistance & Immunity (20+ recipes)
Protection from elemental and physical damage
- **Fire/Cold/Lightning/Poison** Resistance → Immunity
- **Elemental Ward** (all 4 elements) → **Elemental Mastery** (Legendary)
- **Stoneskin** → **Invulnerability** (immunity to all damage!)

###  Strength (7 recipes)
Giant Strength progression
- **Hill Giant** (STR 21) → **Stone** (23) → **Frost** (23) → **Fire** (25) → **Cloud** (27) → **Storm Giant** (STR 29, Legendary!)

### Combat (20+ recipes)
Battle enhancement and tactical advantages
- **Speed** (like Haste spell)
- **Heroism** → **Battle Fury** (enhanced version)
- **Magic Weapon** (+1) → **Enhanced** (+2) → **Oil of Sharpness** (+3) → **Vorpal Edge** (Legendary decapitation!)

###  Stealth & Illusion (15+ recipes)
Invisibility and deception
- **Invisibility** → **Greater Invisibility**
- **Shadow Step** (teleport through shadows)
- **Gaseous Form** → **Dust Form** (microscopic + invisible)
- **Mirror Image** → **Greater Mirror Image**
- **Blur** → **Displacement**

###  Utility & Transformation (25+ recipes)
Exploration, mobility, and shapeshifting
- **Flying**, **Levitation**, **Water Breathing** → **Aquatic Mastery**
- **Animal Friendship** → **Beast Speech** → **Animal Shape** → **Polymorph**
- **Growth** (enlarge) → **Giant Form**
- **Diminution** (shrink)
- **Darkvision** → **Truesight**
- **Clairvoyance** → **Scrying**

###  Social & Mind (10+ recipes)
Influence and communication
- **Comprehend Languages** → **Tongues**
- **Charm** → **Dominate Mind**
- **Mind Reading**
- **Bless** → **Divine Favor**

### Special & Legendary (10+ recipes)
Reality-bending and ultimate power
- **Time Slow** → **Time Stop** (Legendary)
- **Dragon Transformation** (become a dragon!)
- **Etherealness** (phase into ethereal plane)
- **Fortune's Favor** (advantage on all rolls)
- **Luck** (roll 2 dice, choose result)

##  Sample Recipes

### Basic Tier (Common/Uncommon)
**Potion of Healing**
- Effect: Restores 2d4+2 HP
- DC: 10 | Brew Time: 1 hour | Mana: 0
- Ingredients: Wolfsfarn (2), Eisenkraut (1)
- Source: DMG p.187

**Fire Resistance**
- Effect: Resistance to fire damage for 1 hour
- DC: 13 | Brew Time: 3 hours | Mana: 0
- Ingredients: Feuerblüte (3), Glutwurz (2)
- Source: DMG p.188

### Advanced Tier (Rare)
**Invisibility**
- Effect: Invisibility for 1 hour
- DC: 16 | Brew Time: 6 hours | Mana: 25
- Ingredients: Schattenkraut (4), Todeswurz (2), Hexenholz (1)
- Requires: Mana Level 2
- Source: DMG p.188

**Fire Giant Strength**
- Effect: Strength becomes 25 for 1 hour
- DC: 17 | Brew Time: 8 hours | Mana: 25
- Ingredients: Eisenkraut (6), Feuerblüte (5), Drachenmelisse (3)
- Requires: Unlock Hill/Stone/Frost Giant Strength first
- Source: DMG p.187

### Legendary Tier (Legendary)
**Time Stop**
- Effect: Stop time for 1d4+1 rounds (only you can act)
- DC: 26 | Brew Time: 24 hours | Mana: 120
- Ingredients: Runenwurz (10), Mondfarn (8), Götterbalsam (5), Phönixfederkraut (4)
- Requires: Mana Level 4, Time Slow unlocked
- Source: DMG p.189

**Divine Healing**
- Effect: Full HP restoration + remove all conditions + resurrection if dead < 1 min
- DC: 25 | Brew Time: 20 hours | Mana: 90
- Ingredients: Phönixfederkraut (5), Götterbalsam (3), Ewiggrün (4), Runenwurz (2)
- Requires: Mana Level 4, Supreme Healing unlocked
- Source: Homebrew

## Tech Stack

- **React 18.2**: Modern component-based UI with hooks
- **Vite 5.0**: Lightning-fast build tool and dev server with HMR
- **LocalStorage API**: Client-side persistence without backend
- **Press Start 2P Font**: Authentic pixel art typography from Google Fonts
- **Pure CSS**: Custom pixel art design system, no framework dependencies
- **SVG**: Dynamic connection lines in Wallpaper tree view

## Aetherial World

This system is designed for campaigns in the **Aetherial world**, featuring:
- **Unique magical herbs** with mana properties and elemental affinities
- **4-tier Mana Level** progression system (1-4)
- Integration with Aetherial lore and locations
- Custom herb properties: lunar power, frost affinity, divine healing, storm magic
- **53 herbs total** across all rarity tiers

### Herb Rarity Breakdown
- **Common (21)**: Basic herbs available in most regions
- **Uncommon (13)**: Herbs requiring specific biomes or conditions
- **Rare (6)**: Difficult to find, often in dangerous locations
- **Very Rare (7)**: Extremely scarce, legendary locations only
- **Legendary (6)**: Mythical herbs with immense power

Based on the [Aetherial Wiki](https://aetherial.fandom.com/wiki/Aetherial_Wiki)

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Credits

- **D&D 5e Rules**: Based on Dungeon Master's Guide (DMG) potion rules
- **Aetherial Herbs**: Inspired by the Aetherial campaign setting
- **Pixel Art Font**: Press Start 2P by CodeMan38
- **Potion Pixel Art**: Pixel Potion Pack by [Creator Name] - 150 unique potion sprites
- **Open Source**: Built for the D&D community

##  Contributing

Contributions are welcome! Feel free to:
- Star the repository
- Report bugs via Issues
- Suggest new features or potions
- Add new herbs to the database
- Improve UI/UX design
- Improve documentation
- Translate to other languages
- Submit Pull Requests

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-potion`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing potion'`)
6. Push to your fork (`git push origin feature/amazing-potion`)
7. Open a Pull Request

##  Roadmap

- [ ] Multiplayer/party inventory sharing via WebSockets
- [ ] DM mode with advanced campaign management
- [ ] Bulk recipe import from JSON
- [ ] Additional D&D 5e spell-based potions
- [ ] Progressive Web App (PWA) support
- [ ] Mobile app (React Native)
- [ ] Print-friendly recipe cards
- [ ] Character sheet integration
- [x] Roll20 browser extension (see [Roll20 Browser Extension](#-roll20-browser-extension))
- [ ] Foundry VTT plugin
- [ ] AI-powered custom recipe generator

##  Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/YOUR_USERNAME/aetherial-alchemy/issues)
- **Discussions**: Share ideas in [GitHub Discussions](https://github.com/YOUR_USERNAME/aetherial-alchemy/discussions)
- **Wiki**: Check the project wiki for guides and tips

##  Project Stats

- **100+ Recipes**: Complete D&D 5e potion collection + homebrew
- **53 Herbs**: Full Aetherial herb database
- **8 Categories**: Healing, Mana, Resistance, Combat, Stealth, Utility, Social, Transformation
- **5 Rarity Tiers**: Common to Legendary progression
- **4 Mana Levels**: Character power progression

---

**Made with for D&D 5e players and Dungeon Masters**

*Happy Brewing!* 
