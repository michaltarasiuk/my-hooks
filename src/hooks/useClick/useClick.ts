import { useCallback, useRef } from 'react'
import type { MutableRefObject } from 'react'

import { useEventListener, useDidUpdate } from 'src/hooks'

export type Variant = 'Inside' | 'Outside'
type RefObject = MutableRefObject<HTMLElement | null>
type AddEventListenr = HTMLElement['addEventListener']
type Params = Parameters<AddEventListenr>

const isMutableRefObject = (value: any): value is MutableRefObject<any> =>
  value.current
const inferElement = (refObject: RefObject) =>
  isMutableRefObject(refObject) ? refObject.current : refObject

export const useClick = (
  variant: Variant,
  refObject: RefObject,
  handler: Exclude<Params[1], EventListenerObject>,
  options?: Params[2]
) => {
  const savedHandler = useRef(handler)

  useDidUpdate(() => {
    savedHandler.current = handler
  }, handler)

  const listener = useCallback((event: Event) => {
    const node = inferElement(refObject)
    const target = event.target as HTMLElement

    if (node) {
      const conditionals = {
        Inside: node.contains(target),
        Outside: !node.contains(target),
      }

      conditionals[variant] && savedHandler.current(event)
    }
  }, [])

  useEventListener(window, 'click', listener, options)
}
