import { useState, useCallback } from 'react'

import { useDidUpdate } from 'src/hooks'

export const useError = () => {
  const [error, setError] = useState<Error | null>(null)

  useDidUpdate(() => {
    if (error) {
      throw error
    }
  }, error)

  const dispatchError = useCallback((newError: Error) => {
    setError(newError)
  }, [])

  return dispatchError
}
