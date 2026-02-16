import { useState, useEffect } from 'react'
import './ModuleManager.css'
import { aetherialModule, aetherialRecipes } from '../data/aetherialModule'
import { starterIngredients } from '../data/starterData'

function ModuleManager({ ingredients, setIngredients, recipes, setRecipes }) {
  const [unlockedNodes, setUnlockedNodes] = useState([])
  const [skillPoints, setSkillPoints] = useState(20) // Start with points for testing
  const [selectedNode, setSelectedNode] = useState(null)

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aetherial-progress')
    if (saved) {
      const data = JSON.parse(saved)
      setUnlockedNodes(data.unlockedNodes || [])
      setSkillPoints(data.skillPoints || 20)
    }
  }, [])

  // Save progress
  useEffect(() => {
    localStorage.setItem('aetherial-progress', JSON.stringify({
      unlockedNodes,
      skillPoints
    }))
  }, [unlockedNodes, skillPoints])

  const isUnlocked = (nodeId) => unlockedNodes.includes(nodeId)

  const canUnlock = (node) => {
    // Already unlocked
    if (isUnlocked(node.id)) return false

    // Not enough points
    if (skillPoints < node.cost) return false

    // Check requirements
    if (node.requires && node.requires.length > 0) {
      return node.requires.every(reqId => isUnlocked(reqId))
    }

    // No requirements means it's a starter node
    return node.cost === 0 || node.requires === undefined
  }

  const unlockNode = (node) => {
    if (!canUnlock(node)) return

    // Deduct points
    setSkillPoints(prev => prev - node.cost)

    // Add to unlocked
    setUnlockedNodes(prev => [...prev, node.id])

    // Add rewards to game
    if (node.rewards.ingredients) {
      const newIngredients = node.rewards.ingredients.map(name => {
        const existing = starterIngredients.find(ing => ing.name === name)
        return existing ? { ...existing, id: `${node.id}-${name}` } : null
      }).filter(Boolean)

      setIngredients(prev => [...prev, ...newIngredients])
    }

    if (node.rewards.recipes) {
      const newRecipes = node.rewards.recipes.map(name => {
        const template = aetherialRecipes.find(rec => rec.name === name)
        return template ? {
          ...template,
          id: `${node.id}-${name}`,
          description: `Unlocked from: ${node.name}`,
          requiredIngredients: []
        } : null
      }).filter(Boolean)

      setRecipes(prev => [...prev, ...newRecipes])
    }
  }

  const getNodesByTier = (tier) => {
    return aetherialModule.skillTree.filter(node => node.tier === tier)
  }

  const tiers = [1, 2, 3, 4, 5, 6]

  return (
    <div className="module-manager">
      <div className="module-header">
        <div className="module-title">
          <span className="module-icon">{aetherialModule.icon}</span>
          <div>
            <h2>{aetherialModule.name}</h2>
            <p className="module-desc">{aetherialModule.description}</p>
          </div>
        </div>
        <div className="skill-points-display">
          <div className="points-label">Skill Points</div>
          <div className="points-value">{skillPoints}</div>
        </div>
      </div>

      <div className="skill-tree">
        {tiers.map(tier => (
          <div key={tier} className="tier-row">
            <div className="tier-label">
              <span>Tier {tier}</span>
            </div>
            <div className="tier-nodes">
              {getNodesByTier(tier).map(node => {
                const unlocked = isUnlocked(node.id)
                const available = canUnlock(node)

                return (
                  <div
                    key={node.id}
                    className={`skill-node ${unlocked ? 'unlocked' : ''} ${available ? 'available' : 'locked'}`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="node-icon">{node.icon}</div>
                    <div className="node-name">{node.name}</div>
                    {node.cost > 0 && (
                      <div className="node-cost">{node.cost} SP</div>
                    )}
                    {unlocked && (
                      <div className="node-unlocked-badge">✓</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedNode && (
        <div className="node-details-panel">
          <div className="card">
            <button
              className="close-button"
              onClick={() => setSelectedNode(null)}
            >
              X
            </button>

            <div className="detail-header">
              <span className="detail-icon">{selectedNode.icon}</span>
              <div>
                <h3>{selectedNode.name}</h3>
                <p className="detail-tier">Tier {selectedNode.tier}</p>
              </div>
            </div>

            <p className="detail-description">{selectedNode.description}</p>

            <div className="detail-cost">
              {selectedNode.cost === 0 ? (
                <span className="free-badge">FREE</span>
              ) : (
                <span>Cost: {selectedNode.cost} Skill Points</span>
              )}
            </div>

            {selectedNode.requires && selectedNode.requires.length > 0 && (
              <div className="detail-requirements">
                <strong>Requires:</strong>
                <ul>
                  {selectedNode.requires.map(reqId => {
                    const reqNode = aetherialModule.skillTree.find(n => n.id === reqId)
                    const reqUnlocked = isUnlocked(reqId)
                    return (
                      <li key={reqId} className={reqUnlocked ? 'completed' : 'incomplete'}>
                        {reqUnlocked ? '✓' : '✗'} {reqNode?.name || reqId}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <div className="detail-rewards">
              <strong>Rewards:</strong>

              {selectedNode.rewards.ingredients && (
                <div className="reward-section">
                  <div className="reward-label">Ingredients:</div>
                  <ul>
                    {selectedNode.rewards.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedNode.rewards.recipes && (
                <div className="reward-section">
                  <div className="reward-label">Recipes:</div>
                  <ul>
                    {selectedNode.rewards.recipes.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {isUnlocked(selectedNode.id) ? (
              <button disabled className="unlock-button">
                Already Unlocked
              </button>
            ) : canUnlock(selectedNode) ? (
              <button
                className="unlock-button"
                onClick={() => {
                  unlockNode(selectedNode)
                  setSelectedNode(null)
                }}
              >
                Unlock for {selectedNode.cost} SP
              </button>
            ) : (
              <button disabled className="unlock-button">
                {skillPoints < selectedNode.cost ? 'Not Enough Points' : 'Requirements Not Met'}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="module-legend card">
        <h3>Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="skill-node unlocked mini">
              <div className="node-icon">✓</div>
            </div>
            <span>Unlocked</span>
          </div>
          <div className="legend-item">
            <div className="skill-node available mini">
              <div className="node-icon">○</div>
            </div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="skill-node locked mini">
              <div className="node-icon">✗</div>
            </div>
            <span>Locked</span>
          </div>
        </div>
        <p className="legend-note">
          Click on a node to see details and unlock it. You earn Skill Points by completing quests and discovering rare ingredients.
        </p>
      </div>
    </div>
  )
}

export default ModuleManager
