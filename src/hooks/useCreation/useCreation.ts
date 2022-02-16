import { useRef } from 'react'
import type { DependencyList } from 'react'

import { useIsMounted } from '../../hooks'

const dependenciesAreSame = (
  previousDependencies: DependencyList,
  nextDependencies: DependencyList
) => {
  for (const index in previousDependencies) {
    if (previousDependencies[index] !== nextDependencies[index]) {
      return false
    }
  }

  return true
}

export const useCreation = <TValue>(
  factory: () => TValue,
  ...dependencies: DependencyList
) => {
  const component = useIsMounted()
  const state = useRef({
    dependencies: [] as DependencyList,
    value: undefined as unknown as TValue,
  })

  if (
    !component.isMounted ||
    !dependenciesAreSame(state.current.dependencies, dependencies)
  ) {
    state.current = {
      dependencies,
      value: factory(),
    }
  }

  return state.current
}
