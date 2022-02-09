import { renderHook } from '@testing-library/react-hooks'

import { useRendersCount } from '../src/useRendersCount'

describe('useRendersCount', () => {
  it('should count renders', () => {
    // given
    const { result, rerender } = renderHook(() => useRendersCount())

    // when
    rerender()
    rerender()
    rerender()

    // then
    expect(result.current).toBe(4)
  })

  it('not should reset counter when unmount component', () => {
    // given
    const { result, rerender, unmount } = renderHook(() => useRendersCount())

    // when
    rerender()
    rerender()

    // then
    expect(result.current).toBe(3)

    // when
    unmount()

    // then
    expect(result.current).toBe(3)
  })
})
