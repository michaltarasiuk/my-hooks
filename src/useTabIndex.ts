import { useCallback, useRef, useState } from 'react'

import { useDidMount } from './useDidMount'

type Message = string | null
type ResolveableMessage<TMessage extends Message> =
  | ((previousMessage?: TMessage) => TMessage)
  | TMessage

const isFunction = (value: any): value is Function =>
  typeof value === 'function'

export const resolveMessage = <TMessage extends Message>(
  resolveableMessage: ResolveableMessage<TMessage>,
  previousMessage: TMessage
) => {
  if (isFunction(resolveableMessage)) {
    return resolveableMessage.length
      ? resolveableMessage(previousMessage)
      : resolveableMessage()
  }

  return resolveableMessage
}

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
