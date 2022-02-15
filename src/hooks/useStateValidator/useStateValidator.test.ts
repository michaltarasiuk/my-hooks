import { useState } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

import { useDidUpdate, useStateValidator } from '../../../src/hooks'

type Props = {
  validator: (state: number) => boolean
}

const validator = (state: number) => state > 1
const defaultProps = {
  validator,
}

const renderStateValidatorHook = () =>
  renderHook((props: Props = defaultProps) => {
    const [state, setState] = useState(0)
    const [validity, validate] = useStateValidator(state, props.validator)

    const handler = {
      increase() {
        setState((state) => state + 1)
      },
      decrease() {
        setState((state) => state - 1)
      },
    }

    useDidUpdate(() => {
      validate()
    })

    return [validity, validate, handler] as const
  })

describe('useStateValidator', () => {
  it('it should validate state on mount', () => {
    // arrange
    const { result } = renderStateValidatorHook()

    // assert
    const validity = result.current[0]
    expect(validity).toBeFalsy()
  })

  it('it should validate on new state', () => {
    // given
    const { result } = renderStateValidatorHook()

    // when
    // component mount

    // then
    const validity = result.current[0]
    expect(validity).toBeFalsy()

    // when
    const handler = result.current[2]

    act(() => {
      handler.increase()
    })
    act(() => {
      handler.increase()
    })

    // then
    const validity2 = result.current[0]
    expect(validity2).toBeTruthy()
  })

  it('it should change validator', () => {
    // given
    const { result, rerender } = renderStateValidatorHook()

    // when
    // component mount

    // then
    const validity = result.current[0]
    expect(validity).toBeFalsy()

    // when
    const handler = result.current[2]

    act(() => {
      handler.increase()
    })
    act(() => {
      handler.increase()
    })

    // then
    const validity2 = result.current[0]
    expect(validity2).toBeTruthy()

    // when
    const newValidator = (state: number) => state > 5
    rerender({ validator: newValidator })

    // then
    const validity3 = result.current[0]
    expect(validity3).toBeFalsy()
  })
})
