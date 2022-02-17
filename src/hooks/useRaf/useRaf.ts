import { useState, useRef, useCallback } from 'react'

import { useDidMount } from 'src/hooks'
import { resolveState } from 'src/utils'
import type { ResolveableState } from 'src/utils'

export const useRaf = <TValue>(initialValue: TValue) => {
  const savedRequestAnimationFrame = useRef<number>()
  const [state, setState] = useState(initialValue)

  useDidMount(() => {
    return () => {
      clearRequestAnimationFrame()
    }
  })

  const clearRequestAnimationFrame = useCallback(() => {
    if (savedRequestAnimationFrame.current) {
      cancelAnimationFrame(savedRequestAnimationFrame.current)
    }
  }, [])

  const updateState = useCallback(
    (resolveableState: ResolveableState<TValue>) => {
      clearRequestAnimationFrame()

      savedRequestAnimationFrame.current = requestAnimationFrame(() => {
        const resolvedState = resolveState(resolveableState, state)
        setState(resolvedState)
      })
    },
    []
  )

  return [state, updateState] as const
}
