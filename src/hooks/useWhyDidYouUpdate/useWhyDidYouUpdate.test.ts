import { renderHook } from '@testing-library/react-hooks'

import { useWhyDidYouUpdate } from '../../hooks'

type Props = {
  role: 'admin' | 'user'
}

const renderWhyDidYouUpdateHook = () =>
  renderHook((props: Props) => useWhyDidYouUpdate('adminPanel', props), {
    initialProps: { role: 'user' },
  })

const logger = jest.spyOn(global.console, 'log').mockImplementation(() => {})

describe('useWhyDidYouUpdate', () => {
  it('should not notify developer on mount component', () => {
    // arrange
    renderWhyDidYouUpdateHook()

    // assert
    expect(logger).not.toHaveBeenCalled()
  })

  it('should not notify developer when props are the same', () => {
    // given
    const { rerender } = renderWhyDidYouUpdateHook()

    // when
    rerender({ role: 'user' })

    // then
    expect(logger).not.toHaveBeenCalled()
  })

  it('should not notify developer when props are the same', () => {
    // given
    const { rerender } = renderWhyDidYouUpdateHook()

    // when
    rerender({ role: 'admin' })

    // then
    expect(logger).toHaveBeenCalled()
  })
})
