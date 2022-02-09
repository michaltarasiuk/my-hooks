import { renderHook } from '@testing-library/react-hooks'
import { useLogger } from '../src/useLogger'

const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {})

describe('useLogger', () => {
  it('should log the provided props on mount', () => {
    // arrange
    renderHook(() => useLogger('component'))

    // assert
    expect(logSpy).toBeCalledTimes(2)
  })

  it('should log when the component has unmounted', () => {
    // given
    const { unmount } = renderHook(() => useLogger('component'))

    // when
    unmount()

    // then
    expect(logSpy).toBeCalledTimes(3)
  })

  it('should log updates as props change', () => {
    // given
    const { rerender } = renderHook(() => useLogger('component'))

    // when
    rerender()
    rerender()

    expect(logSpy).toHaveBeenCalledTimes(4)
  })
})
