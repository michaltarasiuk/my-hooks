import { renderHook } from '@testing-library/react-hooks'

import { useTitle } from '../src/useTitle'

type Props = {
  title: string
}

const renderTitleHook = () =>
  renderHook((props: Props) => useTitle(props.title), {
    initialProps: { title: 'Hello world' },
  })

describe('useTitle', () => {
  it('should set document title', () => {
    // arrange
    renderTitleHook()

    // assert
    expect(document.title).toBe('Hello world')
  })

  it('should not update document title on rerender', () => {
    // given
    const { rerender } = renderTitleHook()

    // when
    rerender({ title: 'Hello!!!' })

    // then
    expect(document.title).toBe('Hello world')
  })
})
