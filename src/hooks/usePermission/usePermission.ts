import { useRef, useState, useCallback } from 'react'

import { useDidMount, useDidUpdate } from 'src/hooks'

type ExtendedPermissionName =
  | PermissionName
  | 'clipboard-read'
  | 'clipboard-write'
type ExtendedPermissionDescriptor<TName extends ExtendedPermissionName> = {
  name: TName
}

type CamelCase<S extends string> = S extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2>
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : S

type PermissionRecord<TName extends ExtendedPermissionName> = Record<
  `${CamelCase<TName>}Status`,
  PermissionState
>

const toCamel = <TText extends string>(text: TText) => {
  return text.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  }) as CamelCase<TText>
}

export const usePermission = <TName extends ExtendedPermissionName>(
  permissionDescriptor: ExtendedPermissionDescriptor<TName>
) => {
  const savedPermissionStatus = useRef<PermissionStatus | null>(null)
  // @ts-ignore
  const [state, setState] = useState<PermissionRecord<TName>>({
    [`${toCamel(permissionDescriptor.name)}Status` as const]: 'prompt',
  })

  const updateStatus = useCallback(async () => {
    const permissionStatus = await navigator.permissions.query(
      permissionDescriptor as PermissionDescriptor
    )
    savedPermissionStatus.current = permissionStatus

    // @ts-ignore
    setState({
      [`${toCamel(permissionDescriptor.name)}Status` as const]:
        permissionStatus.state,
    })
  }, [])

  useDidMount(() => {
    updateStatus()
  })

  useDidUpdate(() => {
    if (savedPermissionStatus.current) {
      savedPermissionStatus.current.addEventListener('change', updateStatus)

      return () => {
        savedPermissionStatus.current?.removeEventListener(
          'change',
          updateStatus
        )
      }
    }
  }, savedPermissionStatus)

  return state
}
