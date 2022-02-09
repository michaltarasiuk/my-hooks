import { useRef } from 'react'

import { useDidMount } from './useDidMount'
import { useDidUpdate } from './useDidUpdate'

export const useEventListener = <
  TElement extends Window | Document | EventTarget | HTMLElement,
  TParams extends Parameters<TElement['addEventListener']>,
  TType extends TParams[0],
  TListener extends Exclude<TParams[1], null>,
  TOptions extends TParams[2]
>(
  element: TElement,
  type: TType,
  listener: TListener,
  options?: TOptions
) => {
  const savedListener = useRef(listener)

  useDidUpdate(() => {
    savedListener.current = listener
  }, listener)

  useDidMount(() => {
    element.addEventListener(type, savedListener.current, options)

    return () =>
      element.removeEventListener(type, savedListener.current, options)
  })
}
