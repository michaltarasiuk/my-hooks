import { useEffect } from 'react'
import type { EffectCallback } from 'react'

export const useDidUpdate = (
  effectCallback: EffectCallback,
  ...dependencies: any[]
) => {
  useEffect(effectCallback, dependencies)
}
