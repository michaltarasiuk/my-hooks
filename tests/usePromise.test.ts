import { renderHook } from '@testing-library/react-hooks'

import { usePromise } from '../src/usePromise'

const wait = (ms: number, callback: Function) =>
  new Promise((res) =>
    setTimeout(() => {
      callback()
      res({ data: [] })
    }, ms)
  )

describe('usePromise', () => {
  it('shoud call promise after component mount', async () => {
    // given
    const { result } = renderHook(() => usePromise())

    // when
    const callback = jest.fn()
    await result.current(wait(100, callback))

    // then
    expect(callback).toHaveBeenCalled()
  })

  it('should not call promise when component is unmouned', async () => {
    // given
    const { result, unmount } = renderHook(() => usePromise())

    // when
    unmount()
    const callback = jest.fn()
    result.current(wait(100, callback))

    // then
    expect(callback).not.toHaveBeenCalled()
  })
})
