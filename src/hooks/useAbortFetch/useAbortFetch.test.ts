import { renderHook, act } from '@testing-library/react-hooks'

import { useAbortFetch } from '../../hooks'

const renderAbortFetchHook = () => {
  const listener = jest.fn()
  const { result } = renderHook(() =>
    useAbortFetch(
      (signal: AbortSignal) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (signal.aborted) {
              reject('aborted')
              return
            }

            resolve('resolved')
          }, 1000)
        }),
      listener
    )
  )

  return {
    hook: result,
    listener,
  }
}

describe('useAbortFetch', () => {
  it('should execute fetcher', async () => {
    // given
    const { hook } = renderAbortFetchHook()

    // when
    const methods = hook.current[1]

    await act(async () => {
      await methods.execute()
    })

    // then
    expect(hook.current[0].status).toBe('success')
  })

  it('should abort fetcher', async () => {
    // given
    const { hook } = renderAbortFetchHook()

    // when
    const methods = hook.current[1]

    await act(async () => {
      methods.execute()
      methods.abort()
    })

    // then
    expect(hook.current[0].status).toBe('idle')
    expect(hook.current[1].isAborted).toBeTruthy()
  })

  it('should reexectue fetcher', async () => {
    // given
    const { hook } = renderAbortFetchHook()

    // when
    const methods = hook.current[1]

    await act(async () => {
      methods.execute()
      const { reexecute } = methods.abort()
      await reexecute()
    })

    // then
    expect(hook.current[0].status).toBe('success')
    expect(hook.current[1].isAborted).toBeFalsy()
  })

  it.only('should invoke listener on abort', async () => {
    // given
    const { hook, listener } = renderAbortFetchHook()

    // when
    const methods = hook.current[1]
    await act(async () => {
      await methods.execute()
      methods.abort()
    })

    // then
    expect(listener).toHaveBeenCalled()
  })
})
