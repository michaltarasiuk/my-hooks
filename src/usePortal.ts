import { useMemo } from 'react'
import ReactDOM from 'react-dom'
import type { PropsWithChildren } from 'react'

import { useDidUpdate } from './useDidUpdate'

export const usePortal = (node: HTMLElement | undefined) => {
  useDidUpdate(() => {
    return () => {
      portal.unmount()
    }
  }, node)

  const portal = useMemo(
    () => ({
      render({ children }: PropsWithChildren<{}>) {
        return node ? ReactDOM.createPortal(children, node) : null
      },
      unmount() {
        node && ReactDOM.unmountComponentAtNode(node)
      },
    }),
    [node]
  )

  return portal.render
}
