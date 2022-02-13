import { useState, useCallback } from 'react'

export const useLocalStorage = <TValue>(key: string, defaultValue: TValue) => {
  const [state, setState] = useState<TValue>(() => {
    const value = localStorage.getItem(key)

    if (value) {
      return JSON.parse(value)
    }

    localStorage.setItem(key, JSON.stringify(defaultValue))
    return defaultValue
  })

  const setItem = useCallback((newValue: TValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
    const item = localStorage.getItem(key)

    if (item) {
      setState(JSON.parse(item))
    }
  }, [])

  return [state, setItem] as const
}
