import { useState } from 'react'

import { useDidMount } from '../../hooks'

const QUERY = '(prefers-reduced-motion: no-preference)'
const isRenderingOnServer = typeof window === 'undefined'

const getInitialState = () => {
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches
}

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState)

  useDidMount(() => {
    const mediaQueryList = window.matchMedia(QUERY)

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches)
    }

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener)
    } else {
      mediaQueryList.addListener(listener)
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener)
      } else {
        mediaQueryList.removeListener(listener)
      }
    }
  })

  return prefersReducedMotion
}
