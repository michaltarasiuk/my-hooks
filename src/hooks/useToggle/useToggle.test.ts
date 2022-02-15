import { renderHook, act } from '@testing-library/react-hooks'

import { useToggle } from '../../../src/hooks'

describe('useToggle', () => {
  it('should set state to initial value', () => {
    // arrange
    const { result } = renderHook(() => useToggle(true))

    // assert
    expect(result.current[0]).toBeTruthy()
  })

  it('should toggle state', () => {
    // given
    const { result } = renderHook(() => useToggle(true))

    // when
    const toggle = result.current[1]
    act(() => {
      toggle()
    })

    // then
    expect(result.current[0]).toBeFalsy()
  })
})
