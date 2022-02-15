import { useRef, useState } from 'react'

import { useDidMount, useDidUpdate } from 'src/hooks'

type Status = PermissionState | 'fetching'

export const usePermission = (
  permissionDescriptor: PermissionDescriptor,
  listener: Parameters<PermissionStatus['addEventListener']>[1]
) => {
  const savedPermissionStatus = useRef<PermissionStatus | null>(null)
  const [status, setStatus] = useState<Status>('fetching')

  useDidMount(() => {
    ;(async () => {
      const permissionStatus = await navigator.permissions.query(
        permissionDescriptor
      )
      savedPermissionStatus.current = permissionStatus

      setStatus(permissionStatus.state)
    })()
  })

  useDidUpdate(() => {
    if (savedPermissionStatus.current) {
      savedPermissionStatus.current.addEventListener('change', listener)

      return () => {
        savedPermissionStatus.current?.removeEventListener('change', listener)
      }
    }
  }, savedPermissionStatus)

  return {
    get status() {
      return status
    },
  }
}
