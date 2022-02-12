import { renderHook, act } from '@testing-library/react-hooks'

import { useCounter } from '../src/useCounter'

describe('useCounter', () => {
  it('it should increase value', () => {
    // given
    const { result } = renderHook(() => useCounter())

    // when
    const handler = result.current[1]
    act(() => {
      handler.increase()
    })

    //  then
    const counter = result.current[0]
    expect(counter).toBe(1)
  })

  it('it should decrease value', () => {
    // given
    const { result } = renderHook(() => useCounter(1))

    // when
    const handler = result.current[1]
    act(() => {
      handler.decrease()
    })

    //  then
    const counter = result.current[0]
    expect(counter).toBe(0)
  })

  it('it should reset counter to initial state', () => {
    // given
    const { result } = renderHook(() => useCounter(1))

    // when
    const handler = result.current[1]
    act(() => {
      handler.decrease()
    })

    //  then
    const counter = result.current[0]
    expect(counter).toBe(0)

    // when
    act(() => {
      handler.decrease()
    })

    // then
    const counter2 = result.current[0]
    expect(counter2).toBe(0)
  })

  it('should change counter to select value', () => {
    // given
    const { result } = renderHook(() => useCounter())

    // when
    const handler = result.current[1]
    act(() => {
      handler.set(5)
    })

    //  then
    const counter = result.current[0]
    expect(counter).toBe(5)
  })

  it('shoud should set correct value as initial', () => {
    // arrange
    const { result } = renderHook(() => useCounter(1000, 1, 100))

    // assert
    const counter = result.current[0]
    expect(counter).toBe(1)
  })

  it('should block set counter when new value is not in the range', () => {
    // given
    const { result } = renderHook(() => useCounter(0, 0, 1))

    // when
    const handler = result.current[1]
    act(() => {
      handler.set(5)
    })

    //  then
    const counter = result.current[0]
    expect(counter).toBe(0)
  })
})
