import { useState } from 'react'

type Nill = undefined | null

const isNill = (value: any): value is Nill =>
  value === undefined || value === null
const mock = <TValue>(newValue: TValue, mockValue: TValue) =>
  isNill(newValue) ? mockValue : newValue

export const useDefault = <TValue>(initialState: TValue, mockState: TValue) => {
  const [state, setState] = useState<TValue | Nill>(
    mock(initialState, mockState)
  )

  return [mock(state, mockState), setState] as const
}
