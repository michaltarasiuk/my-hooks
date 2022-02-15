import { forwardRef, useRef } from 'react'
import type {
  ForwardRefRenderFunction,
  ForwardedRef,
  MutableRefObject,
} from 'react'

import { useDidMount } from '../../hooks'

const isFunction = (value: any): value is Function =>
  typeof value === 'function'

export const isMutableRefObject = <TElement>(
  value: any
): value is MutableRefObject<TElement> => value && 'current' in value

const inferElement = <TElement>(forwardedRef: ForwardedRef<TElement>) => {
  if (isMutableRefObject(forwardedRef)) {
    return forwardedRef.current
  }

  return forwardedRef
}

export const useEnsuredRef = <TElement>(
  forwardedRef: ForwardedRef<TElement>
) => {
  const inferedRef = inferElement(forwardedRef)
  const ensuredRef = useRef(inferedRef)

  useDidMount(() => {
    if (
      isMutableRefObject(forwardedRef) &&
      !isFunction(forwardedRef.current) &&
      !isFunction(ensuredRef.current)
    ) {
      forwardedRef.current = ensuredRef.current
    }
  })

  return (
    isFunction(ensuredRef.current) ? ensuredRef.current : ensuredRef
  ) as Exclude<ForwardedRef<TElement>, null>
}

export const ensuredRef = <TProps, TElement>(
  forwardRefRenderFunction: ForwardRefRenderFunction<TElement | null, TProps>
) => {
  return forwardRef<TElement, TProps>((props, ref) => {
    const ensuredRef = useEnsuredRef(ref)

    return forwardRefRenderFunction(props, ensuredRef)
  })
}
