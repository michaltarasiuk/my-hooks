import { useEffect } from 'react'
import type { EffectCallback } from 'react'

import { useIsMounted } from 'src/hooks'

export const useDidUpdate = (
  effectCallback: EffectCallback,
  ...dependencyList: any[]
) => {
  const component = useIsMounted()
  const dependencies = dependencyList.length ? dependencyList : undefined

  useEffect(() => {
    if (component.isMounted) {
      effectCallback()
    }
  }, dependencies)
}
