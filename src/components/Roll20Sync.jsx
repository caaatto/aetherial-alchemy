import { useState, useEffect } from 'react'
import './Roll20Sync.css'

function Roll20Sync({ inventory, onPushItem }) {
  const [extensionActive, setExtensionActive] = useState(false)
  const [characters, setCharacters]           = useState([])
  const [selectedChar, setSelectedChar]       = useState(null)
  const [loading, setLoading]                 = useState(false)
  const [loadingInventory, setLoadingInventory] = useState(false)
  const [roll20Items, setRoll20Items]         = useState(null)   // null = not loaded yet
  const [error, setError]                     = useState(null)
  const [pushStatus, setPushStatus]           = useState({})     // itemId → 'pushing'|'done'|'error'

  // ── Detect extension ─────────────────────────────────────────────────────
  useEffect(() => {
    if (window.__aetherialExtensionActive) {
      setExtensionActive(true)
    } else {
      window.addEventListener('aetherial-extension-ready', () => setExtensionActive(true), { once: true })
    }
  }, [])

  // ── Listen for character list response ────────────────────────────────────
  useEffect(() => {
    const handler = (event) => {
      setLoading(false)
      const { characters: chars, error: err } = event.detail
      if (err === 'no-roll20-tab') {
        setError('No Roll20 tab found. Open your Roll20 game first.')
        return
      }
      if (err) {
        setError(`Could not read characters: ${err}`)
        return
      }
      setError(null)
      setCharacters(chars || [])
      if (chars?.length > 0 && !selectedChar) {
        setSelectedChar(chars[0])
      }
    }
    window.addEventListener('aetherial-characters-result', handler)
    return () => window.removeEventListener('aetherial-characters-result', handler)
  }, [selectedChar])

  // ── Listen for Roll20 inventory response ──────────────────────────────────
  useEffect(() => {
    const handler = (event) => {
      setLoadingInventory(false)
      const { items, error: err } = event.detail
      if (err === 'timeout') {
        setError('Roll20 did not respond. Make sure the AetherialSync Mod Script is running.')
        return
      }
      if (err) {
        setError(`Could not read inventory: ${err}`)
        return
      }
      setError(null)
      setRoll20Items(items || [])
    }
    window.addEventListener('aetherial-inventory-result', handler)
    return () => window.removeEventListener('aetherial-inventory-result', handler)
  }, [])

  // ── Listen for push confirmations ─────────────────────────────────────────
  useEffect(() => {
    const handler = (event) => {
      const { success, item, error: err } = event.detail
      if (!item?.id) return
      setPushStatus(prev => ({ ...prev, [item.id]: success ? 'done' : 'error' }))
    }
    window.addEventListener('aetherial-push-item-result', handler)
    return () => window.removeEventListener('aetherial-push-item-result', handler)
  }, [])

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleSync = () => {
    setError(null)
    setLoading(true)
    setCharacters([])
    setSelectedChar(null)
    setRoll20Items(null)
    window.dispatchEvent(new CustomEvent('aetherial-request-characters'))
  }

  const handleLoadInventory = () => {
    if (!selectedChar) return
    setError(null)
    setLoadingInventory(true)
    setRoll20Items(null)
    window.dispatchEvent(new CustomEvent('aetherial-request-inventory', {
      detail: { characterId: selectedChar.id, characterName: selectedChar.name }
    }))
  }

  const handlePushItem = (item) => {
    if (!selectedChar) return
    const itemWithId = { ...item, id: item.id || `${item.name}-${Date.now()}` }
    setPushStatus(prev => ({ ...prev, [itemWithId.id]: 'pushing' }))
    if (onPushItem) onPushItem(selectedChar.id, itemWithId)
    window.dispatchEvent(new CustomEvent('aetherial-push-item', {
      detail: { characterId: selectedChar.id, item: itemWithId }
    }))
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
          <>
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
          </>
        )}
      </div>

      {error && (
        <p className="sync-error">{error}</p>
      )}

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
          <p className="push-hint">Select items from your inventory below to add them to the Roll20 character sheet.</p>

          {/* Potions to push */}
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

          {/* Herbs to push */}
          {Object.keys(inventory.ingredients || {}).length > 0 && (
            <div className="push-group">
              <h5>Herbs / Ingredients</h5>
              {Object.entries(inventory.ingredients).map(([herbId, count]) => {
                const pushId = `herb-${herbId}`
                const status = pushStatus[pushId]
                return (
                  <div key={herbId} className="push-item-row">
                    <span className="push-item-name">{herbId}</span>
                    <span className="push-item-meta">×{count}</span>
                    <button
                      onClick={() => handlePushItem({
                        id:       pushId,
                        name:     herbId,
                        quantity: count
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
        </div>
      )}
    </div>
  )
}

export default Roll20Sync
