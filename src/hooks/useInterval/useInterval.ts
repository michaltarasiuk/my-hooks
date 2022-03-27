import { useRef } from 'react'

import { useDidUpdate } from 'src/hooks'

type Noop = () => void

export const useInterval = (callback: Noop, delay: number | null) => {
  const savedCallback = useRef(callback)

  useDidUpdate(() => {
    savedCallback.current = callback
  }, callback)

  useDidUpdate(() => {
    if (delay) {
      const interval = setInterval(savedCallback.current, delay)

      return () => {
        clearInterval(interval)
      }
    }
  }, delay)
}
