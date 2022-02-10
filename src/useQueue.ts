import { useState } from 'react'

export const useQueue = <TValue>(initialState?: Array<TValue>) => {
  const [state, setState] = useState(new Set(initialState))

  return {
    get state() {
      return [...state]
    },
    get last() {
      return [...state][state.size - 1]
    },
    get first() {
      return [...state][0]
    },
    get size() {
      return state.size
    },
    add(newValue: TValue) {
      setState(state.add(newValue))
    },
    remove(value: TValue) {
      if (state.delete(value)) {
        setState(state)
      }
    },
  }
}
