import { renderHook } from '@testing-library/react-hooks'

import { useDidUnMount } from '../../../src/hooks'

describe('useUnmount', () => {
  it('should not call provided callback on re-renders', () => {
    // given
    const spy = jest.fn()
    const hook = renderHook(() => useDidUnMount(spy))

    // when
    hook.rerender()
    hook.rerender()
    hook.rerender()
    hook.rerender()

    // then
    expect(spy).not.toHaveBeenCalled()
  })

  it('should call provided callback on unmount', () => {
    // given
    const spy = jest.fn()
    const hook = renderHook(() => useDidUnMount(spy))

    // when
    hook.unmount()

    // then
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call provided callback if is has been changed', () => {
    // given
    const spy = jest.fn()
    const spy2 = jest.fn()
    const spy3 = jest.fn()
    const hook = renderHook((cb) => useDidUnMount(cb), { initialProps: spy })

    // when
    hook.rerender(spy2)
    hook.rerender(spy3)
    hook.unmount()

    // then
    expect(spy3).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
