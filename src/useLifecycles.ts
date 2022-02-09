import { useDidMount } from './useDidMount'

type Noop = () => void

export const useLifecycles = (onMount: Noop, onUnmount: Noop) => {
  useDidMount(() => {
    onMount()

    return () => {
      onUnmount()
    }
  })
}
