import { useDidMount } from './useDidMount'
import { useDidUpdate } from './useDidUpdate'

type Lifecycle = 'mount' | 'unmount' | 'update'

export const useLogger = (name: string, ...things: any[]) => {
  const notify = (lifecycle: Lifecycle) =>
    console.log(`${name}:${lifecycle}`, ...things)

  useDidMount(() => {
    notify('mount')

    return () => {
      notify('unmount')
    }
  })

  useDidUpdate(() => {
    notify('update')
  })
}
