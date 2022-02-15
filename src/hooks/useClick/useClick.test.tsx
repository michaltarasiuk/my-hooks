import { useRef } from 'react'
import { render, fireEvent } from '@testing-library/react'

import { useClick, useToggle } from '../../hooks'
import type { Variant } from './useClick'

type Props = {
  variant: Variant
  callback: (...args: any[]) => void
  mockCallback?: (...args: any[]) => void
}

const Grid = ({ variant, callback, mockCallback = () => {} }: Props) => {
  const firstBox = useRef<HTMLDivElement>(null)
  const [value, toggle] = useToggle(true)

  useClick(variant, firstBox, value ? callback : mockCallback)

  return (
    <div>
      <div ref={firstBox} data-testid="first-box" />
      <div data-testid="second-box" />
      <button onClick={() => toggle()} data-testid="toggler">
        toggle
      </button>
    </div>
  )
}

describe('useClick', () => {
  it('should invoke callback after click inside first box', () => {
    // given
    const callback = jest.fn()
    const { getByTestId } = render(
      <Grid variant="Inside" callback={callback} />
    )

    // when
    fireEvent.click(getByTestId('first-box'))

    // then
    expect(callback).toHaveBeenCalled()
  })

  it('should invoke callback after click outside first box', () => {
    // given
    const callback = jest.fn()
    const { getByTestId } = render(
      <Grid variant="Outside" callback={callback} />
    )

    // when
    fireEvent.click(getByTestId('second-box'))

    // then
    expect(callback).toHaveBeenCalled()
  })

  it('should change callback', () => {
    // given
    const callback = jest.fn()
    const mockCallback = jest.fn()
    const { getByTestId } = render(
      <Grid variant="Inside" callback={callback} mockCallback={mockCallback} />
    )

    // when
    fireEvent.click(getByTestId('toggler'))
    fireEvent.click(getByTestId('first-box'))

    // then
    expect(mockCallback).toHaveBeenCalled()
  })
})
