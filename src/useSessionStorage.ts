import { useState, useCallback } from 'react'

export const useSessionStorage = <TValue>(
  key: string,
  defaultValue: TValue
) => {
  const [state, setState] = useState<TValue>(() => {
    const value = sessionStorage.getItem(key)

    if (value) {
      return JSON.parse(value)
    }

    sessionStorage.setItem(key, JSON.stringify(defaultValue))
    return defaultValue
  })

  const setItem = useCallback((newValue: TValue) => {
    sessionStorage.setItem(key, JSON.stringify(newValue))
    const item = sessionStorage.getItem(key)

    if (item) {
      setState(JSON.parse(item))
    }
  }, [])

  return [state, setItem] as const
}
