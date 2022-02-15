import { useCallback, useState } from 'react'

type MethodsCreator<TMethods, TState> = (prevState?: TState) => TMethods

const isFunction = (value: any): value is Function =>
  typeof value === 'function'

export const resolveMethods = <TMethods, TState>(
  resolveableMethods: MethodsCreator<TMethods, TState>,
  prevState: TState
) => {
  if (isFunction(resolveableMethods)) {
    return resolveableMethods.length
      ? resolveableMethods(prevState)
      : resolveableMethods()
  }

  return resolveableMethods
}

const useMethods = <TState, TMethods>(
  methodsCreator: MethodsCreator<TMethods, TState>,
  initialState: TState
) => {
  const [state, setState] = useState(initialState)

  const wrap = useCallback((methods: TMethods): TMethods => {
    const wrappedMethods = Object.keys(methods).reduce((acc: any, key) => {
      const savedMethod = (methods as any)[key]

      acc[key] = function (...params: Parameters<typeof savedMethod>) {
        const newState = savedMethod(...params)
        setState(newState)
      }

      return acc
    }, {})

    return wrappedMethods
  }, [])

  const createMethods = useCallback(
    (methodsCreator: MethodsCreator<TMethods, TState>) => {
      const methods = resolveMethods(methodsCreator, state)
      const wrappedMethods = wrap(methods)

      return wrappedMethods
    },
    [state]
  )

  return [state, createMethods(methodsCreator)] as const
}

export { useMethods }
