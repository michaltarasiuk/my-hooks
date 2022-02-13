import { useRef } from 'react'

import { useDidUpdate } from './useDidUpdate'

type Noop = () => void

export const useTimeout = (callback: Noop, delay: number) => {
  const savedCallback = useRef(callback)

  useDidUpdate(() => {
    savedCallback.current = callback
  }, callback)

  useDidUpdate(() => {
    const timeout = setTimeout(savedCallback.current, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, delay)
}
