import { renderHook, act } from '@testing-library/react-hooks'

import { useMergeState } from '../../../src/hooks'

describe('useMergeState', () => {
  it('should set state to initial value', () => {
    // arrange
    const { result } = renderHook(() => useMergeState({ data: [], value: 0 }))

    // assert
    expect(result.current[0]).toEqual({ data: [], value: 0 })
  })

  it('should set state to empty object if initial value is undefined', () => {
    // arrange
    const { result } = renderHook(() => useMergeState())

    // assert
    expect(result.current[0]).toEqual({})
  })

  it('should merge state after set state action', () => {
    // given
    const { result } = renderHook(() =>
      useMergeState({ data: [], value: 0, darkMode: false })
    )

    // when
    const setState = result.current[1]
    act(() => {
      // @ts-ignore
      setState((prevState) => ({ darkMode: !prevState.darkMode }))
    })

    // then
    expect(result.current[0]).toEqual({ data: [], value: 0, darkMode: true })
  })

  it('should merge state after set state action which has resolveableState', () => {
    // given
    const { result } = renderHook(() => useMergeState({ data: [], value: 0 }))

    // when
    const setState = result.current[1]
    act(() => {
      // @ts-ignore
      setState((prevState) => ({ value: prevState.value + 1 }))
    })

    // then
    expect(result.current[0]).toEqual({ data: [], value: 1 })
  })
})
