import { useDidMount } from 'src/hooks'

type Noop = () => void

export const useDidUnMount = (clenup: Noop) => {
  useDidMount(() => {
    return () => {
      clenup()
    }
  })
}
