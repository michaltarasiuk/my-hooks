import { useEffect, useRef } from 'react'

type Changes = {
  [key in string]: {
    from: any
    to: any
  }
}

export const useWhyDidYouUpdate = <TProps extends Record<string, any>>(
  name: string,
  props: TProps
) => {
  const savedProps = useRef<TProps>()

  useEffect(() => {
    const previousProps = savedProps.current

    if (previousProps) {
      const allKeys = Object.keys({ ...savedProps.current, ...props })
      const changes = allKeys.reduce((acc, key) => {
        if (previousProps[key] !== props[key]) {
          acc[key] = {
            from: previousProps[key],
            to: props[key],
          }
        }

        return acc
      }, {} as Changes)

      if (Object.keys(changes).length) {
        console.log('[why-did-you-update]', name, changes)
      }
    }

    savedProps.current = props
  })
}
