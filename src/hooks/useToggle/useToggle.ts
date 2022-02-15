import { useState } from 'react'

export const useToggle = (initialState: boolean) => {
  const [state, setState] = useState(initialState)

  const toggle = (nextValue?: boolean) => {
    setState((prevState) => nextValue || !prevState)
  }

  return [state, toggle] as const
}
