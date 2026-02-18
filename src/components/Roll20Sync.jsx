import { useState, useEffect } from 'react'
import './Roll20Sync.css'

// postMessage tags — must match alchemy-bridge.js
const FROM_EXT  = '__aetherial_from_ext'
const FROM_PAGE = '__aetherial_from_page'

// Send a message to the extension content script
function toExt(type, payload) {
  window.postMessage({ [FROM_PAGE]: true, type, payload: payload ?? null }, '*')
}

function Roll20Sync({ inventory, ingredients }) {
  const [extensionActive, setExtensionActive]       = useState(false)
  const [characters, setCharacters]                 = useState([])
  const [selectedChar, setSelectedChar]             = useState(null)
  const [loading, setLoading]                       = useState(false)
  const [loadingInventory, setLoadingInventory]     = useState(false)
  const [roll20Items, setRoll20Items]               = useState(null)
  const [error, setError]                           = useState(null)
  const [pushStatus, setPushStatus]                 = useState({})

  // ── Listen for all messages from the extension ────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (!e.data?.[FROM_EXT]) return
      const msg = e.data

      // Extension detected
      if (msg.type === 'EXTENSION_READY') {
        setExtensionActive(true)
        return
      }

      // Character list received
      if (msg.type === 'CHARACTERS_RESULT') {
        setLoading(false)
        if (msg.error === 'no-roll20-tab') {
          setError('No Roll20 tab found. Open your Roll20 game first.')
          return
        }
        if (msg.error) {
          setError(`Could not read characters: ${msg.error}`)
          return
        }
        setError(null)
        const chars = msg.characters || []
        setCharacters(chars)
        if (chars.length > 0) setSelectedChar(prev => prev ?? chars[0])
        return
      }

      // Inventory data received
      if (msg.type === 'INVENTORY_RESULT') {
        setLoadingInventory(false)
        if (msg.error === 'timeout') {
          setError('Roll20 did not respond. Make sure the AetherialSync Mod Script is running.')
          return
        }
        if (msg.error) {
          setError(`Could not read inventory: ${msg.error}`)
          return
        }
        setError(null)
        setRoll20Items(msg.items || [])
        return
      }

      // Push confirmation
      if (msg.type === 'PUSH_ITEM_RESULT') {
        const item = msg.item
        if (item?.id) {
          setPushStatus(prev => ({ ...prev, [item.id]: msg.success ? 'done' : 'error' }))
        }
        return
      }
    }

    window.addEventListener('message', handler)

    // Ping — if the content script loaded before this component mounted it will respond
    toExt('PING')

    return () => window.removeEventListener('message', handler)
  }, [])

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleSync = () => {
    setError(null)
    setLoading(true)
    setCharacters([])
    setSelectedChar(null)
    setRoll20Items(null)
    toExt('REQUEST_CHARACTERS')
  }

  const handleLoadInventory = () => {
    if (!selectedChar) return
    setError(null)
    setLoadingInventory(true)
    setRoll20Items(null)
    toExt('REQUEST_INVENTORY', { characterId: selectedChar.id, characterName: selectedChar.name })
  }

  const handlePushItem = (item) => {
    if (!selectedChar) return
    const itemWithId = { ...item, id: item.id || `${item.name}-${Date.now()}` }
    setPushStatus(prev => ({ ...prev, [itemWithId.id]: 'pushing' }))
    toExt('PUSH_ITEM', { characterId: selectedChar.id, item: itemWithId })
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (!extensionActive) {
    return (
      <div className="roll20-sync-panel card">
        <h3>Roll20 Sync</h3>
        <p className="sync-inactive">
          Extension not detected.{' '}
          <a
            href="https://github.com/caaatto/aetherial-alchemy/tree/master/roll20-extension"
            target="_blank"
            rel="noreferrer"
          >
            Install the Aetherial extension
          </a>{' '}
          and reload this page.
        </p>
      </div>
    )
  }

  return (
    <div className="roll20-sync-panel card">
      <div className="sync-header">
        <h3>Roll20 Sync</h3>
        <span className="sync-status-dot active" title="Extension connected" />
      </div>

      <div className="sync-controls">
        <button onClick={handleSync} disabled={loading} className="sync-btn">
          {loading ? 'Loading characters…' : 'Synchronize with Roll20'}
        </button>

        {characters.length > 0 && (
          <div className="char-select-row">
            <select
              value={selectedChar?.id || ''}
              onChange={(e) => {
                const c = characters.find(c => c.id === e.target.value)
                setSelectedChar(c || null)
                setRoll20Items(null)
              }}
            >
              {characters.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button
              onClick={handleLoadInventory}
              disabled={loadingInventory || !selectedChar}
              className="load-inv-btn"
            >
              {loadingInventory ? 'Loading…' : 'Load Roll20 Inventory'}
            </button>
          </div>
        )}
      </div>

      {error && <p className="sync-error">{error}</p>}

      {roll20Items !== null && (
        <div className="roll20-inventory">
          <h4>
            {selectedChar?.name}'s Roll20 Inventory
            <span className="item-count"> ({roll20Items.length} items)</span>
          </h4>
          {roll20Items.length === 0 ? (
            <p className="sync-empty">No equipment items found on this character's sheet.</p>
          ) : (
            <ul className="roll20-items">
              {roll20Items.map((item, idx) => (
                <li key={idx} className="roll20-item">
                  <div className="roll20-item-info">
                    <strong>{item.name}</strong>
                    {item.quantity > 1 && <span className="roll20-qty"> ×{item.quantity}</span>}
                    {item.description && <span className="roll20-desc"> — {item.description}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selectedChar && inventory && (
        <div className="push-section">
          <h4>Push to {selectedChar.name}'s Roll20 Sheet</h4>
          <p className="push-hint">Add items from your inventory to the Roll20 character sheet.</p>

          {inventory.potions?.length > 0 && (
            <div className="push-group">
              <h5>Potions</h5>
              {inventory.potions.map(potion => {
                const status = pushStatus[potion.id]
                return (
                  <div key={potion.id} className="push-item-row">
                    <span className="push-item-name">{potion.name}</span>
                    <span className="push-item-meta">{potion.quality}</span>
                    <button
                      onClick={() => handlePushItem({
                        id:          potion.id,
                        name:        potion.name,
                        description: `${potion.effect} | Quality: ${potion.quality}`,
                        quantity:    1
                      })}
                      disabled={status === 'pushing' || status === 'done'}
                      className={`push-btn ${status === 'done' ? 'push-done' : status === 'error' ? 'push-error' : ''}`}
                    >
                      {status === 'pushing' ? '…' : status === 'done' ? '✓ Added' : status === 'error' ? '✗ Error' : '+ Add to Roll20'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {Object.keys(inventory.ingredients || {}).length > 0 && (
            <div className="push-group">
              <h5>Herbs / Ingredients</h5>
              {Object.entries(inventory.ingredients).map(([herbId, count]) => {
                const herb = (ingredients || []).find(ing => ing.id === herbId)
                const herbName = herb?.name || herbId
                const pushId = `herb-${herbId}`
                const status = pushStatus[pushId]
                return (
                  <div key={herbId} className="push-item-row">
                    <span className="push-item-name">{herbName}</span>
                    <span className="push-item-meta">×{count}</span>
                    <button
                      onClick={() => handlePushItem({ id: pushId, name: herbName, quantity: count })}
                      disabled={status === 'pushing' || status === 'done'}
                      className={`push-btn ${status === 'done' ? 'push-done' : status === 'error' ? 'push-error' : ''}`}
                    >
                      {status === 'pushing' ? '…' : status === 'done' ? '✓ Added' : status === 'error' ? '✗ Error' : '+ Add to Roll20'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Roll20Sync
