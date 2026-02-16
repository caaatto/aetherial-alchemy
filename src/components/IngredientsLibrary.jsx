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
    if (confirm('Really delete this ingredient?')) {
      setIngredients(ingredients.filter(ing => ing.id !== id))
    }
  }

  return (
    <div className="ingredients-library">
      <div className="library-header">
        <h2>Ingredients Library</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ New Ingredient'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingId ? 'Edit Ingredient' : 'Add New Ingredient'}</h3>
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
              <label>Rarity</label>
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
              <label>Effect</label>
              <input
                type="text"
                value={formData.effect}
                onChange={(e) => setFormData({...formData, effect: e.target.value})}
                placeholder="e.g. Healing, Poison, Invisibility..."
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Forest, Cave, Swamp..."
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                placeholder="Description of the ingredient..."
              />
            </div>

            <div className="form-actions">
              <button type="submit">
                {editingId ? '💾 Save' : '➕ Add'}
              </button>
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ingredients-grid grid grid-3">
        {ingredients.length === 0 ? (
          <div className="card empty-state">
            <p>No ingredients yet. Add your first ingredient!</p>
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
                <p className="ingredient-effect"><strong>Effect:</strong> {ingredient.effect}</p>
              )}

              {ingredient.location && (
                <p className="ingredient-location"><strong>Location:</strong> {ingredient.location}</p>
              )}

              {ingredient.description && (
                <p className="ingredient-description">{ingredient.description}</p>
              )}

              <div className="ingredient-actions">
                <button onClick={() => handleEdit(ingredient)}>✏️ Edit</button>
                <button onClick={() => handleDelete(ingredient.id)} className="btn-danger">
                  🗑️ Delete
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
