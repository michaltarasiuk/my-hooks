import { useState, useCallback } from 'react'

import { useEventListener } from './useEventListener'
import { useDidMount } from './useDidMount'

type WindowSize = {
  width: number | undefined
  height: number | undefined
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  })

  const listener = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useDidMount(() => {
    listener()
  })

  useEventListener(window, 'resize', listener)

  return windowSize
}
