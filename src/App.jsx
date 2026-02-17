import { useState, useEffect } from 'react'
import './App.css'
import IngredientsLibrary from './components/IngredientsLibrary'
import RecipeManager from './components/RecipeManager'
import BrewingStation from './components/BrewingStation'
import Inventory from './components/Inventory'
import RecipeTree from './components/RecipeTree'
import HerbsLibrary from './components/HerbsLibrary'
import { loadData, saveData } from './utils/storage'

function App() {
  const [activeTab, setActiveTab] = useState('recipe-tree')
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [inventory, setInventory] = useState({ ingredients: {}, potions: [] })

  useEffect(() => {
    const data = loadData()
    if (data.ingredients) setIngredients(data.ingredients)
    if (data.recipes) setRecipes(data.recipes)
    if (data.inventory) setInventory(data.inventory)
  }, [])

  useEffect(() => {
    saveData({ ingredients, recipes, inventory })
  }, [ingredients, recipes, inventory])

  const tabs = [
    { id: 'recipe-tree', label: 'Potion Compendium', component: RecipeTree },
    { id: 'herbs', label: 'Herbs Compendium', component: HerbsLibrary },
    { id: 'brewing', label: 'Brewing', component: BrewingStation },
    { id: 'inventory', label: 'Inventory', component: Inventory },
    { id: 'recipes', label: 'Custom Recipes', component: RecipeManager },
    { id: 'ingredients', label: 'Ingredients', component: IngredientsLibrary },
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component

  return (
    <div className="app">
      <header className="app-header">
        <h1>D&D 5e Alchemy Table</h1>
        <p>Homebrew Potion Crafting</p>
      </header>

      <nav className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-content">
        {ActiveComponent && (
          <ActiveComponent
            ingredients={ingredients}
            setIngredients={setIngredients}
            recipes={recipes}
            setRecipes={setRecipes}
            inventory={inventory}
            setInventory={setInventory}
          />
        )}
      </main>
    </div>
  )
}

export default App
