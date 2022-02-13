import { useState } from 'react'

const isNill = (value: any) => value === undefined || value === null
const mock = <TValue>(newValue: TValue, mockValue: TValue) =>
  isNill(newValue) ? mockValue : newValue

export const useDefault = <TValue>(initialState: TValue, mockState: TValue) => {
  const [state, setState] = useState<TValue>(mock(initialState, mockState))

  return [mock(state, mockState), setState] as const
}
