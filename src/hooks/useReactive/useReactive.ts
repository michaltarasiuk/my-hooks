import { useRef } from 'react'

import { useCreation, useForce } from '../../hooks'

const weakMap = new WeakMap()

const isObject = (value: any): value is object =>
  typeof value === 'object' && value !== null

const watch = <TValue extends Record<string, any>>(
  value: TValue,
  callback: Function
): TValue => {
  if (weakMap.has(value)) {
    return weakMap.get(value)
  }

  const proxy = new Proxy(value, {
    get(target, prop, receiver) {
      const result = Reflect.get(target, prop, receiver)
      const observer: any = isObject(result) ? watch(result, callback) : result

      return observer
    },
    set(target, prop, value) {
      const ret = Reflect.set(target, prop, value)
      callback()
      return ret
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key)
      callback()
      return ret
    },
  })

  weakMap.set(value, proxy)

  return proxy
}

export const useReactive = <TValue extends Record<string, any>>(
  value: TValue
) => {
  const force = useForce()
  const savedValue = useRef(value)

  const observer = useCreation(() => watch(savedValue.current, force), [])

  return observer.value
}
