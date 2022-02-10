import { useRef } from 'react'

import { useDidMount } from './useDidMount'

const documentDefined = typeof document !== 'undefined'

const useTitle = (title: string) => {
  const savedOrginalTitle = useRef(title)

  useDidMount(() => {
    document.title = title

    return () => {
      document.title = savedOrginalTitle.current
    }
  })
}

// @ts-ignore
const useTitleMock = (title: string) => {}

const useTitleHook = documentDefined ? useTitle : useTitleMock

export { useTitleHook as useTitle }
