import { useCreation } from '../../hooks'

type Listener<TValue> = (value: TValue) => void

const createEventEmitter = <TValue>() => {
  const listeners = new Set<Listener<TValue | undefined>>()

  const subscribe = (subscriber: Listener<TValue | undefined>) => {
    listeners.add(subscriber)

    return {
      unsubscribe: () => listeners.delete(subscriber),
    }
  }

  const emit = (value?: TValue) => {
    for (const listener of listeners) {
      listener(value)
    }
  }

  return {
    emit,
    subscribe,
  }
}

export const useEventEmitter = <TValue>() => {
  const savedEventEmitter = useCreation(() => createEventEmitter<TValue>())

  return savedEventEmitter.value
}
