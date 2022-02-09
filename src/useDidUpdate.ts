import { useEffect } from 'react'
import type { EffectCallback } from 'react'

import { useIsMounted } from '../src/useIsMounted'

export const useDidUpdate = (
  effectCallback: EffectCallback,
  ...dependencies: any[]
) => {
  const component = useIsMounted()

  useEffect(() => {
    if (component.isMounted) {
      effectCallback()
    }
  }, dependencies)
}
