import { useRef } from 'react'
import { render, fireEvent } from '@testing-library/react'

import { useEventListener, useToggle } from 'src/hooks'

type Props = {
  callback: (...args: any[]) => void
  mockCallback?: (...args: any[]) => void
}

const Grid = ({ callback, mockCallback = () => {} }: Props) => {
  const firstBox = useRef(null)
  const [value, toggle] = useToggle(true)

  useEventListener(firstBox, 'click', value ? callback : mockCallback)

  return (
    <div>
      <div ref={firstBox} data-testid="first-box" />
      <button onClick={() => toggle()} data-testid="toggler">
        toggle
      </button>
    </div>
  )
}

describe('useEventListener', () => {
  it('should callback invoke after click reference', () => {
    // given
    const callback = jest.fn()
    const { getByTestId } = render(<Grid callback={callback} />)

    // when
    fireEvent.click(getByTestId('first-box'))

    // then
    expect(callback).toHaveBeenCalled()
  })

  it('should update callback', () => {
    // given
    const callback = jest.fn()
    const mockCallback = jest.fn()
    const { getByTestId } = render(
      <Grid callback={callback} mockCallback={mockCallback} />
    )

    // when
    fireEvent.click(getByTestId('toggler'))
    fireEvent.click(getByTestId('first-box'))

    // then
    expect(mockCallback).toHaveBeenCalled()
  })
})
