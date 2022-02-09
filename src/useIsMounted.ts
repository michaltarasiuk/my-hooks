import { useRef } from 'react'

import { useDidMount } from './useDidMount'

export const useIsMounted = () => {
  const isMounted = useRef(false)

  useDidMount(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  })

  return {
    get isMounted() {
      return isMounted.current
    },
  }
}
