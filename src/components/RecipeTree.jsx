import { useState } from 'react'
import './RecipeTree.css'
import { aetherialRecipeTree, getRecipeById } from '../data/aetherialRecipeTree'
import { getHerbById } from '../data/herbsDatabase'
import { herbToPotionTree, createCurvedPath } from '../data/herbToPotionTree'
import { getHerbColorFilter, getMainHerbId } from '../data/herbColorMapping'

function RecipeTree({ inventory }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('list')
  const [hoveredNode, setHoveredNode] = useState(null)

  const isCraftable = (recipe) => {
    if (!inventory?.ingredients) return false
    return recipe.ingredients.every(ing => {
      const qty =
        (inventory.ingredients[`tree-${ing.id}`] || 0) +
        (inventory.ingredients[ing.id] || 0)
      return qty >= ing.amount
    })
  }

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'healing', label: 'Healing' },
    { id: 'mana', label: 'Mana' },
    { id: 'resistance', label: 'Resistance' },
    { id: 'combat', label: 'Combat' },
    { id: 'stealth', label: 'Stealth' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'utility', label: 'Utility' },
    { id: 'protection', label: 'Protection' },
    { id: 'hybrid', label: 'Hybrid' }
  ]

  const filteredRecipes = filter === 'all'
    ? aetherialRecipeTree.recipes
    : aetherialRecipeTree.recipes.filter(r => r.category === filter)

  const tiers = [...new Set(filteredRecipes.map(r => r.tier))].sort((a, b) => a - b)

  return (
    <div className="recipe-tree-container">
      {/* Header */}
      <div className="tree-header">
        <div className="tree-title">
          <h2>Aetherial Potion Compendium</h2>
          <p>D&D 5e Potions + Aetherial Herbs System</p>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="view-mode-toggle card">
        <button
          className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          List View
        </button>
        <button
          className={`view-btn ${viewMode === 'wallpaper' ? 'active' : ''}`}
          onClick={() => setViewMode('wallpaper')}
        >
          Herb Map
        </button>
      </div>

      {/* Category Filter */}
      <div className="category-filter card">
        <div className="filter-label">Category:</div>
        <div className="filter-buttons">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="recipe-tree">
          {tiers.map(tier => {
            const tierRecipes = filteredRecipes.filter(r => r.tier === tier)

            return (
              <div key={tier} className="tree-tier">
                <div className="tier-marker">
                  <span>Tier {tier}</span>
                </div>

                <div className="tier-recipes-simple">
                  {tierRecipes.map(recipe => {
                    const craftable = isCraftable(recipe)

                    return (
                      <div
                        key={recipe.id}
                        className={`recipe-node available ${craftable ? 'craftable' : ''}`}
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <div className="recipe-node-header">
                          <div className="recipe-icon">
                            {recipe.icon && recipe.icon.startsWith('/assets') ? (
                              <img
                                src={recipe.icon}
                                alt={recipe.name}
                                style={{
                                  filter: getHerbColorFilter(getMainHerbId(recipe))
                                }}
                              />
                            ) : (
                              recipe.icon
                            )}
                          </div>
                          {craftable && (
                            <div className="recipe-craftable" title="Craftable with current inventory">✓</div>
                          )}
                        </div>

                        <div className="recipe-name">{recipe.name}</div>

                        <div className={`recipe-rarity rarity-${recipe.rarity.toLowerCase().replace(' ', '-')}`}>
                          {recipe.rarity}
                        </div>

                        <div className="recipe-ingredients-count">
                          {recipe.ingredients.length} Ingredients
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Wallpaper View - Radial Herb Map */}
      {viewMode === 'wallpaper' && (
        <div className="wallpaper-tree-container">
          <div className="wallpaper-tree herb-to-potion radial">
            {/* Draw ALL connections with curved lines */}
            <svg
              width="3600"
              height="3600"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                pointerEvents: 'none',
                zIndex: 1
              }}
            >
              <defs>
                <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(78, 204, 163, 0.3)" />
                  <stop offset="100%" stopColor="rgba(78, 204, 163, 0.6)" />
                </linearGradient>
              </defs>
              {herbToPotionTree.connections.map((conn, idx) => {
                const scale = 50
                const centerOffset = 1800

                let x1, y1, x2, y2
                let isActive = false
                let strokeColor = 'url(#connection-gradient)'
                let strokeWidth = 1.5

                if (conn.herbId && conn.potionId) {
                  if (!conn.herbPos || !conn.potionPos) return null

                  x1 = conn.herbPos.x * scale + centerOffset
                  y1 = conn.herbPos.y * scale + centerOffset
                  x2 = conn.potionPos.x * scale + centerOffset
                  y2 = conn.potionPos.y * scale + centerOffset

                  isActive = hoveredNode === conn.herbId || hoveredNode === conn.potionId
                  strokeColor = isActive ? 'var(--primary)' : 'rgba(78, 204, 163, 0.2)'
                  strokeWidth = isActive ? 3 : 1
                } else if (conn.isRequirement) {
                  if (!conn.fromPos || !conn.toPos) return null

                  x1 = conn.fromPos.x * scale + centerOffset
                  y1 = conn.fromPos.y * scale + centerOffset
                  x2 = conn.toPos.x * scale + centerOffset
                  y2 = conn.toPos.y * scale + centerOffset

                  isActive = hoveredNode === conn.fromPotionId || hoveredNode === conn.toPotionId
                  strokeColor = isActive ? 'var(--legendary)' : 'rgba(255, 193, 7, 0.3)'
                  strokeWidth = isActive ? 3 : 1.5
                } else {
                  return null
                }

                if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return null

                const pathD = createCurvedPath(
                  { x: x1, y: y1 },
                  { x: x2, y: y2 },
                  centerOffset,
                  centerOffset
                )

                return (
                  <path
                    key={`conn-${idx}`}
                    d={pathD}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={conn.isRequirement ? '4,6' : 'none'}
                    className={`herb-connection-line ${isActive ? 'active' : ''} ${conn.isRequirement ? 'requirement' : ''}`}
                    opacity={isActive ? 1 : (hoveredNode ? 0.3 : 0.6)}
                  />
                )
              })}
            </svg>

            {/* Render Herbs (Outer Radial Layer) */}
            {herbToPotionTree.herbs.map(herb => {
              if (!herb.position) return null

              const scale = 50
              const centerOffset = 1800
              const xPos = herb.position.x * scale + centerOffset
              const yPos = herb.position.y * scale + centerOffset

              let isConnected = !hoveredNode || hoveredNode === herb.id

              if (hoveredNode && hoveredNode !== herb.id) {
                const hoveredPotion = herbToPotionTree.potions.find(p => p.id === hoveredNode)
                if (hoveredPotion) {
                  isConnected = hoveredPotion.ingredients.some(ing => ing.id === herb.id)
                } else {
                  const sharedPotions = herbToPotionTree.connections.filter(conn =>
                    conn.herbId === herb.id || conn.herbId === hoveredNode
                  )
                  isConnected = sharedPotions.some(conn =>
                    conn.herbId === herb.id || conn.herbId === hoveredNode
                  )
                }
              }

              return (
                <div
                  key={`herb-${herb.id}`}
                  className={`herb-node radial ${!isConnected ? 'faded' : ''}`}
                  style={{
                    position: 'absolute',
                    left: `${xPos}px`,
                    top: `${yPos}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: hoveredNode === herb.id ? 100 : 10,
                    opacity: isConnected ? 1 : 0.15,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={() => setHoveredNode(herb.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  title={`${herb.name} (${herb.rarity})`}
                >
                  <div className="herb-icon">{herb.icon}</div>
                  <div className="herb-name">{herb.name}</div>
                </div>
              )
            })}

            {/* Render Potions (Inner Radial Layer) */}
            {herbToPotionTree.potions.map(potion => {
              if (!potion.position) return null

              const craftable = isCraftable(potion)

              const scale = 50
              const centerOffset = 1800
              const xPos = potion.position.x * scale + centerOffset
              const yPos = potion.position.y * scale + centerOffset

              const isCenter = potion.id === 'healing-potion'

              let isConnected = !hoveredNode || hoveredNode === potion.id

              if (hoveredNode && hoveredNode !== potion.id) {
                const hoveredHerb = herbToPotionTree.herbs.find(h => h.id === hoveredNode)
                if (hoveredHerb) {
                  isConnected = potion.ingredients.some(ing => ing.id === hoveredNode)
                } else {
                  const hoveredPotion = herbToPotionTree.potions.find(p => p.id === hoveredNode)
                  if (hoveredPotion) {
                    const isRequirement = hoveredPotion.requires?.includes(potion.id)
                    const requiresHovered = potion.requires?.includes(hoveredNode)
                    isConnected = isRequirement || requiresHovered
                  }
                }
              }

              return (
                <div
                  key={`potion-${potion.id}`}
                  className={`recipe-node wallpaper radial ${isCenter ? 'center' : ''} available ${craftable ? 'craftable' : ''} ${!isConnected ? 'faded' : ''}`}
                  style={{
                    position: 'absolute',
                    left: `${xPos}px`,
                    top: `${yPos}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: hoveredNode === potion.id ? 100 : 15,
                    opacity: isConnected ? 1 : 0.15,
                    transition: 'opacity 0.3s ease'
                  }}
                  onClick={() => setSelectedRecipe(potion)}
                  onMouseEnter={() => setHoveredNode(potion.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="recipe-icon">
                    {potion.icon && potion.icon.startsWith('/assets') ? (
                      <img
                        src={potion.icon}
                        alt={potion.name}
                        style={{
                          filter: getHerbColorFilter(getMainHerbId(potion))
                        }}
                      />
                    ) : (
                      potion.icon
                    )}
                  </div>
                  <div className="recipe-name">{potion.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="recipe-details-modal">
          <div className="modal-overlay" onClick={() => setSelectedRecipe(null)} />
          <div className="modal-content card">
            <button className="close-button" onClick={() => setSelectedRecipe(null)}>
              X
            </button>

            <div className="detail-header">
              <span className="detail-icon">
                {selectedRecipe.icon && selectedRecipe.icon.startsWith('/assets') ? (
                  <img
                    src={selectedRecipe.icon}
                    alt={selectedRecipe.name}
                    style={{
                      filter: getHerbColorFilter(getMainHerbId(selectedRecipe))
                    }}
                  />
                ) : (
                  selectedRecipe.icon
                )}
              </span>
              <div>
                <h3>{selectedRecipe.name}</h3>
                <p className={`detail-rarity rarity-${selectedRecipe.rarity.toLowerCase().replace(' ', '-')}`}>
                  {selectedRecipe.rarity}
                </p>
                <p className="detail-category">Category: {selectedRecipe.category}</p>
                <p className="detail-source">{selectedRecipe.dndSource}</p>
              </div>
            </div>

            <div className="detail-effect">
              <strong>Effect:</strong> {selectedRecipe.effect}
            </div>

            <div className="detail-meta">
              <div className="meta-item">
                <span>DC:</span> <strong>{selectedRecipe.dc}</strong>
              </div>
              <div className="meta-item">
                <span>Brew Time:</span> <strong>{selectedRecipe.brewTime}</strong>
              </div>
              {selectedRecipe.manaCost > 0 && (
                <div className="meta-item">
                  <span>Mana Cost:</span> <strong>{selectedRecipe.manaCost}</strong>
                </div>
              )}
            </div>

            {/* Ingredients with detailed herb info */}
            <div className="detail-ingredients">
              <strong>Ingredients:</strong>
              <ul>
                {selectedRecipe.ingredients.map((ing, idx) => {
                  const herbData = getHerbById(ing.id)
                  const inStock =
                    (inventory?.ingredients?.[`tree-${ing.id}`] || 0) +
                    (inventory?.ingredients?.[ing.id] || 0)
                  const hasEnough = inStock >= ing.amount
                  return (
                    <li key={idx} className={`rarity-${herbData.rarity.toLowerCase()}`}>
                      <div className="ingredient-row">
                        <span className={`ingredient-amount ${hasEnough ? 'in-stock' : ''}`}>
                          {ing.amount}x
                        </span>
                        <span className="ingredient-name">{herbData.name}</span>
                        <span className="ingredient-rarity">({herbData.rarity})</span>
                        {inStock > 0 && (
                          <span className="ingredient-stock">{inStock} in stock</span>
                        )}
                      </div>
                      <div className="ingredient-details">
                        <span className="ingredient-categories">
                          {herbData.categories.join(', ')}
                        </span>
                        {herbData.manaContent > 0 && (
                          <span className="ingredient-mana">{herbData.manaContent} Mana</span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Related Recipes */}
            {selectedRecipe.unlocks && selectedRecipe.unlocks.length > 0 && (
              <div className="detail-unlocks">
                <strong>Related Recipes:</strong>
                <ul>
                  {selectedRecipe.unlocks.map(unlockId => {
                    const related = getRecipeById(unlockId)
                    return (
                      <li key={unlockId}>
                        {related?.icon} {related?.name || unlockId}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {isCraftable(selectedRecipe) && (
              <div className="craftable-banner">
                ✓ You have all ingredients to brew this!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="tree-legend card">
        <div className="legend-grid">
          <div className="legend-item">
            <div className="recipe-node mini craftable available">
              <div className="recipe-icon">✓</div>
            </div>
            <span>Craftable (enough herbs in inventory)</span>
          </div>
          <div className="legend-item">
            <div className="recipe-node mini available">
              <div className="recipe-icon">○</div>
            </div>
            <span>Missing ingredients</span>
          </div>
        </div>
        <div className="legend-info">
          <p><strong>Herb Categories:</strong> Medicinal, Culinary, Magical, Ritual/Cultural, Brewing/Crafting</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeTree
