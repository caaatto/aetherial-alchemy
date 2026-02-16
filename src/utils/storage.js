import { starterIngredients, starterRecipes } from '../data/starterData'

const STORAGE_KEY = 'dnd-alchemy-data'
const INITIALIZED_KEY = 'dnd-alchemy-initialized'

export const loadData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    const isInitialized = localStorage.getItem(INITIALIZED_KEY)

    // Beim ersten Start: Lade Starter-Daten
    if (!isInitialized) {
      const starterData = {
        ingredients: starterIngredients.map((ing, idx) => ({
          ...ing,
          id: `starter-ing-${idx}`
        })),
        recipes: starterRecipes.map((rec, idx) => ({
          ...rec,
          id: `starter-rec-${idx}`
        })),
        inventory: {
          ingredients: {},
          potions: []
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(starterData))
      localStorage.setItem(INITIALIZED_KEY, 'true')
      return starterData
    }

    return data ? JSON.parse(data) : {}
  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error)
    return {}
  }
}

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error)
  }
}

export const exportData = () => {
  const data = loadData()
  const dataStr = JSON.stringify(data, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `alchemy-data-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}
