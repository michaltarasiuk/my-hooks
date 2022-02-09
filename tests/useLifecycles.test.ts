import { renderHook } from '@testing-library/react-hooks'

import { useLifecycles } from '../src/useLifecycles'

const mockEffectCallback = jest.fn()
const mockEffectCleanup = jest.fn()

describe('useLifecycles', () => {
  it('should run provided effect callback only once on mount', () => {
    // given
    const { rerender } = renderHook(() =>
      useLifecycles(mockEffectCallback, mockEffectCleanup)
    )

    // when
    rerender()

    // then
    expect(mockEffectCallback).toHaveBeenCalledTimes(1)
  })

  it('should run provided effect cleanup only once on unmount', () => {
    // given
    const { unmount } = renderHook(() =>
      useLifecycles(mockEffectCallback, mockEffectCleanup)
    )

    // when
    unmount()

    // then
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1)
  })
})
