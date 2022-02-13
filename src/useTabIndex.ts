import { useCallback, useRef, useState } from 'react'

import { useDidMount } from './useDidMount'
import { resolveState as resolveMessage } from './utils/resolveState'
import type { ResolveableState as ResolveableMessage } from './utils/resolveState'

type Message = string | null

export const useTabIndex = (name: string) => {
  const savedBroadcastChannel = useRef<BroadcastChannel | null>(null)
  const [message, setMessage] = useState<Message>(null)

  const messageListener = useCallback((event: MessageEvent<string>) => {
    setMessage(event.data)
  }, [])

  const postMessage = useCallback(
    (resolveableMessage: ResolveableMessage<Message>) => {
      if (!savedBroadcastChannel.current) {
        throw Error('broadcast channel is not defined')
      }

      const resolvedMessage = resolveMessage(resolveableMessage, message)

      savedBroadcastChannel.current.postMessage(resolvedMessage)
    },
    []
  )

  useDidMount(() => {
    const broadcastChannel = new BroadcastChannel(name)
    savedBroadcastChannel.current = broadcastChannel

    broadcastChannel.addEventListener('message', messageListener)

    return () => {
      broadcastChannel.removeEventListener('message', messageListener)
      broadcastChannel.close()
    }
  })

  return [message, postMessage] as const
}
