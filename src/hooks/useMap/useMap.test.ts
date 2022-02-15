import { renderHook, act } from '@testing-library/react-hooks'

import { useMap } from '../../../src/hooks'

describe('useMap', () => {
  it('should set state to initial value', () => {
    // arrange
    const { result } = renderHook(() => useMap([[1, 'Hello']]))

    expect(result.current[0]).toMatchInlineSnapshot(`
      Map {
        1 => "Hello",
      }
    `)
  })

  it('should set property map', () => {
    // given
    const { result } = renderHook(() => useMap())

    // when
    result.current[1].set('key', 'value')

    // then
    expect(result.current[0]).toMatchInlineSnapshot(`
      Map {
        "key" => "value",
      }
    `)
  })

  it('should delete property map', () => {
    // given
    const { result } = renderHook(() => useMap([[1, 'Hello']]))

    // when
    result.current[1].delete(1)

    // then
    expect(result.current[0]).toMatchInlineSnapshot(`Map {}`)
  })

  it('should clear map', () => {
    // given
    const { result } = renderHook(() => useMap([[1, 'Hello']]))

    // when
    result.current[1].clear()

    // then
    expect(result.current[0]).toMatchInlineSnapshot(`Map {}`)
  })

  it('should reset map to inital value', () => {
    // given
    const { result } = renderHook(() => useMap([[1, 'Hello']]))

    // when
    result.current[1].delete(1)

    // then
    expect(result.current[0]).toMatchInlineSnapshot(`Map {}`)

    // when
    act(() => {
      result.current[1].reset()
    })

    // then
    expect(result.current[0]).toMatchInlineSnapshot(`
      Map {
        1 => "Hello",
      }
    `)
  })
})
