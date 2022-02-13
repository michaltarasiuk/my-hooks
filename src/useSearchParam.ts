import { useRef, useCallback, useState } from 'react'

import { useEventListener } from './useEventListener'

export const useSearchParam = (name: string) => {
  const savedUrlSerachParams = useRef(
    new URLSearchParams(window.location.search)
  )
  const [state, setState] = useState<string | null>(null)

  const listener = useCallback(() => {
    savedUrlSerachParams.current = new URLSearchParams(window.location.search)

    const value = savedUrlSerachParams.current.get(name)
    setState(value)
  }, [])

  useEventListener(window, 'popstate', listener)
  useEventListener(window, 'pushstate', listener)
  useEventListener(window, 'replacestate', listener)

  return [state, savedUrlSerachParams.current] as const
}
