import { useState, useCallback } from 'react'

type ResolveableState<TState> =
  | ((prevState?: TState) => Partial<TState>)
  | Partial<TState>

const isFunction = (value: any): value is Function =>
  typeof value === 'function'

export const resolveState = <TState>(
  resolveableState: ResolveableState<TState>,
  prevState: TState
) => {
  if (isFunction(resolveableState)) {
    return resolveableState.length
      ? resolveableState(prevState)
      : resolveableState()
  }

  return resolveableState
}

export const useMergeState = <TValue>(initialValue: TValue) => {
  const [state, setState] = useState(initialValue)

  const mergeState = useCallback(
    (resolveableState: ResolveableState<TValue>) => {
      const resolvedState = resolveState(resolveableState, state)
      setState((previousState) => ({ ...previousState, ...resolvedState }))
    },
    [state, setState]
  )

  return [state, mergeState] as const
}
