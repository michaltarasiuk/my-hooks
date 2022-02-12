import { useState, useCallback } from 'react'

import { useEventListener } from './useEventListener'

type Status = 'idle' | 'loading' | 'sucess' | 'error'

const isHtmlElement = (element: any): element is HTMLElement =>
  element instanceof HTMLElement

export const useFullScreen = <TElement extends Document | HTMLElement>(
  element: TElement,
  listener: Exclude<Parameters<TElement['addEventListener']>[1], null>
) => {
  const [state, setState] = useState<{ status: Status }>({ status: 'idle' })

  useEventListener(element, 'fullscreenchange', listener)

  const requestFullScreen = useCallback(async () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
      const requestFullScreen = isHtmlElement(element)
        ? element.requestFullscreen
        : element.documentElement.requestFullscreen

      setState({ status: 'loading' })

      try {
        await requestFullScreen()

        setState({ status: 'sucess' })
      } catch {
        setState({ status: 'error' })
      }
    }
  }, [])

  const exitFullscreen = useCallback(async () => {
    if (document.fullscreenEnabled && document.fullscreenElement) {
      setState({ status: 'loading' })

      try {
        document.exitFullscreen()

        setState({ status: 'idle' })
      } catch {
        setState({ status: 'error' })
      }
    }
  }, [])

  return [state, { requestFullScreen, exitFullscreen }] as const
}
