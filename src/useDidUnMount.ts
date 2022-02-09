import { useDidMount } from './useDidMount'

type Noop = () => void

export const useDidUnMount = (clenup: Noop) => {
  useDidMount(() => {
    return () => {
      clenup()
    }
  })
}
