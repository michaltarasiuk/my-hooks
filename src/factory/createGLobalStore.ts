import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { useDidMount } from '../useDidMount'

export const createGlobalStore = <TState>(initialState: TState) => {
  const store = {
    state: initialState,
    setters: new Set<Dispatch<SetStateAction<TState>>>(),
    setState(newState: TState) {
      // the function does not hold a strong context
      store.state = newState

      for (const subscriber of [...store.setters]) {
        subscriber(newState)
      }
    },
    subscribe(observer: Dispatch<SetStateAction<TState>>) {
      this.setters.add(observer)

      return {
        unsubscribe: () => {
          this.setters.delete(observer)
        },
      }
    },
  }

  const hook = () => {
    const [globalState, observer] = useState(store.state)

    useDidMount(() => {
      const subscriber = store.subscribe(observer)

      return () => {
        subscriber.unsubscribe()
      }
    })

    return [globalState, store.setState] as const
  }

  const { setters } = store

  return {
    get subscribers() {
      return [...setters]
    },
    useGlobalState: hook,
    ...store,
  }
}
