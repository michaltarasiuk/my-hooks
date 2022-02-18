import { useState, useCallback } from 'react'

import { usePermission } from '../../hooks'

export const useClipboard = () => {
  const [text, setText] = useState('')

  const { clipboardReadStatus } = usePermission({ name: 'clipboard-read' })
  const { clipboardWriteStatus } = usePermission({ name: 'clipboard-write' })

  const updateText = useCallback(
    (newText: string, callback: (text?: string) => void) => {
      if (clipboardReadStatus === 'granted') {
        setText(newText)
        callback(newText)
        return
      }

      callback()
    },
    []
  )

  const writeText = useCallback((text: string) => {
    return new Promise(async (resolve, reject) => {
      if (clipboardWriteStatus === 'granted') {
        try {
          await navigator.clipboard.writeText(text)

          updateText(text, resolve)
        } catch (error) {
          reject(error)
        }

        return
      }

      try {
        const body = document.querySelector('body')

        const textarea = document.createElement('textarea')
        body?.appendChild(textarea)

        textarea.value = text
        textarea.select()
        document.execCommand('copy')

        body?.removeChild(textarea)

        updateText(text, resolve)
      } catch (error) {
        reject(error)
      }
    })
  }, [])

  return [text, writeText] as const
}
