import { useState, useDebugValue } from 'react'

export const useStateWithLabel = <TValue>(
  initialValue: TValue,
  label: string
) => {
  const [value, setValue] = useState(initialValue)
  useDebugValue(`${label}: ${value}`)
  return [value, setValue]
}
