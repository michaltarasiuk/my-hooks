import { useRef, useEffect } from 'react'

type Compare<TValue> = (prevValue: TValue | undefined, value: TValue) => boolean

export const useMemoCompare = <TValue>(
  value: TValue,
  compare: Compare<TValue>
) => {
  const savedValue = useRef<TValue | undefined>()

  const isEqual = compare(savedValue.current, value)

  useEffect(() => {
    if (!isEqual) {
      savedValue.current = value
    }
  })

  return isEqual ? savedValue.current : value
}
