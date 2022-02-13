import { renderHook } from '@testing-library/react-hooks'

import { useLatest } from '../src/useLatest'

const setUp = () =>
  renderHook(({ state }) => useLatest(state), { initialProps: { state: 0 } })

it('should return a ref with the latest value on initial render', () => {
  // arrange
  const { result } = setUp()

  // assert
  expect(result.current).toEqual({ current: 0 })
})

it('should always return a ref with the latest value after each update', () => {
  // given
  const { result, rerender } = setUp()

  // when
  rerender({ state: 2 })

  // then
  expect(result.current).toEqual({ current: 2 })

  // when
  rerender({ state: 4 })

  // then
  expect(result.current).toEqual({ current: 4 })

  // when
  rerender({ state: 6 })

  // then
  expect(result.current).toEqual({ current: 6 })
})
