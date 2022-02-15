import { renderHook, act } from '@testing-library/react-hooks'

import { useMediatedState } from 'src/hooks'
import type { Mediator } from './useMediatedState'

describe('useMediatedState', () => {
  it('should format initial state', () => {
    // arrange
    const mediator = (state: string) => state.toLowerCase()
    const { result } = renderHook(() =>
      useMediatedState('HELLO WORLD', mediator)
    )

    // assert
    const mediatedState = result.current[0]
    expect(mediatedState).toBe('hello world')
  })

  it('should format new state', () => {
    // given
    const mediator = (state: string) => state.toLowerCase()
    const { result } = renderHook(() =>
      useMediatedState('HELLO WORLD', mediator)
    )

    // when
    const setMediatedState = result.current[1]

    act(() => {
      setMediatedState('WELCOME')
    })

    // then
    const mediatedState = result.current[0]
    expect(mediatedState).toBe('welcome')
  })

  it('should replace mediator', () => {
    // given
    type Props = {
      mediator: Mediator<string>
    }
    const defaultMediator = (state: string) => state.toLowerCase()
    const defaultProps = {
      mediator: defaultMediator,
    }
    const { result, rerender } = renderHook((props: Props = defaultProps) =>
      useMediatedState('HELLO WORLD', props.mediator)
    )

    // when
    const setMediatedState = result.current[1]

    act(() => {
      setMediatedState('WELCOME')
    })

    // then
    const mediatedState = result.current[0]
    expect(mediatedState).toBe('welcome')

    // when
    const newMediator = (state: string) => state.toUpperCase()
    rerender({ mediator: newMediator })
    act(() => {
      setMediatedState(`What's Up`)
    })

    // then
    const mediatedState2 = result.current[0]
    expect(mediatedState2).toBe(`WHAT'S UP`)
  })
})
