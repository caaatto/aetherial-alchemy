import { useState, useRef } from 'react'
import './Inventory.css'
import { exportData, importData } from '../utils/storage'

function Inventory({ ingredients, inventory, setInventory }) {
  const [showAddIngredient, setShowAddIngredient] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState('')
  const [amount, setAmount] = useState(1)
  const fileInputRef = useRef(null)

  const getIngredientName = (ingredientId) => {
    return ingredients.find(ing => ing.id === ingredientId)?.name || 'Unbekannt'
  }

  const getIngredientDetails = (ingredientId) => {
    return ingredients.find(ing => ing.id === ingredientId)
  }

  const handleAddIngredient = () => {
    if (!selectedIngredient || amount <= 0) return

    const newIngredients = { ...inventory.ingredients }
    newIngredients[selectedIngredient] = (newIngredients[selectedIngredient] || 0) + amount

    setInventory({
      ...inventory,
      ingredients: newIngredients
    })

    setSelectedIngredient('')
    setAmount(1)
    setShowAddIngredient(false)
  }

  const handleRemoveIngredient = (ingredientId, removeAmount) => {
    const newIngredients = { ...inventory.ingredients }

    if (newIngredients[ingredientId]) {
      newIngredients[ingredientId] -= removeAmount
      if (newIngredients[ingredientId] <= 0) {
        delete newIngredients[ingredientId]
      }
    }

    setInventory({
      ...inventory,
      ingredients: newIngredients
    })
  }

  const handleUsePotion = (potionId) => {
    if (confirm('Diesen Trank verwenden?')) {
      setInventory({
        ...inventory,
        potions: inventory.potions.filter(p => p.id !== potionId)
      })
    }
  }

  const handleDeletePotion = (potionId) => {
    if (confirm('Diesen Trank wirklich löschen?')) {
      setInventory({
        ...inventory,
        potions: inventory.potions.filter(p => p.id !== potionId)
      })
    }
  }

  const handleExport = () => {
    exportData()
  }

  const handleImport = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const data = await importData(file)
      if (data.inventory) {
        setInventory(data.inventory)
      }
      alert('Daten erfolgreich importiert!')
      window.location.reload()
    } catch (error) {
      alert('Fehler beim Importieren: ' + error.message)
    }
  }

  const ingredientsList = Object.entries(inventory.ingredients || {})
  const potionsList = inventory.potions || []

  return (
    <div className="inventory">
      <div className="inventory-header">
        <h2>📦 Inventar</h2>
        <div className="header-actions">
          <button onClick={handleExport}>💾 Export</button>
          <button onClick={() => fileInputRef.current?.click()}>
            📂 Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="inventory-sections">
        {/* Ingredients Section */}
        <div className="inventory-section">
          <div className="section-header">
            <h3>🌿 Ingredients ({ingredientsList.length})</h3>
            <button onClick={() => setShowAddIngredient(!showAddIngredient)}>
              {showAddIngredient ? '❌ Cancel' : '➕ Add Ingredient'}
            </button>
          </div>

          {showAddIngredient && (
            <div className="card add-ingredient-form">
              <div className="form-group">
                <label>Select Ingredient</label>
                <select
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                >
                  <option value="">-- Select Ingredient --</option>
                  {ingredients.map(ing => (
                    <option key={ing.id} value={ing.id}>{ing.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                  min="1"
                />
              </div>

              <button onClick={handleAddIngredient} disabled={!selectedIngredient}>
                Add
              </button>
            </div>
          )}

          {ingredientsList.length === 0 ? (
            <div className="card empty-state">
              <p>No ingredients in inventory</p>
            </div>
          ) : (
            <div className="ingredients-inventory grid grid-3">
              {ingredientsList.map(([ingredientId, count]) => {
                const ingredient = getIngredientDetails(ingredientId)
                return (
                  <div key={ingredientId} className="card inventory-item">
                    <div className="item-header">
                      <h4>{getIngredientName(ingredientId)}</h4>
                      <span className="count-badge">{count}x</span>
                    </div>

                    {ingredient && (
                      <>
                        <span className={`rarity-badge rarity-${ingredient.rarity.toLowerCase().replace(' ', '-')}`}>
                          {ingredient.rarity}
                        </span>
                        {ingredient.effect && (
                          <p className="item-detail">{ingredient.effect}</p>
                        )}
                      </>
                    )}

                    <div className="item-actions">
                      <button onClick={() => handleRemoveIngredient(ingredientId, 1)}>
                        -1
                      </button>
                      <button
                        onClick={() => handleRemoveIngredient(ingredientId, count)}
                        className="btn-danger"
                      >
                        Alle entfernen
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Tränke Sektion */}
        <div className="inventory-section">
          <div className="section-header">
            <h3>⚗️ Tränke ({potionsList.length})</h3>
          </div>

          {potionsList.length === 0 ? (
            <div className="card empty-state">
              <p>Keine Tränke im Inventar. Braue deinen ersten Trank!</p>
            </div>
          ) : (
            <div className="potions-inventory grid grid-2">
              {potionsList.map(potion => (
                <div key={potion.id} className="card potion-card">
                  <div className="potion-header">
                    <h4>{potion.name}</h4>
                    <span className={`quality-badge quality-${potion.quality.toLowerCase().replace(' ', '-')}`}>
                      {potion.quality}
                    </span>
                  </div>

                  <p className="potion-effect">
                    <strong>Effect:</strong> {potion.effect}
                    {potion.effectMultiplier > 1 && (
                      <span className="multiplier"> (×{potion.effectMultiplier})</span>
                    )}
                  </p>

                  <p className="potion-brewed">
                    Gebraut: {new Date(potion.brewedAt).toLocaleDateString('de-DE')}
                  </p>

                  <div className="potion-actions">
                    <button onClick={() => handleUsePotion(potion.id)} className="use-button">
                      🍶 Verwenden
                    </button>
                    <button onClick={() => handleDeletePotion(potion.id)} className="btn-danger">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inventory
