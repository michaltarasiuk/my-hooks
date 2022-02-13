import { useState, useRef, useCallback } from 'react'

import { useEventListener } from './useEventListener'

export const useMediaQuery = (media: string) => {
  const savedMediaQuery = useRef(window.matchMedia(media))
  const [matches, setMatches] = useState(savedMediaQuery.current.matches)

  const listener = useCallback(() => {
    savedMediaQuery.current = window.matchMedia(media)
    setMatches(savedMediaQuery.current.matches)
  }, [])

  useEventListener(savedMediaQuery.current, 'change', listener)

  return matches
}
