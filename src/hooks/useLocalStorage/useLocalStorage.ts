import { useState, useCallback } from 'react'

const constructorEquality = <TValue extends unknown>(
  a: unknown,
  b: TValue
): a is TValue => {
  if (a instanceof Object && b instanceof Object) {
    return a.constructor === b.constructor
  }

  return a === b
}

export const useLocalStorage = <TValue>(key: string, defaultValue: TValue) => {
  const [state, setState] = useState<TValue>(() => {
    const deserializedItem = deserializeLocalStorageItem(key)

    if (
      deserializedItem.success &&
      constructorEquality(deserializedItem.value, defaultValue)
    ) {
      return deserializedItem.value
    }

    return defaultValue
  })

  const setItem = useCallback((newValue: TValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
    const deserializedItem = deserializeLocalStorageItem(key)

    if (
      deserializedItem.success &&
      constructorEquality(deserializedItem.value, defaultValue)
    ) {
      setState(deserializedItem.value)
    }
  }, [])

  return [state, setItem] as const
}

type DeserializedItem =
  | { success: true; value: unknown }
  | { success: false; error: Error }

const deserializeLocalStorageItem = (key: string): DeserializedItem => {
  const item = localStorage.getItem(key)

  if (item === null) {
    return {
      success: false,
      error: new Error(`Item with key "${key}" does not exist`),
    }
  }

  try {
    return {
      success: true,
      value: JSON.parse(item),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error,
      }
    }

    return {
      success: false,
      error: new Error(`Unable to parse item with key "${key}"`),
    }
  }
}
