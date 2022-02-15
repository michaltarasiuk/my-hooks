import { renderHook } from '@testing-library/react-hooks'

import { useDidMount } from '../../../src/hooks'

const mockEffectCallback = jest.fn()
const mockEffectCleanup = jest.fn()
mockEffectCallback.mockReturnValue(mockEffectCleanup)

describe('useDidMount', () => {
  it('should run provided effect only once', () => {
    // given
    const { rerender } = renderHook(() => useDidMount(mockEffectCallback))

    // when
    rerender()

    // then
    expect(mockEffectCallback).toHaveBeenCalledTimes(1)
  })

  it('should run clean-up provided on unmount', () => {
    // given
    const { unmount } = renderHook(() => useDidMount(mockEffectCallback))

    // when
    unmount()

    // then
    expect(mockEffectCleanup).toHaveBeenCalled()
  })
})
