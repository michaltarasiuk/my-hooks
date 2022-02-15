import { useState, useRef, useMemo } from 'react'

type Config = {
  min: number
  max: number
}

const getNewState = (
  newValue: number,
  prevValue: number | undefined,
  config: Config
) => {
  if (newValue >= config.min && newValue <= config.max) {
    return newValue
  }

  return prevValue || config.min
}

const getConfig = (min: number = -Infinity, max: number = Infinity) => {
  return {
    min,
    max: Math.max(min, max),
  }
}

export const useCounter = (
  initialState: number = 0,
  min?: number,
  max?: number
) => {
  const { current: config } = useRef(getConfig(min, max))
  const [state, setState] = useState(
    getNewState(initialState, undefined, config)
  )

  const handler = useMemo(
    () => ({
      increase() {
        const newState = getNewState(state + 1, state, config)

        if (state !== newState) {
          setState(newState)
        }
      },
      decrease() {
        const newState = getNewState(state - 1, state, config)

        if (state !== newState) {
          setState(newState)
        }
      },
      set(newValue: number) {
        const newState = getNewState(newValue, state, config)

        if (state !== newState) {
          setState(newState)
        }
      },
      reset() {
        setState(getNewState(initialState, undefined, config))
      },
    }),
    [state]
  )

  return [state, handler] as const
}
