import { useRef } from 'react'

import { useDidUpdate } from './useDidUpdate'

export const usePrevious = <TValue>(value: TValue) => {
  const savedValue = useRef<TValue | undefined>(undefined)

  useDidUpdate(() => {
    savedValue.current = value
  }, value)

  return savedValue.current
}
