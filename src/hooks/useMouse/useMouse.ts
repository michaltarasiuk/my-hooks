import { useRef, useCallback } from 'react'

import { useEventListener } from '../../hooks'

export const useMouse = () => {
  const state = useRef({
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
  })

  const listener = useCallback((event: MouseEvent) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event

    state.current = {
      screenX,
      screenY,
      clientX,
      clientY,
      pageX,
      pageY,
    }
  }, [])

  useEventListener(window, 'mousemove', listener)

  return state
}
