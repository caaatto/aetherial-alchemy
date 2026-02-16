import { useState } from 'react'
import './HerbsLibrary.css'
import { herbsDatabase, rarityOrder, categoryList } from '../data/herbsDatabase'

function HerbsLibrary() {
  const [selectedHerb, setSelectedHerb] = useState(null)
  const [rarityFilter, setRarityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const herbs = Object.values(herbsDatabase)

  // Filter herbs
  const filteredHerbs = herbs.filter(herb => {
    const matchesRarity = rarityFilter === 'all' || herb.rarity === rarityFilter
    const matchesCategory = categoryFilter === 'all' || herb.categories.includes(categoryFilter)
    const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRarity && matchesCategory && matchesSearch
  })

  // Group by rarity
  const herbsByRarity = rarityOrder.reduce((acc, rarity) => {
    acc[rarity] = filteredHerbs.filter(h => h.rarity === rarity)
    return acc
  }, {})

  return (
    <div className="herbs-library-container">
      <div className="herbs-header">
        <div>
          <h2>🌿 Aetherial Herbs Compendium</h2>
          <p>Complete database of all 40 herbs from the Aetherial world</p>
        </div>
        <div className="herbs-stats">
          <div className="stat-badge">
            <span className="stat-number">{herbs.length}</span>
            <span className="stat-label">Total Herbs</span>
          </div>
          <div className="stat-badge">
            <span className="stat-number">{herbs.filter(h => h.manaContent > 0).length}</span>
            <span className="stat-label">With Mana</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="herbs-filters card">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search herbs..."
          />
        </div>

        <div className="filter-group">
          <label>Rarity:</label>
          <select value={rarityFilter} onChange={(e) => setRarityFilter(e.target.value)}>
            <option value="all">All Rarities</option>
            {rarityOrder.map(rarity => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categoryList.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {(rarityFilter !== 'all' || categoryFilter !== 'all' || searchTerm) && (
          <button
            onClick={() => {
              setRarityFilter('all')
              setCategoryFilter('all')
              setSearchTerm('')
            }}
            className="clear-filters"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Herbs List grouped by Rarity */}
      <div className="herbs-content">
        {rarityOrder.map(rarity => {
          const rarityHerbs = herbsByRarity[rarity]
          if (rarityHerbs.length === 0) return null

          return (
            <div key={rarity} className="rarity-section">
              <h3 className={`rarity-header rarity-${rarity.toLowerCase().replace(' ', '-')}`}>
                {rarity} ({rarityHerbs.length})
              </h3>

              <div className="herbs-grid">
                {rarityHerbs.map(herb => (
                  <div
                    key={herb.id}
                    className={`herb-card card ${selectedHerb?.id === herb.id ? 'selected' : ''}`}
                    onClick={() => setSelectedHerb(herb)}
                  >
                    <div className="herb-card-header">
                      <h4>{herb.name}</h4>
                      {herb.manaContent > 0 && (
                        <div className="herb-mana-badge">
                          💙 {herb.manaContent}
                        </div>
                      )}
                      {herb.manaLevelRequired && (
                        <div className="herb-level-badge">
                          Lvl {herb.manaLevelRequired}
                        </div>
                      )}
                    </div>

                    <div className="herb-categories">
                      {herb.categories.map(cat => (
                        <span key={cat} className="category-tag">
                          {cat}
                        </span>
                      ))}
                    </div>

                    {herb.description && (
                      <p className="herb-description-short">
                        {herb.description.substring(0, 80)}...
                      </p>
                    )}

                    {herb.location && (
                      <div className="herb-location">
                        📍 {herb.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {filteredHerbs.length === 0 && (
          <div className="card empty-state">
            <p>No herbs found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Herb Details Modal */}
      {selectedHerb && (
        <div className="herb-details-modal">
          <div className="modal-overlay" onClick={() => setSelectedHerb(null)} />
          <div className="modal-content card">
            <button className="close-button" onClick={() => setSelectedHerb(null)}>
              X
            </button>

            <div className="herb-detail-header">
              <h3>{selectedHerb.name}</h3>
              <div className={`rarity-badge rarity-${selectedHerb.rarity.toLowerCase().replace(' ', '-')}`}>
                {selectedHerb.rarity}
              </div>
            </div>

            <div className="herb-detail-content">
              <div className="herb-detail-section">
                <strong>Description:</strong>
                <p>{selectedHerb.description}</p>
              </div>

              {selectedHerb.location && (
                <div className="herb-detail-section">
                  <strong>Location:</strong>
                  <p>📍 {selectedHerb.location}</p>
                </div>
              )}

              <div className="herb-detail-section">
                <strong>Categories:</strong>
                <div className="categories-list">
                  {selectedHerb.categories.map(cat => (
                    <span key={cat} className="category-tag large">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {selectedHerb.manaContent > 0 && (
                <div className="herb-detail-section mana-section">
                  <strong>Mana Content:</strong>
                  <div className="mana-value">
                    💙 {selectedHerb.manaContent} Mana
                  </div>
                  <p className="mana-note">
                    This herb contains magical energy that enhances potion potency.
                  </p>
                </div>
              )}

              {selectedHerb.manaLevelRequired && (
                <div className="herb-detail-section level-section">
                  <strong>Required Mana Level:</strong>
                  <div className="level-value">
                    Level {selectedHerb.manaLevelRequired}
                  </div>
                  <p className="level-note">
                    You must be at least Mana Level {selectedHerb.manaLevelRequired} to harvest this herb.
                  </p>
                </div>
              )}

              {selectedHerb.properties && Object.keys(selectedHerb.properties).length > 0 && (
                <div className="herb-detail-section">
                  <strong>Properties:</strong>
                  <div className="properties-grid">
                    {Object.entries(selectedHerb.properties).map(([key, value]) => (
                      <div key={key} className="property-item">
                        <span className="property-key">{key.replace(/_/g, ' ')}:</span>
                        <span className="property-value">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HerbsLibrary
