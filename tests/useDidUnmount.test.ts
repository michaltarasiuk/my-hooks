import { renderHook } from '@testing-library/react-hooks'
import { useDidUnMount } from '../src/useDidUnMount'

describe('useUnmount', () => {
  it('should not call provided callback on re-renders', () => {
    const spy = jest.fn()
    const hook = renderHook(() => useDidUnMount(spy))

    hook.rerender()
    hook.rerender()
    hook.rerender()
    hook.rerender()

    expect(spy).not.toHaveBeenCalled()
  })

  it('should call provided callback on unmount', () => {
    const spy = jest.fn()
    const hook = renderHook(() => useDidUnMount(spy))

    hook.unmount()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should call provided callback if is has been changed', () => {
    const spy = jest.fn()
    const spy2 = jest.fn()
    const spy3 = jest.fn()
    const hook = renderHook((cb) => useDidUnMount(cb), { initialProps: spy })

    hook.rerender(spy2)
    hook.rerender(spy3)
    hook.unmount()

    expect(spy3).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
