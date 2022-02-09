import { useIsMounted } from '../src/useIsMounted'

export const usePromise = () => {
  const state = useIsMounted()

  return <TValue>(promise: Promise<TValue>) => {
    return new Promise((resolve, reject) => {
      if (state.isMounted) {
        promise.then(resolve).catch(reject)
      }
    })
  }
}