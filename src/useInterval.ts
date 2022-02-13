import { useRef } from 'react'

import { useDidUpdate } from './useDidUpdate'

type Noop = () => void

export const useInterval = (callback: Noop, delay: number) => {
  const savedCallback = useRef(callback)

  useDidUpdate(() => {
    savedCallback.current = callback
  }, callback)

  useDidUpdate(() => {
    const interval = setInterval(savedCallback.current, delay)

    return () => {
      clearInterval(interval)
    }
  }, delay)
}
