import { renderHook, act } from '@testing-library/react-hooks'

import { useSafeState } from '../../../src/hooks'

describe('useSafeState', () => {
  it('should update state when component is mounted', () => {
    // given
    const { result } = renderHook(() => useSafeState(0))

    // when
    const setState = result.current[1]
    act(() => {
      // @ts-ignore
      setState((prevState) => prevState + 1)
    })

    // then
    expect(result.current[0]).toBe(1)
  })

  it('should not update state when component is unmounted', () => {
    // given
    const { result, unmount } = renderHook(() => useSafeState(0))

    // when
    const setState = result.current[1]
    act(() => {
      // @ts-ignore
      setState((prevState) => prevState + 1)
    })

    // then
    expect(result.current[0]).toBe(1)

    // when
    unmount()
    act(() => {
      // @ts-ignore
      setState((prevState) => prevState + 1)
    })

    // then
    expect(result.current[0]).toBe(1)
  })
})
