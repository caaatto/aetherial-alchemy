import { useState } from 'react'
import './RecipeManager.css'

const rarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']

function RecipeManager({ ingredients, recipes, setRecipes }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rarity: 'Common',
    effect: '',
    dc: 10,
    brewTime: '1 Stunde',
    requiredIngredients: []
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      rarity: 'Common',
      effect: '',
      dc: 10,
      brewTime: '1 Stunde',
      requiredIngredients: []
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      setRecipes(recipes.map(rec =>
        rec.id === editingId ? { ...formData, id: editingId } : rec
      ))
    } else {
      const newRecipe = {
        ...formData,
        id: Date.now().toString()
      }
      setRecipes([...recipes, newRecipe])
    }

    resetForm()
  }

  const handleEdit = (recipe) => {
    setFormData(recipe)
    setEditingId(recipe.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Dieses Rezept wirklich löschen?')) {
      setRecipes(recipes.filter(rec => rec.id !== id))
    }
  }

  const addIngredient = () => {
    setFormData({
      ...formData,
      requiredIngredients: [
        ...formData.requiredIngredients,
        { ingredientId: '', amount: 1 }
      ]
    })
  }

  const removeIngredient = (index) => {
    setFormData({
      ...formData,
      requiredIngredients: formData.requiredIngredients.filter((_, i) => i !== index)
    })
  }

  const updateIngredient = (index, field, value) => {
    const updated = [...formData.requiredIngredients]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, requiredIngredients: updated })
  }

  const getIngredientName = (ingredientId) => {
    return ingredients.find(ing => ing.id === ingredientId)?.name || 'Unbekannt'
  }

  return (
    <div className="recipe-manager">
      <div className="library-header">
        <h2>Rezept-Verwaltung</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Abbrechen' : '➕ Neues Rezept'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingId ? 'Rezept bearbeiten' : 'Neues Rezept erstellen'}</h3>
          <form onSubmit={handleSubmit} className="recipe-form">
            <div className="form-row">
              <div className="form-group">
                <label>Trank-Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Seltenheit</label>
                <select
                  value={formData.rarity}
                  onChange={(e) => setFormData({...formData, rarity: e.target.value})}
                >
                  {rarities.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>DC (Schwierigkeit)</label>
                <input
                  type="number"
                  value={formData.dc}
                  onChange={(e) => setFormData({...formData, dc: parseInt(e.target.value)})}
                  min="5"
                  max="30"
                />
              </div>

              <div className="form-group">
                <label>Brauzeit</label>
                <input
                  type="text"
                  value={formData.brewTime}
                  onChange={(e) => setFormData({...formData, brewTime: e.target.value})}
                  placeholder="z.B. 1 Stunde, 1 Tag..."
                />
              </div>
            </div>

            <div className="form-group">
              <label>Effekt</label>
              <input
                type="text"
                value={formData.effect}
                onChange={(e) => setFormData({...formData, effect: e.target.value})}
                placeholder="z.B. Heilt 2d4+2 TP, Unsichtbarkeit für 1 Stunde..."
              />
            </div>

            <div className="form-group">
              <label>Beschreibung</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                placeholder="Beschreibung des Tranks..."
              />
            </div>

            <div className="form-group">
              <div className="ingredients-header">
                <label>Benötigte Zutaten</label>
                <button type="button" onClick={addIngredient} disabled={ingredients.length === 0}>
                  ➕ Zutat hinzufügen
                </button>
              </div>

              {ingredients.length === 0 ? (
                <p className="warning-text">⚠️ Erstelle zuerst Zutaten in der Zutaten-Bibliothek!</p>
              ) : (
                <div className="required-ingredients">
                  {formData.requiredIngredients.map((reqIng, index) => (
                    <div key={index} className="ingredient-row">
                      <select
                        value={reqIng.ingredientId}
                        onChange={(e) => updateIngredient(index, 'ingredientId', e.target.value)}
                        required
                      >
                        <option value="">-- Zutat wählen --</option>
                        {ingredients.map(ing => (
                          <option key={ing.id} value={ing.id}>{ing.name}</option>
                        ))}
                      </select>

                      <input
                        type="number"
                        value={reqIng.amount}
                        onChange={(e) => updateIngredient(index, 'amount', parseInt(e.target.value))}
                        min="1"
                        placeholder="Menge"
                      />

                      <button type="button" onClick={() => removeIngredient(index)} className="btn-danger">
                        🗑️
                      </button>
                    </div>
                  ))}

                  {formData.requiredIngredients.length === 0 && (
                    <p className="info-text">Noch keine Zutaten hinzugefügt</p>
                  )}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit">
                {editingId ? '💾 Speichern' : '➕ Rezept erstellen'}
              </button>
              <button type="button" onClick={resetForm}>
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="recipes-grid grid grid-2">
        {recipes.length === 0 ? (
          <div className="card empty-state">
            <p>Noch keine Rezepte vorhanden. Erstelle dein erstes Rezept!</p>
          </div>
        ) : (
          recipes.map(recipe => (
            <div key={recipe.id} className="card recipe-card">
              <div className="recipe-header">
                <h3>{recipe.name}</h3>
                <span className={`rarity-badge rarity-${recipe.rarity.toLowerCase().replace(' ', '-')}`}>
                  {recipe.rarity}
                </span>
              </div>

              <div className="recipe-meta">
                <span>🎲 DC {recipe.dc}</span>
                <span>⏱️ {recipe.brewTime}</span>
              </div>

              {recipe.effect && (
                <p className="recipe-effect"><strong>Effekt:</strong> {recipe.effect}</p>
              )}

              {recipe.description && (
                <p className="recipe-description">{recipe.description}</p>
              )}

              {recipe.requiredIngredients.length > 0 && (
                <div className="recipe-ingredients">
                  <strong>Zutaten:</strong>
                  <ul>
                    {recipe.requiredIngredients.map((reqIng, idx) => (
                      <li key={idx}>
                        {reqIng.amount}x {getIngredientName(reqIng.ingredientId)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="recipe-actions">
                <button onClick={() => handleEdit(recipe)}>✏️ Bearbeiten</button>
                <button onClick={() => handleDelete(recipe.id)} className="btn-danger">
                  🗑️ Löschen
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecipeManager
