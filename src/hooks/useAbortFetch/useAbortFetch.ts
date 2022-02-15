import { useCallback, useRef } from 'react'

import { useSafeState, useDidUpdate, useSyncedRef } from 'src/hooks'

type Status = 'idle' | 'loading' | 'success' | 'error'

export const useAbortFetch = <
  TData,
  TFetcher extends (signal: AbortSignal) => Promise<TData>
>(
  fetcher: TFetcher,
  onListener?: Function
) => {
  const [state, setState] = useSafeState<{ status: Status }>({
    status: 'idle',
  })
  const savedAbortController = useRef<AbortController | undefined>()
  const isAborted = useSyncedRef(
    savedAbortController.current?.signal.aborted || false
  )

  useDidUpdate(() => {
    const signal = savedAbortController.current?.signal

    if (signal) {
      const listener = () => {
        if (onListener) {
          onListener()
        }
      }

      signal.addEventListener('abort', listener)

      return () => {
        signal?.removeEventListener('abort', listener)
      }
    }
  }, savedAbortController.current)

  const createAbortController = useCallback(() => {
    const abortController = new AbortController()

    savedAbortController.current = abortController

    return abortController
  }, [])

  const applyAbortController = useCallback((fetcher: TFetcher) => {
    return {
      async execute() {
        const abortController = createAbortController()
        setState({ status: 'loading' })

        try {
          const result = await fetcher(abortController.signal)

          setState({ status: 'success' })

          return result
        } catch (error) {
          setState({ status: 'error' })

          if (error instanceof Error) {
            throw error
          }
        }
      },
      abort() {
        const abortController = savedAbortController.current

        if (abortController) {
          abortController.abort()
          setState({ status: 'idle' })
        }

        return { reexecute: this.execute }
      },
    }
  }, [])

  const methods = useRef(applyAbortController(fetcher))

  return [state, { ...methods.current, isAborted: isAborted.current }] as const
}
