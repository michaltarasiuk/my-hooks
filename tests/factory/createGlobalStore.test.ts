import { renderHook, act } from '@testing-library/react-hooks'

import { createGlobalStore } from '../../src/factory/createGLobalStore'

describe('createGlobalState', () => {
  it('should subscribe on component mount', () => {
    // given
    const store = createGlobalStore({ counter: 0 })
    const { useGlobalState } = store
    const { rerender } = renderHook(() => useGlobalState())

    // when
    rerender()

    // then
    expect(store.subscribers).toHaveLength(1)
  })

  it('should unsubscribe on unmount component', () => {
    // given
    const store = createGlobalStore({ counter: 0 })
    const { useGlobalState } = store
    const { rerender, unmount } = renderHook(() => useGlobalState())

    // when
    rerender()

    // then
    expect(store.subscribers).toHaveLength(1)

    // when
    unmount()

    // then
    expect(store.subscribers).toHaveLength(0)
  })

  it('should notify all subscriber on state change', () => {
    // given
    const store = createGlobalStore({ counter: 0 })
    const { useGlobalState } = store
    const { rerender, result } = renderHook(() => useGlobalState())

    // when
    rerender()

    // then
    expect(store.subscribers).toHaveLength(1)

    // when
    const setGlobalState = result.current[1]
    act(() => {
      setGlobalState({ counter: 1 })
    })

    // then
    const globalState = result.current[0]
    expect(globalState).toEqual({ counter: 1 })
  })
})
