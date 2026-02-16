import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the recipe tree file
const filePath = path.join(__dirname, 'src', 'data', 'aetherialRecipeTree.js');
let content = fs.readFileSync(filePath, 'utf8');

// Map of all color variants to RED
const colorMappings = [
  { from: 'BLUE', to: 'RED' },
  { from: 'ORANGE', to: 'RED' },
  { from: 'LIME', to: 'RED' },
  { from: 'YELLOW', to: 'RED' },
  { from: 'GREEN', to: 'RED' },
  { from: 'TURQUOISE', to: 'RED' },
  { from: 'CYAN', to: 'RED' },
  { from: 'PURPLE', to: 'RED' },
  { from: 'PINK', to: 'RED' },
  { from: 'GOLD', to: 'RED' },
  { from: 'BLACK', to: 'RED' },
  { from: 'TEAL', to: 'RED' },
  { from: 'LIME_PURPLE', to: 'RED' },
  { from: 'BROWN_PURPLE', to: 'RED' },
  { from: 'TURQUOISE_GOLD', to: 'RED' },
  { from: 'LIME_BLUE', to: 'RED' },
  { from: 'ORANGE_PURPLE', to: 'RED' },
  { from: 'SILVER', to: 'RED' }
];

// Replace all color variants with RED
colorMappings.forEach(({ from, to }) => {
  const regex = new RegExp(`- ${from} -`, 'g');
  content = content.replace(regex, `- ${to} -`);
});

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ All potion icons updated to RED base images!');
console.log('Now all potions will use hue-rotate for consistent coloring.');
