import { renderHook } from '@testing-library/react-hooks'

import { useSet } from '../../../src/hooks'

describe('useSet', () => {
  it('should set state to inital', () => {
    // arrange
    const { result } = renderHook(() => useSet(new Set([1])))

    // assert
    expect(result.current[0]).toEqual(new Set([1]))
  })

  it('should add value to state', () => {
    // given
    const { result } = renderHook(() => useSet())

    // when
    const handler = result.current[1]
    handler.add(1)

    // then
    expect(result.current[0]).toEqual(new Set([1]))
  })

  it('should remove value from state', () => {
    // given
    const { result } = renderHook(() => useSet(new Set([1])))

    // when
    const handler = result.current[1]
    handler.delete(1)

    // then
    expect(result.current[0]).toEqual(new Set())
  })

  it('should clear state', () => {
    // given
    const { result } = renderHook(() => useSet(new Set([1, 2, 3])))

    // when
    const handler = result.current[1]
    handler.clear()

    // then
    expect(result.current[0]).toEqual(new Set())
  })
})
