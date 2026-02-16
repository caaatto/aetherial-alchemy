import { useState } from 'react'
import './IngredientsLibrary.css'

const rarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']

function IngredientsLibrary({ ingredients, setIngredients }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rarity: 'Common',
    effect: '',
    location: ''
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      rarity: 'Common',
      effect: '',
      location: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      setIngredients(ingredients.map(ing =>
        ing.id === editingId ? { ...formData, id: editingId } : ing
      ))
    } else {
      const newIngredient = {
        ...formData,
        id: Date.now().toString()
      }
      setIngredients([...ingredients, newIngredient])
    }

    resetForm()
  }

  const handleEdit = (ingredient) => {
    setFormData(ingredient)
    setEditingId(ingredient.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Diese Zutat wirklich löschen?')) {
      setIngredients(ingredients.filter(ing => ing.id !== id))
    }
  }

  return (
    <div className="ingredients-library">
      <div className="library-header">
        <h2>Zutaten-Bibliothek</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Abbrechen' : '➕ Neue Zutat'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingId ? 'Zutat bearbeiten' : 'Neue Zutat hinzufügen'}</h3>
          <form onSubmit={handleSubmit} className="ingredient-form">
            <div className="form-group">
              <label>Name *</label>
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

            <div className="form-group">
              <label>Effekt</label>
              <input
                type="text"
                value={formData.effect}
                onChange={(e) => setFormData({...formData, effect: e.target.value})}
                placeholder="z.B. Heilung, Gift, Unsichtbarkeit..."
              />
            </div>

            <div className="form-group">
              <label>Fundort</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="z.B. Wald, Höhle, Sumpf..."
              />
            </div>

            <div className="form-group">
              <label>Beschreibung</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                placeholder="Beschreibung der Zutat..."
              />
            </div>

            <div className="form-actions">
              <button type="submit">
                {editingId ? '💾 Speichern' : '➕ Hinzufügen'}
              </button>
              <button type="button" onClick={resetForm}>
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ingredients-grid grid grid-3">
        {ingredients.length === 0 ? (
          <div className="card empty-state">
            <p>Noch keine Zutaten vorhanden. Füge deine erste Zutat hinzu!</p>
          </div>
        ) : (
          ingredients.map(ingredient => (
            <div key={ingredient.id} className="card ingredient-card">
              <div className="ingredient-header">
                <h3>{ingredient.name}</h3>
                <span className={`rarity-badge rarity-${ingredient.rarity.toLowerCase().replace(' ', '-')}`}>
                  {ingredient.rarity}
                </span>
              </div>

              {ingredient.effect && (
                <p className="ingredient-effect"><strong>Effekt:</strong> {ingredient.effect}</p>
              )}

              {ingredient.location && (
                <p className="ingredient-location"><strong>Fundort:</strong> {ingredient.location}</p>
              )}

              {ingredient.description && (
                <p className="ingredient-description">{ingredient.description}</p>
              )}

              <div className="ingredient-actions">
                <button onClick={() => handleEdit(ingredient)}>✏️ Bearbeiten</button>
                <button onClick={() => handleDelete(ingredient.id)} className="btn-danger">
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

export default IngredientsLibrary
