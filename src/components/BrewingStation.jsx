import { useState, useEffect } from 'react'
import './BrewingStation.css'
import D20 from './D20'

function BrewingStation({ recipes, ingredients, inventory, setInventory }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [modifier, setModifier] = useState(0)
  const [brewing, setBrewing] = useState(false)
  const [result, setResult] = useState(null)
  const [diceRoll, setDiceRoll] = useState(null)
  const [extensionActive, setExtensionActive] = useState(false)

  useEffect(() => {
    // Detect the extension via postMessage (content scripts use an isolated world;
    // postMessage is the only reliable cross-boundary channel)
    const handler = (e) => {
      if (e.data?.__aetherial_from_ext && e.data.type === 'EXTENSION_READY') {
        setExtensionActive(true)
      }
    }
    window.addEventListener('message', handler)
    // Ping — handles the case where the content script loaded before this component mounted
    window.postMessage({ __aetherial_from_page: true, type: 'PING' }, '*')
    return () => window.removeEventListener('message', handler)
  }, [])

  const getIngredientName = (ingredientId) => {
    return ingredients.find(ing => ing.id === ingredientId)?.name || 'Unknown'
  }

  const checkIngredientAvailability = (recipe) => {
    if (!recipe.requiredIngredients || recipe.requiredIngredients.length === 0) {
      return { available: true, missing: [] }
    }

    const missing = []
    for (const reqIng of recipe.requiredIngredients) {
      const available = inventory.ingredients[reqIng.ingredientId] || 0
      if (available < reqIng.amount) {
        missing.push({
          name: getIngredientName(reqIng.ingredientId),
          needed: reqIng.amount,
          have: available
        })
      }
    }

    return { available: missing.length === 0, missing }
  }

  const rollDice = () => {
    return Math.floor(Math.random() * 20) + 1
  }

  const consumeIngredients = (recipe) => {
    const newIngredients = { ...inventory.ingredients }

    for (const reqIng of recipe.requiredIngredients) {
      if (newIngredients[reqIng.ingredientId]) {
        newIngredients[reqIng.ingredientId] -= reqIng.amount
        if (newIngredients[reqIng.ingredientId] <= 0) {
          delete newIngredients[reqIng.ingredientId]
        }
      }
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
    const success = total >= dc
    const critSuccess = roll === 20
    const critFail = roll === 1

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
    if (success || critSuccess) {
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
      success: success || critSuccess,
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
      <h2>🧪 Brewing Station</h2>

      {!selectedRecipe ? (
        <div className="recipe-selection">
          <h3>Select a Recipe</h3>
          {recipes.length === 0 ? (
            <div className="card empty-state">
              <p>No recipes available. Create recipes in Custom Recipes first!</p>
            </div>
          ) : (
            <div className="recipes-list grid grid-2">
              {recipes.map(recipe => {
                const check = checkIngredientAvailability(recipe)
                return (
                  <div
                    key={recipe.id}
                    className={`card recipe-card ${!check.available ? 'unavailable' : ''}`}
                    onClick={() => check.available && setSelectedRecipe(recipe)}
                  >
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
                      <p className="recipe-effect"><strong>Effect:</strong> {recipe.effect}</p>
                    )}
                    {!check.available && (
                      <div className="missing-ingredients">
                        <strong>⚠️ Missing Ingredients:</strong>
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
                            ? '⭐ Natural 20!'
                            : diceRoll === 1
                            ? '💀 Natural 1!'
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
                      🎲 Roll and Brew!
                    </button>
                  )}
                </div>
              )}

              {result && (
                <div className={`brew-result ${result.success ? 'success' : 'failure'}`}>
                  <h3>{result.success ? '✅ Success!' : '❌ Failed!'}</h3>

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
                      <span>➕ Bonus:</span>
                      <strong>{result.modifier >= 0 ? '+' : ''}{result.modifier}</strong>
                    </div>
                    <div className="roll-detail total">
                      <span>= Total:</span>
                      <strong>{result.total}</strong>
                    </div>
                    <div className="roll-detail">
                      <span>🎯 Required:</span>
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
                      ? <span className="roll20-badge active">📡 Sent to Roll20</span>
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

              {availability && availability.available && selectedRecipe.requiredIngredients.length > 0 && (
                <div className="ingredients-used">
                  <h4>Consumed Ingredients:</h4>
                  <ul>
                    {selectedRecipe.requiredIngredients.map((reqIng, idx) => (
                      <li key={idx}>
                        {reqIng.amount}x {getIngredientName(reqIng.ingredientId)}
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
