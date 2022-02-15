import { useRef } from 'react'

import { useDidUpdate } from '../useDidUpdate/useDidUpdate'

export type Compare<TValue> = (
  previousValue: TValue | undefined,
  value: TValue
) => boolean

export const usePreviousDistinct = <TValue>(
  value: TValue,
  compare: Compare<TValue>
) => {
  const savedValue = useRef<TValue | undefined>(undefined)

  useDidUpdate(() => {
    if (!compare(savedValue.current, value)) {
      savedValue.current = value
    }
  }, value)

  return savedValue.current
}
