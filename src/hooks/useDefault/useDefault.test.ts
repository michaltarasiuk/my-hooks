import { renderHook, act } from '@testing-library/react-hooks'

import { useDefault } from '../../../src/hooks'

describe('useDefault', () => {
  it('should return mock value when initial value is nill', () => {
    // arrange
    const { result } = renderHook(() => useDefault(undefined, 'Hello world'))

    // assert
    expect(result.current[0]).toBe('Hello world')
  })

  it('should return value when initial value is not nill', () => {
    // arrange
    const { result } = renderHook(() => useDefault('Hello', 'Hello world'))

    // assert
    expect(result.current[0]).toBe('Hello')
  })

  it('should return mock value when state after set state action is nill', () => {
    // given
    const { result } = renderHook(() => useDefault('Hello', 'Hello world'))

    // when
    const setState = result.current[1]
    act(() => {
      setState(undefined)
    })

    // then
    expect(result.current[0]).toBe('Hello world')
  })
})
