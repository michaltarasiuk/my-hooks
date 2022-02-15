import { useState, useMemo } from 'react'

export const useSet = <TValue>(initialState: Set<TValue> = new Set()) => {
  const [state, setState] = useState(initialState)

  const handler = useMemo(
    () => ({
      add(newValue: TValue) {
        const previousSize = state.size
        state.add(newValue)

        if (previousSize !== state.size) {
          setState(state)
        }
      },
      clear() {
        state.clear()
        setState(state)
      },
      delete(value: TValue) {
        if (state.delete(value)) {
          setState(state)
        }
      },
    }),
    [state]
  )

  return [state, handler] as const
}
