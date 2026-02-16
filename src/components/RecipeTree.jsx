import { useState, useEffect } from 'react'
import './RecipeTree.css'
import { aetherialRecipeTree, getRecipeById } from '../data/aetherialRecipeTree'
import { herbsDatabase, getHerbById } from '../data/herbsDatabase'
import { herbToPotionTree, createCurvedPath } from '../data/herbToPotionTree'
import { getHerbColorFilter, getMainHerbId } from '../data/herbColorMapping'

function RecipeTree({ recipes, setRecipes, ingredients, setIngredients }) {
  const [unlockedRecipes, setUnlockedRecipes] = useState([])
  const [skillPoints, setSkillPoints] = useState(15)
  const [manaLevel, setManaLevel] = useState(1)
  const [currentMana, setCurrentMana] = useState(50)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'wallpaper'
  const [hoveredNode, setHoveredNode] = useState(null) // For connection highlighting

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('recipe-tree-progress')
    if (saved) {
      const data = JSON.parse(saved)
      setUnlockedRecipes(data.unlocked || [])
      setSkillPoints(data.points || 15)
      setManaLevel(data.manaLevel || 1)
      setCurrentMana(data.currentMana || 50)
    }
  }, [])

  // Save progress
  useEffect(() => {
    localStorage.setItem('recipe-tree-progress', JSON.stringify({
      unlocked: unlockedRecipes,
      points: skillPoints,
      manaLevel,
      currentMana
    }))
  }, [unlockedRecipes, skillPoints, manaLevel, currentMana])

  const isUnlocked = (recipeId) => unlockedRecipes.includes(recipeId)

  const canUnlock = (recipe) => {
    if (isUnlocked(recipe.id)) return false
    if (skillPoints < recipe.cost) return false
    if (manaLevel < recipe.manaLevelRequired) return false

    // Check requirements
    if (recipe.requires && recipe.requires.length > 0) {
      return recipe.requires.every(reqId => isUnlocked(reqId))
    }

    return true
  }

  const unlockRecipe = (recipe) => {
    if (!canUnlock(recipe)) return

    setSkillPoints(prev => prev - recipe.cost)
    setUnlockedRecipes(prev => [...prev, recipe.id])

    // Add recipe to main recipes
    const newRecipe = {
      id: `tree-${recipe.id}`,
      name: recipe.name,
      rarity: recipe.rarity,
      effect: recipe.effect,
      dc: recipe.dc,
      brewTime: recipe.brewTime,
      description: `${recipe.dndSource}\n\nMana Cost: ${recipe.manaCost}, Required Level: ${recipe.manaLevelRequired}`,
      requiredIngredients: recipe.ingredients.map(ing => ({
        ingredientId: ing.id,
        amount: ing.amount
      }))
    }

    setRecipes(prev => [...prev, newRecipe])

    // Add missing ingredients to library
    const newIngredients = []
    recipe.ingredients.forEach(ing => {
      const herbData = getHerbById(ing.id)
      const exists = ingredients.find(i => i.name === herbData.name)
      if (!exists) {
        newIngredients.push({
          id: `tree-${ing.id}`,
          name: herbData.name,
          rarity: herbData.rarity,
          effect: herbData.categories.join(', '),
          description: `${herbData.description}\n\nMana Content: ${herbData.manaContent}\nProperties: ${JSON.stringify(herbData.properties)}`,
          location: herbData.location
        })
      }
    })

    if (newIngredients.length > 0) {
      setIngredients(prev => [...prev, ...newIngredients])
    }
  }

  const categories = [
    { id: 'all', label: 'All', icon: '' },
    { id: 'healing', label: 'Healing', icon: '' },
    { id: 'mana', label: 'Mana', icon: '' },
    { id: 'resistance', label: 'Resistance', icon: '' },
    { id: 'combat', label: 'Combat', icon: '' },
    { id: 'stealth', label: 'Stealth', icon: '' },
    { id: 'transformation', label: 'Transformation', icon: '' },
    { id: 'utility', label: 'Utility', icon: '' },
    { id: 'protection', label: 'Protection', icon: '' },
    { id: 'hybrid', label: 'Hybrid', icon: '' }
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
          <h2>️ Aetherial Recipe Crafting Tree</h2>
          <p>D&D 5e Potions + Aetherial Herbs System</p>
        </div>
        <div className="stats-display">
          <div className="stat-box">
            <div className="stat-label">Skill Points</div>
            <div className="stat-value">{skillPoints}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Mana Level</div>
            <div className="stat-value">{manaLevel}/4</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Current Mana</div>
            <div className="stat-value">{currentMana}</div>
          </div>
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
          ️ Wallpaper Tree
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
              {cat.icon} {cat.label}
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
                    const unlocked = isUnlocked(recipe.id)
                    const available = canUnlock(recipe)

                    return (
                      <div
                        key={recipe.id}
                        className={`recipe-node ${unlocked ? 'unlocked' : ''} ${available ? 'available' : 'locked'}`}
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
                          {recipe.cost > 0 && !unlocked && (
                            <div className="recipe-cost">{recipe.cost} SP</div>
                          )}
                          {unlocked && (
                            <div className="recipe-unlocked"></div>
                          )}
                        </div>

                        <div className="recipe-name">{recipe.name}</div>

                        <div className={`recipe-rarity rarity-${recipe.rarity.toLowerCase().replace(' ', '-')}`}>
                          {recipe.rarity}
                        </div>

                        {recipe.manaCost > 0 && (
                          <div className="recipe-mana-cost">
                             {recipe.manaCost} Mana
                          </div>
                        )}

                        {recipe.manaLevelRequired > 1 && (
                          <div className="recipe-level-req">
                            Lvl {recipe.manaLevelRequired}
                          </div>
                        )}

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

      {/* Wallpaper View - Radial Skill Tree */}
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
                  // Herb to Potion connection
                  if (!conn.herbPos || !conn.potionPos) return null // Skip invalid connections

                  x1 = conn.herbPos.x * scale + centerOffset
                  y1 = conn.herbPos.y * scale + centerOffset
                  x2 = conn.potionPos.x * scale + centerOffset
                  y2 = conn.potionPos.y * scale + centerOffset

                  isActive = hoveredNode === conn.herbId || hoveredNode === conn.potionId
                  strokeColor = isActive ? 'var(--primary)' : 'rgba(78, 204, 163, 0.2)'
                  strokeWidth = isActive ? 3 : 1
                } else if (conn.isRequirement) {
                  // Potion to Potion requirement
                  if (!conn.fromPos || !conn.toPos) return null // Skip invalid connections

                  x1 = conn.fromPos.x * scale + centerOffset
                  y1 = conn.fromPos.y * scale + centerOffset
                  x2 = conn.toPos.x * scale + centerOffset
                  y2 = conn.toPos.y * scale + centerOffset

                  isActive = hoveredNode === conn.fromPotionId || hoveredNode === conn.toPotionId
                  strokeColor = isActive ? 'var(--legendary)' : 'rgba(255, 193, 7, 0.3)'
                  strokeWidth = isActive ? 3 : 1.5
                } else {
                  return null // Skip unknown connection types
                }

                // Validate coordinates
                if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
                  console.warn('Invalid connection coordinates:', { x1, y1, x2, y2, conn })
                  return null
                }

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

              // Check if this herb is connected to hovered node
              let isConnected = !hoveredNode || hoveredNode === herb.id

              if (hoveredNode && hoveredNode !== herb.id) {
                // If hovering a potion, check if this herb is an ingredient
                const hoveredPotion = herbToPotionTree.potions.find(p => p.id === hoveredNode)
                if (hoveredPotion) {
                  isConnected = hoveredPotion.ingredients.some(ing => ing.id === herb.id)
                } else {
                  // If hovering another herb, check if they share a potion
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

              const unlocked = isUnlocked(potion.id)
              const available = canUnlock(potion)

              const scale = 50
              const centerOffset = 1800
              const xPos = potion.position.x * scale + centerOffset
              const yPos = potion.position.y * scale + centerOffset

              // Highlight center potion
              const isCenter = potion.id === 'healing-potion'

              // Check if this potion is connected to hovered node
              let isConnected = !hoveredNode || hoveredNode === potion.id

              if (hoveredNode && hoveredNode !== potion.id) {
                // If hovering a herb, check if this potion uses that herb
                const hoveredHerb = herbToPotionTree.herbs.find(h => h.id === hoveredNode)
                if (hoveredHerb) {
                  isConnected = potion.ingredients.some(ing => ing.id === hoveredNode)
                } else {
                  // If hovering another potion, check if this is a requirement or dependent
                  const hoveredPotion = herbToPotionTree.potions.find(p => p.id === hoveredNode)
                  if (hoveredPotion) {
                    // Check if current potion is required by hovered potion
                    const isRequirement = hoveredPotion.requires?.includes(potion.id)
                    // Check if current potion requires hovered potion
                    const requiresHovered = potion.requires?.includes(hoveredNode)
                    isConnected = isRequirement || requiresHovered
                  }
                }
              }

              return (
                <div
                  key={`potion-${potion.id}`}
                  className={`recipe-node wallpaper radial ${isCenter ? 'center' : ''} ${unlocked ? 'unlocked' : ''} ${available ? 'available' : 'locked'} ${!isConnected ? 'faded' : ''}`}
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
                <span> DC:</span> <strong>{selectedRecipe.dc}</strong>
              </div>
              <div className="meta-item">
                <span>⏱️ Brew Time:</span> <strong>{selectedRecipe.brewTime}</strong>
              </div>
              <div className="meta-item">
                <span> SP Cost:</span>
                <strong>{selectedRecipe.cost === 0 ? 'Free' : `${selectedRecipe.cost} SP`}</strong>
              </div>
              <div className="meta-item">
                <span> Mana:</span>
                <strong>{selectedRecipe.manaCost === 0 ? 'No Mana' : `${selectedRecipe.manaCost} Mana`}</strong>
              </div>
              <div className="meta-item">
                <span> Level:</span>
                <strong>Mana Level {selectedRecipe.manaLevelRequired}</strong>
              </div>
            </div>

            {/* Requirements */}
            {selectedRecipe.requires && selectedRecipe.requires.length > 0 && (
              <div className="detail-requirements">
                <strong>Requires:</strong>
                <ul>
                  {selectedRecipe.requires.map(reqId => {
                    const reqRecipe = getRecipeById(reqId)
                    const reqUnlocked = isUnlocked(reqId)
                    return (
                      <li key={reqId} className={reqUnlocked ? 'completed' : 'incomplete'}>
                        {reqUnlocked ? '' : ''} {reqRecipe?.name || reqId}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Ingredients with detailed herb info */}
            <div className="detail-ingredients">
              <strong>Ingredients:</strong>
              <ul>
                {selectedRecipe.ingredients.map((ing, idx) => {
                  const herbData = getHerbById(ing.id)
                  return (
                    <li key={idx} className={`rarity-${herbData.rarity.toLowerCase()}`}>
                      <div className="ingredient-row">
                        <span className="ingredient-amount">{ing.amount}x</span>
                        <span className="ingredient-name">{herbData.name}</span>
                        <span className="ingredient-rarity">({herbData.rarity})</span>
                      </div>
                      <div className="ingredient-details">
                        <span className="ingredient-categories">
                          {herbData.categories.join(', ')}
                        </span>
                        {herbData.manaContent > 0 && (
                          <span className="ingredient-mana"> {herbData.manaContent} Mana</span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Unlocks */}
            {selectedRecipe.unlocks && selectedRecipe.unlocks.length > 0 && (
              <div className="detail-unlocks">
                <strong>Unlocks:</strong>
                <ul>
                  {selectedRecipe.unlocks.map(unlockId => {
                    const unlockRecipe = getRecipeById(unlockId)
                    return (
                      <li key={unlockId}>
                        {unlockRecipe?.icon} {unlockRecipe?.name || unlockId}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Unlock Button */}
            {isUnlocked(selectedRecipe.id) ? (
              <button disabled className="unlock-button">
                 Already Unlocked
              </button>
            ) : canUnlock(selectedRecipe) ? (
              <button
                className="unlock-button"
                onClick={() => {
                  unlockRecipe(selectedRecipe)
                  setSelectedRecipe(null)
                }}
              >
                Unlock für {selectedRecipe.cost} SP
              </button>
            ) : (
              <button disabled className="unlock-button">
                {skillPoints < selectedRecipe.cost
                  ? 'Not enough Skill Points'
                  : manaLevel < selectedRecipe.manaLevelRequired
                  ? `Requires Mana Level ${selectedRecipe.manaLevelRequired}`
                  : 'Requirements not met'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="tree-legend card">
        <h3>Legend & Mana System</h3>
        <div className="legend-grid">
          <div className="legend-item">
            <div className="recipe-node mini unlocked">
              <div className="recipe-icon"></div>
            </div>
            <span>Unlocked</span>
          </div>
          <div className="legend-item">
            <div className="recipe-node mini available">
              <div className="recipe-icon">○</div>
            </div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="recipe-node mini locked">
              <div className="recipe-icon"></div>
            </div>
            <span>Locked</span>
          </div>
        </div>
        <div className="legend-info">
          <p><strong> Mana-System:</strong></p>
          <ul>
            <li>Some potions cost Mana to brew</li>
            <li>Mana potions restore your Mana</li>
            <li>Mana Level 1-4 unlocks more powerful recipes</li>
            <li>Herbs with Mana content increase potency</li>
          </ul>
          <p><strong> Herb Categories:</strong> Medicinal, Culinary, Magical, Ritual/Cultural, Brewing/Crafting</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeTree
