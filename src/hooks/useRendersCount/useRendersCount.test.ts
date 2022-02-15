import { renderHook } from '@testing-library/react-hooks'

import { useRendersCount } from '../../../src/hooks'

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
})
