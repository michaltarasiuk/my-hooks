import { renderHook } from '@testing-library/react-hooks'

import { usePreviousDistinct } from 'src/hooks'
import type { Compare } from './usePreviousDistinct'

type Props = {
  value: number
  compare: Compare<number>
}

const defaultCompare: Compare<number> = (prevValue, value) => {
  if (prevValue === undefined) {
    return false
  }

  return prevValue + value > 5
}
const renderPreviousDistinctHook = () =>
  renderHook(
    (props: Props) => usePreviousDistinct(props.value, props.compare),
    { initialProps: { value: 0, compare: defaultCompare } }
  )

describe('usePreviousDistinct', () => {
  it('should return previous value of state', () => {
    // given
    const { result, rerender } = renderPreviousDistinctHook()

    // when
    rerender({ value: 1, compare: defaultCompare })
    rerender({ value: 2, compare: defaultCompare })
    rerender({ value: 3, compare: defaultCompare })
    rerender({ value: 4, compare: defaultCompare })
    rerender({ value: 5, compare: defaultCompare })

    // then
    expect(result.current).toBe(3)
  })
})
