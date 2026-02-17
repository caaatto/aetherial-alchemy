import { useState } from 'react'
import './IngredientsLibrary.css'
import { getAllHerbs, rarityOrder } from '../data/herbsDatabase'

const allHerbs = getAllHerbs()

const rarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary']

const emptyForm = {
  name: '',
  description: '',
  rarity: 'Common',
  effect: '',
  location: ''
}

function IngredientsLibrary({ ingredients, setIngredients }) {
  const [showForm, setShowForm] = useState(false)
  const [addMode, setAddMode] = useState('aetherial') // 'aetherial' | 'custom'
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [selectedHerb, setSelectedHerb] = useState('')

  const resetForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setSelectedHerb('')
    setShowForm(false)
  }

  const handleSubmitCustom = (e) => {
    e.preventDefault()
    if (editingId) {
      setIngredients(ingredients.map(ing =>
        ing.id === editingId ? { ...formData, id: editingId } : ing
      ))
    } else {
      setIngredients([...ingredients, { ...formData, id: Date.now().toString() }])
    }
    resetForm()
  }

  const handleAddAetherial = () => {
    if (!selectedHerb) return
    const herb = allHerbs.find(h => h.id === selectedHerb)
    if (!herb) return

    // Don't add duplicates
    if (ingredients.find(ing => ing.id === herb.id)) {
      setSelectedHerb('')
      return
    }

    setIngredients([...ingredients, {
      id: herb.id,
      name: herb.name,
      rarity: herb.rarity,
      effect: herb.categories.join(', '),
      location: herb.location,
      description: herb.description
    }])
    setSelectedHerb('')
  }

  const handleEdit = (ingredient) => {
    setFormData(ingredient)
    setEditingId(ingredient.id)
    setAddMode('custom')
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Really delete this ingredient?')) {
      setIngredients(ingredients.filter(ing => ing.id !== id))
    }
  }

  // Herbs not yet in the library
  const availableHerbs = allHerbs.filter(h => !ingredients.find(ing => ing.id === h.id))
  const herbsByRarity = rarityOrder.reduce((acc, rarity) => {
    const herbs = availableHerbs.filter(h => h.rarity === rarity)
    if (herbs.length > 0) acc[rarity] = herbs
    return acc
  }, {})

  return (
    <div className="ingredients-library">
      <div className="library-header">
        <h2>Ingredients Library</h2>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData(emptyForm) }}>
          {showForm ? 'Cancel' : '+ New Ingredient'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          {!editingId && (
            <div className="add-mode-toggle">
              <button
                className={`mode-btn ${addMode === 'aetherial' ? 'active' : ''}`}
                onClick={() => setAddMode('aetherial')}
              >
                Aetherial Herbs
              </button>
              <button
                className={`mode-btn ${addMode === 'custom' ? 'active' : ''}`}
                onClick={() => setAddMode('custom')}
              >
                Custom
              </button>
            </div>
          )}

          {addMode === 'aetherial' && !editingId ? (
            <div className="aetherial-add-form">
              <h3>Add Aetherial Herb</h3>
              <div className="form-group">
                <label>Herb</label>
                <select
                  value={selectedHerb}
                  onChange={(e) => setSelectedHerb(e.target.value)}
                >
                  <option value="">-- Herb auswählen --</option>
                  {Object.entries(herbsByRarity).map(([rarity, herbs]) => (
                    <optgroup key={rarity} label={rarity}>
                      {herbs.map(herb => (
                        <option key={herb.id} value={herb.id}>{herb.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {selectedHerb && (() => {
                const herb = allHerbs.find(h => h.id === selectedHerb)
                return herb ? (
                  <div className="herb-preview card">
                    <span className={`rarity-badge rarity-${herb.rarity.toLowerCase().replace(' ', '-')}`}>
                      {herb.rarity}
                    </span>
                    <p className="ingredient-effect"><strong>Categories:</strong> {herb.categories.join(', ')}</p>
                    <p className="ingredient-location"><strong>Location:</strong> {herb.location}</p>
                    <p className="ingredient-description">{herb.description}</p>
                  </div>
                ) : null
              })()}

              <div className="form-actions">
                <button onClick={handleAddAetherial} disabled={!selectedHerb}>
                  + Add
                </button>
                <button type="button" onClick={resetForm}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <h3>{editingId ? 'Edit Ingredient' : 'Add Custom Ingredient'}</h3>
              <form onSubmit={handleSubmitCustom} className="ingredient-form">
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
                    {editingId ? 'Save' : '+ Add'}
                  </button>
                  <button type="button" onClick={resetForm}>Cancel</button>
                </div>
              </form>
            </div>
          )}
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
                <button onClick={() => handleEdit(ingredient)}>Edit</button>
                <button onClick={() => handleDelete(ingredient.id)} className="btn-danger">
                  Delete
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
