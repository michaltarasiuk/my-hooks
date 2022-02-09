import { useState, useCallback, useRef } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { useDidUpdate } from '../src/useDidUpdate'

type ResolveableState<TState> = ((prevState?: TState) => TState) | TState
export type Mediator<TState> = (
  state: TState,
  setMediatedState?: Dispatch<SetStateAction<TState>>
) => TState

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

export const useMediatedState = <TState>(
  initialState: TState,
  mediator: Mediator<TState>
) => {
  const [mediatedState, setMediatedState] = useState<TState>(
    mediator(initialState)
  )
  const savedMediator = useRef(mediator)

  useDidUpdate(() => {
    savedMediator.current = mediator
  }, [mediator])

  const setState = useCallback((newState: ResolveableState<TState>) => {
    const resolvedState = resolveState(newState, mediatedState)

    if (savedMediator.current.length === 2) {
      savedMediator.current(resolvedState, setMediatedState)
      return
    }

    const formatedState = savedMediator.current(resolvedState)
    setMediatedState(formatedState)
  }, [])

  return [mediatedState, setState] as const
}
