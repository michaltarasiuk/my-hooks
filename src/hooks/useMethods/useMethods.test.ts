import { renderHook, act } from '@testing-library/react-hooks'

import { useMethods } from '../../../src/hooks'

describe('useMethods', () => {
  it('should have initialState value as the returned state value', () => {
    // arrange
    const initialState = {
      count: 10,
    }

    // @ts-ignore
    const createMethods = (state) => ({
      doStuff: () => state,
    })

    const { result } = renderHook(() => useMethods(createMethods, initialState))

    // assert
    expect(result.current[0]).toEqual(initialState)
  })

  it('should return wrappedMethods object containing all the methods defined in createMethods', () => {
    // arrange
    const initialState = {
      count: 10,
    }

    // @ts-ignore
    const createMethods = (state) => ({
      reset() {
        return initialState
      },
      increment() {
        return { ...state, count: state.count + 1 }
      },
      decrement() {
        return { ...state, count: state.count - 1 }
      },
    })

    const { result } = renderHook(() => useMethods(createMethods, initialState))

    // assert
    for (const key of Object.keys(createMethods(initialState))) {
      // @ts-ignore
      expect(result.current[1][key]).toBeDefined()
    }
  })

  it('should properly update the state based on the createMethods', () => {
    // given
    const count = 10
    const initialState = {
      count,
    }

    // @ts-ignore
    const createMethods = (state) => ({
      reset() {
        return initialState
      },
      increment() {
        return { ...state, count: state.count + 1 }
      },
      decrement() {
        return { ...state, count: state.count - 1 }
      },
    })

    const { result } = renderHook(() => useMethods(createMethods, initialState))

    // when
    act(() => {
      result.current[1].increment()
    })
    expect(result.current[0].count).toBe(count + 1)

    act(() => {
      result.current[1].decrement()
    })
    expect(result.current[0].count).toBe(count)

    act(() => {
      result.current[1].decrement()
    })
    expect(result.current[0].count).toBe(count - 1)

    act(() => {
      result.current[1].reset()
    })

    // then
    expect(result.current[0].count).toBe(count)
  })
})
