import { useState, useMemo } from 'react'

export const useMap = (initialValues: Array<[any, any]> = []) => {
  const [state, setState] = useState(new Map(initialValues))

  const handler = useMemo(
    () => ({
      set(key: any, value: any) {
        state.set(key, value)
        setState(state)
      },
      delete(key: any) {
        if (state.delete(key)) {
          setState(state)
        }
      },
      clear() {
        state.clear()
        setState(state)
      },
      reset() {
        setState(new Map(initialValues))
      },
    }),
    [state]
  )

  return [state, handler] as const
}
