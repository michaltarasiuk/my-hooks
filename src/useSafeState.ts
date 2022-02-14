import { useState, useCallback } from 'react'

import { useIsMounted } from './useIsMounted'
import { resolveState } from './utils/resolveState'
import type { ResolveableState } from './utils/resolveState'

export const useSafeState = <TValue>(initialValue: TValue | (() => TValue)) => {
  const [state, setState] = useState(initialValue)
  const component = useIsMounted()

  const updateState = useCallback(
    (resolveableState: ResolveableState<TValue>) => {
      if (component.isMounted) {
        const resolvedState = resolveState(resolveableState, state)

        setState(resolvedState)
      }
    },
    [component, setState]
  )

  return [state, updateState] as const
}
