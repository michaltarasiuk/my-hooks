import { useRef, useState, useCallback } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { useDidUpdate } from 'src/hooks'

type Validator<TState> = (
  state: TState,
  setValidity?: Dispatch<SetStateAction<boolean>>
) => boolean

export const useStateValidator = <TState>(
  state: TState,
  validator: Validator<TState>
) => {
  const savedValidator = useRef(validator)
  const savedState = useRef(state)

  const [validity, setValidity] = useState(savedValidator.current(state))

  useDidUpdate(() => {
    savedValidator.current = validator
  }, validator)

  useDidUpdate(() => {
    savedState.current = state
  }, state)

  const validate = useCallback(() => {
    if (savedValidator.current.length === 2) {
      savedValidator.current(savedState.current, setValidity)
      return
    }

    const updatedValidity = savedValidator.current(savedState.current)
    setValidity(updatedValidity)
  }, [])

  return [validity, validate] as const
}
