import { useState, useCallback } from 'react'

import { useDidUpdate } from 'src/hooks'

export const useDelayedState = <TValue>(
  initialValue: TValue,
  condition: any
) => {
  const [state, setState] = useState({
    value: initialValue,
    loaded: false,
  })

  useDidUpdate(
    () => {
      if (!state.loaded && condition) {
        setState((prevState) => ({ ...prevState, loaded: true }))
      }
    },
    condition,
    state.loaded
  )

  const updateState = useCallback(
    (newValue: TValue) => {
      if (state.loaded) {
        setState((prevState) => ({ ...prevState, value: newValue }))
      }
    },
    [state]
  )

  return [state, updateState] as const
}
