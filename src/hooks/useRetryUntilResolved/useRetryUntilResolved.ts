import { useState } from 'react'

import { useInterval } from '../../hooks'

export const useRetryUntilResolved = (
  callback: () => unknown,
  interval = 10
) => {
  const [hasResolved, setHasResolved] = useState(false)

  useInterval(
    () => {
      const result = callback()

      if (result) {
        setHasResolved(true)
      }
    },
    hasResolved ? null : interval
  )
  return hasResolved
}
