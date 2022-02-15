import { renderHook } from '@testing-library/react-hooks'

import { useQueue } from '../../../src/hooks'

describe('useQueue', () => {
  it('should set initial state', () => {
    // arrange
    const { result } = renderHook(() => useQueue([1]))

    // assert
    const handler = result.current
    expect(handler.state).toEqual([1])
  })

  it('should add value to queue', () => {
    // given
    const { result } = renderHook(() => useQueue([1]))

    // when
    const handler = result.current
    handler.add(2)

    // then
    expect(handler.state).toEqual([1, 2])
  })

  it('should remove value from queue', () => {
    // given
    const { result } = renderHook(() => useQueue([1]))

    // when
    const handler = result.current
    handler.add(2)

    // then
    expect(handler.state).toEqual([1, 2])

    // when
    handler.remove()

    // then
    expect(handler.size).toEqual(1)
  })
})
