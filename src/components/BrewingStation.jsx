import { useState, useEffect, useMemo } from 'react'
import './BrewingStation.css'
import D20 from './D20'
import { aetherialRecipeTree } from '../data/aetherialRecipeTree'
import { getHerbById } from '../data/herbsDatabase'

function BrewingStation({ recipes, ingredients, inventory, setInventory }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [modifier, setModifier] = useState(0)
  const [brewing, setBrewing] = useState(false)
  const [result, setResult] = useState(null)
  const [diceRoll, setDiceRoll] = useState(null)
  const [extensionActive, setExtensionActive] = useState(false)
  const [search, setSearch] = useState('')
  const [filterRarity, setFilterRarity] = useState('all')

  useEffect(() => {
    // Detect the extension via postMessage (content scripts use an isolated world;
    // postMessage is the only reliable cross-boundary channel)
    const handler = (e) => {
      if (e.data?.__aetherial_from_ext && e.data.type === 'EXTENSION_READY') {
        setExtensionActive(true)
      }
    }
    window.addEventListener('message', handler)
    // Ping - handles the case where the content script loaded before this component mounted
    window.postMessage({ __aetherial_from_page: true, type: 'PING' }, '*')
    return () => window.removeEventListener('message', handler)
  }, [])

  const getIngredientName = (id) => {
    const herb = getHerbById(id)
    if (herb) return herb.name
    return (ingredients || []).find(ing => ing.id === id)?.name || id
  }

  // Normalize ingredients to [{id, amount}] regardless of recipe source
  const normalizeIngredients = (recipe) => {
    if (recipe.ingredients?.length)
      return recipe.ingredients.map(i => ({ id: i.id, amount: i.amount }))
    if (recipe.requiredIngredients?.length)
      return recipe.requiredIngredients.map(i => ({ id: i.ingredientId, amount: i.amount }))
    return []
  }

  // All recipes: aetherial (99) + custom (deduplicated)
  const allRecipes = useMemo(() => {
    const aIds = new Set(aetherialRecipeTree.recipes.map(r => r.id))
    const customOnly = (recipes || []).filter(r => !aIds.has(r.id))
    return [...aetherialRecipeTree.recipes, ...customOnly]
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(r => {
      const ms = !search || r.name.toLowerCase().includes(search.toLowerCase())
      const mr = filterRarity === 'all' || r.rarity === filterRarity
      return ms && mr
    })
  }, [allRecipes, search, filterRarity])

  const checkIngredientAvailability = (recipe) => {
    const reqs = normalizeIngredients(recipe)
    if (!reqs.length) return { available: true, missing: [] }
    const missing = []
    for (const req of reqs) {
      const have = inventory.ingredients[req.id] || 0
      if (have < req.amount) {
        missing.push({ name: getIngredientName(req.id), have, needed: req.amount })
      }
    }
    return { available: missing.length === 0, missing }
  }

  const rollDice = () => {
    return Math.floor(Math.random() * 20) + 1
  }

  const consumeIngredients = (recipe) => {
    const newIngredients = { ...inventory.ingredients }
    for (const req of normalizeIngredients(recipe)) {
      newIngredients[req.id] = (newIngredients[req.id] || 0) - req.amount
      if (newIngredients[req.id] <= 0) delete newIngredients[req.id]
    }
    return newIngredients
  }

  const handleBrew = async () => {
    if (!selectedRecipe) return

    setBrewing(true)
    setResult(null)

    // Dice animation
    await new Promise(resolve => setTimeout(resolve, 500))
    const roll = rollDice()
    setDiceRoll(roll)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const total = roll + modifier
    const dc = selectedRecipe.dc
    const critSuccess = roll === 20
    const critFail = roll === 1
    // Nat 1 always fails, nat 20 always succeeds, otherwise total vs DC
    const success = (total >= dc || critSuccess) && !critFail

    let quality = 'Normal'
    let effectMultiplier = 1

    if (critSuccess) {
      quality = 'Masterwork'
      effectMultiplier = 1.5
    } else if (critFail) {
      quality = 'Critical Failure'
    } else if (!success) {
      quality = 'Failure'
    } else if (total >= dc + 5) {
      quality = 'Superior'
      effectMultiplier = 1.25
    }

    // Consume ingredients
    const newIngredients = consumeIngredients(selectedRecipe)

    // On success: Add potion
    let newPotions = [...inventory.potions]
    if (success) {
      const potion = {
        id: Date.now().toString(),
        recipeId: selectedRecipe.id,
        name: selectedRecipe.name,
        effect: selectedRecipe.effect,
        quality,
        effectMultiplier,
        brewedAt: new Date().toISOString()
      }
      newPotions.push(potion)
    }

    setInventory({
      ingredients: newIngredients,
      potions: newPotions
    })

    const brewResult = {
      roll,
      modifier,
      total,
      dc,
      success,
      quality,
      critSuccess,
      critFail
    }

    setResult(brewResult)

    // Send brew event to the Roll20 Chrome Extension (if installed)
    window.postMessage({
      __aetherial_from_page: true,
      type: 'BREW_POTION',
      payload: {
        name: selectedRecipe.name,
        effect: selectedRecipe.effect,
        brewTime: selectedRecipe.brewTime,
        ...brewResult,
      }
    }, '*')

    setBrewing(false)
  }

  const resetBrewing = () => {
    setSelectedRecipe(null)
    setResult(null)
    setDiceRoll(null)
  }

  const availability = selectedRecipe ? checkIngredientAvailability(selectedRecipe) : null

  return (
    <div className="brewing-station">
      <h2> Brewing Station</h2>

      {!selectedRecipe ? (
        <div className="recipe-selection">
          <h3>Select a Recipe</h3>
          <div style={{ display:"flex", gap:"10px", marginBottom:"16px", flexWrap:"wrap" }}>
            <input
              placeholder="Search recipes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex:1, minWidth:"140px", padding:"8px", background:"var(--bg-secondary)", border:"2px solid var(--border)", color:"var(--text-primary)", fontFamily:"inherit" }}
            />
            <select value={filterRarity} onChange={e => setFilterRarity(e.target.value)} style={{ padding:"8px", background:"var(--bg-secondary)", border:"2px solid var(--border)", color:"var(--text-primary)", fontFamily:"inherit" }}>
              <option value="all">All Rarities</option>
              {["Common","Uncommon","Rare","Very Rare","Legendary"].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <span style={{ color:"var(--text-secondary)", fontSize:"12px", alignSelf:"center" }}>
              {filteredRecipes.length}/{allRecipes.length}
            </span>
          </div>
          {filteredRecipes.length === 0 && allRecipes.length === 0 ? (
            <div className="card empty-state">
              <p>No recipes available. Create recipes in Custom Recipes first!</p>
            </div>
          ) : (
            <div className="recipes-list grid grid-2">
              {filteredRecipes.map(recipe => {
                const check = checkIngredientAvailability(recipe)
                return (
                  <div
                    key={recipe.id}
                    className={`card recipe-card ${!check.available ? 'unavailable' : ''}`}
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="recipe-header">
                      <h3>{recipe.name}</h3>
                      <span className={`rarity-badge rarity-${recipe.rarity.toLowerCase().replace(' ', '-')}`}>
                        {recipe.rarity}
                      </span>
                    </div>
                    <div className="recipe-meta">
                      <span> DC {recipe.dc}</span>
                      <span>⏱ {recipe.brewTime}</span>
                    </div>
                    {recipe.effect && (
                      <p className="recipe-effect"><strong>Effect:</strong> {recipe.effect}</p>
                    )}
                    {!check.available && (
                      <div className="missing-ingredients">
                        <strong> Missing Ingredients:</strong>
                        <ul>
                          {check.missing.map((miss, idx) => (
                            <li key={idx}>
                              {miss.name}: {miss.have}/{miss.needed}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {check.available && (
                      <button className="brew-button">Brew this Recipe</button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="brewing-process">
          <div className="card">
            <div className="brewing-header">
              <div>
                <h3>{selectedRecipe.name}</h3>
                <p className="brewing-dc">Difficulty: DC {selectedRecipe.dc}</p>
              </div>
              <button onClick={resetBrewing} className="btn-secondary">
                ← Back
              </button>
            </div>

            <div className="brewing-content">
              <div className="modifier-section">
                <label>Your Alchemy Bonus (Proficiency + Ability Modifier)</label>
                <input
                  type="number"
                  value={modifier}
                  onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                  min="-5"
                  max="15"
                  disabled={brewing}
                />
              </div>

              {!result && (
                <div className="dice-section">
                  {brewing ? (
                    <div className="dice-rolling">
                      <D20
                        rolling={diceRoll === null}
                        value={diceRoll}
                        isCrit={diceRoll === 20}
                        isFail={diceRoll === 1}
                      />
                      {diceRoll !== null && (
                        <p className="roll-announce">
                          {diceRoll === 20
                            ? 'Natural 20!'
                            : diceRoll === 1
                            ? 'Natural 1!'
                            : `You rolled a ${diceRoll}!`}
                        </p>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={handleBrew}
                      disabled={brewing || !availability?.available}
                      className="brew-action-button"
                    >
                       Roll and Brew!
                    </button>
                  )}
                </div>
              )}

              {result && (
                <div className={`brew-result ${result.success ? 'success' : 'failure'}`}>
                  <h3>{result.success ? 'Success!' : 'Failed!'}</h3>

                  <div className="result-d20-row">
                    <D20
                      rolling={false}
                      value={result.roll}
                      isCrit={result.critSuccess}
                      isFail={result.critFail}
                    />
                  </div>

                  <div className="roll-breakdown">
                    <div className="roll-detail">
                      <span>Roll:</span>
                      <strong className={result.critSuccess ? 'crit-success' : result.critFail ? 'crit-fail' : ''}>
                        {result.roll} {result.critSuccess && '(Critical Success!)'}
                        {result.critFail && '(Critical Failure!)'}
                      </strong>
                    </div>
                    <div className="roll-detail">
                      <span> Bonus:</span>
                      <strong>{result.modifier >= 0 ? '+' : ''}{result.modifier}</strong>
                    </div>
                    <div className="roll-detail total">
                      <span>= Total:</span>
                      <strong>{result.total}</strong>
                    </div>
                    <div className="roll-detail">
                      <span> Required:</span>
                      <strong>{result.dc}</strong>
                    </div>
                  </div>

                  <div className="quality-badge">
                    Quality: <strong>{result.quality}</strong>
                  </div>

                  {result.success ? (
                    <p className="result-message">
                      The potion was successfully brewed and added to your inventory!
                    </p>
                  ) : (
                    <p className="result-message">
                      The ingredients were consumed, but the brewing failed.
                    </p>
                  )}

                  <div className="roll20-sync-row">
                    {extensionActive
                      ? <span className="roll20-badge active">Sent to Roll20</span>
                      : <span className="roll20-badge inactive">
                          <a href="https://github.com/caaatto/aetherial-alchemy/tree/master/roll20-extension" target="_blank" rel="noreferrer">
                            Install extension
                          </a> to sync to Roll20
                        </span>
                    }
                  </div>

                  <div className="result-actions">
                    <button onClick={resetBrewing}>Brew Another Recipe</button>
                  </div>
                </div>
              )}

              {normalizeIngredients(selectedRecipe).length > 0 && (
                <div className="ingredients-used">
                  <h4>Consumed Ingredients:</h4>
                  <ul>
                    {normalizeIngredients(selectedRecipe).map((req, idx) => (
                      <li key={idx}>
                        {req.amount}x {getIngredientName(req.id)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrewingStation
