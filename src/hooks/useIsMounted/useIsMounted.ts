import { useRef } from 'react'

import { useDidMount } from 'src/hooks'

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
