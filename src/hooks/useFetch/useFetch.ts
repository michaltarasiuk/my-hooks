import { useSafeState } from 'src/hooks'

type Status = 'idle' | 'loading' | 'success' | 'error'
export type Fetcher<TData> = (...params: any[]) => Promise<TData>

export const useFetch = <TData>(fetcher: Fetcher<TData>) => {
  const [state, setState] = useSafeState<{ status: Status }>({ status: 'idle' })

  const fetch = async (...params: Parameters<typeof fetcher>) => {
    setState({ status: 'loading' })

    try {
      const data = await fetcher(...params)

      setState({ status: 'success' })

      return data
    } catch (error) {
      setState({ status: 'error' })

      if (error instanceof Error) {
        throw error
      }

      throw Error(`something went wrong  ¯\_(ツ)_/¯`)
    }
  }

  return [state, fetch] as const
}
