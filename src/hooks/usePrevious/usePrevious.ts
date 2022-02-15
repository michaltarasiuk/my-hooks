import { useRef } from 'react'

import { useDidUpdate } from 'src/hooks'

export const usePrevious = <TValue>(value: TValue) => {
  const savedValue = useRef<TValue | undefined>(undefined)

  useDidUpdate(() => {
    savedValue.current = value
  }, value)

  return savedValue.current
}
