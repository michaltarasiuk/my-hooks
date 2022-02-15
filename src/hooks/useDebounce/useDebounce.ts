import { useState } from 'react'

import { useDidUpdate } from 'src/hooks'

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
