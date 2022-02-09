import { renderHook } from '@testing-library/react-hooks'

import { useDidUpdate } from '../src/useDidUpdate'

const mockEffectCallback = jest.fn()
const mockEffectCleanup = jest.fn()
mockEffectCallback.mockReturnValue(mockEffectCleanup)

describe('useDidUpdate', () => {
  it('should effect callback call on mount', () => {
    // arrange
    renderHook(() => useDidUpdate(mockEffectCallback))

    // assert
    expect(mockEffectCallback).toHaveBeenCalledTimes(1)
  })

  it('should effect cleanup call on unmount', () => {
    // given
    const { unmount } = renderHook(() => useDidUpdate(mockEffectCallback))

    // when
    unmount()

    // assert
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1)
  })

  it('should effect callback call on update', () => {
    // given
    const { rerender } = renderHook(() =>
      useDidUpdate(mockEffectCallback, Math.random())
    )

    // when
    rerender()

    // assert
    expect(mockEffectCallback).toHaveBeenCalledTimes(2)
  })
})