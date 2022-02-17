import { renderHook } from '@testing-library/react-hooks'

import { useEventEmitter } from '../../hooks'

describe('useEventEmitter', () => {
  it('it should invoke subscriber', () => {
    // given
    const { result } = renderHook(() => useEventEmitter())

    // when
    const subscriber = jest.fn()
    result.current.subscribe(subscriber)
    result.current.emit()

    // then
    expect(subscriber).toHaveBeenCalled()
  })

  it('it should delete subscriber', () => {
    // given
    const { result } = renderHook(() => useEventEmitter())

    // when
    const subscriber = jest.fn()
    const listener = result.current.subscribe(subscriber)
    result.current.emit()

    // then
    expect(subscriber).toHaveBeenCalled()

    // when
    listener.unsubscribe()
    result.current.emit()

    // then
    expect(subscriber).toHaveBeenCalledTimes(1)
  })
})
