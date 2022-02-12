import { renderHook, act } from '@testing-library/react-hooks'

import { useFetch } from '../src/useFetch'

const wait = <TData>(ms = 0, data: TData) =>
  new Promise<TData>((res) => setTimeout(res, ms, data))

describe('useFetch', () => {
  it('should set status to loading before request', () => {
    // given
    const { result } = renderHook(() => useFetch(() => wait(Infinity, {})))

    // when
    const fetch = result.current[1]
    act(() => {
      fetch()
    })

    // then
    const state = result.current[0]
    expect(state.status).toBe('loading')
  })

  it('should set status to success', async () => {
    // given
    const { result } = renderHook(() =>
      useFetch(() => wait(1000, { data: [] }))
    )

    // when
    const fetch = result.current[1]
    await act(async () => {
      await fetch()
    })

    // then
    const state = result.current[0]
    expect(state.status).toBe('success')
  })
})
