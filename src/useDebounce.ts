import { useState } from 'react'

import { useDidUpdate } from './useDidUpdate'

export const useDebounce = <TValue>(value: TValue, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useDidUpdate(
    () => {
      const timeout = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(timeout)
      }
    },
    value,
    delay
  )

  return debouncedValue
}
