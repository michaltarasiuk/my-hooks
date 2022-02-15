import { useRef } from 'react'
import type { MutableRefObject } from 'react'

import { useDidMount, useDidUpdate } from 'src/hooks'

type Reference = Window | Document | MutableRefObject<HTMLElement | null>
type Element = Window | Document | HTMLElement
type AddEventListenr = Element['addEventListener']
type Params = Parameters<AddEventListenr>

const isMutableRefObject = (value: any): value is MutableRefObject<any> =>
  value.current
const inferElement = (reference: Reference) =>
  isMutableRefObject(reference) ? reference.current : reference

export const useEventListener = (
  reference: Reference,
  type: Params[0],
  listener: Exclude<Params[1], EventListenerObject>,
  options?: Params[2]
) => {
  const savedListener = useRef(listener)

  useDidUpdate(() => {
    savedListener.current = listener
  }, listener)

  useDidMount(() => {
    const node = inferElement(reference)
    const handler = (event: Event) => {
      savedListener.current(event)
    }

    if (node) {
      node.addEventListener(type, handler, options)

      return () => node.removeEventListener(type, handler, options)
    }
  })
}
