import { useRef } from 'react'

export const useLatest = <TValue>(value: TValue) => {
  const ref = useRef(value)
  ref.current = value
  return ref
}
