import { useRef, forwardRef } from 'react'
import { render, act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import type { ForwardedRef } from 'react'

import {
  ensuredRef,
  useEnsuredRef,
  isMutableRefObject,
} from '../../src/hocs/ensuredRef'

const Heading = forwardRef((_, ref: ForwardedRef<HTMLHeadingElement>) => {
  return <h1 ref={ref}>Heading</h1>
})

const Paragraph = ensuredRef((_, ref: ForwardedRef<HTMLParagraphElement>) => {
  return <p ref={ref}>paragraph</p>
})

describe('ensuredRef', () => {
  it.only('should return a valid ref with not existing ref', () => {
    // arrange
    const {
      result: { current: ref },
    } = renderHook(() => {
      const ref = null
      const ensuredRef = useEnsuredRef<HTMLHeadingElement | null>(ref)

      render(<Heading ref={ensuredRef} />)

      return ensuredRef
    })

    // assert
    if (isMutableRefObject(ref) && ref.current) {
      expect(ref.current.tagName).toBe('H1')
      return
    }

    throw Error('Error - ref is not defined')
  })

  it('should return a valid ref with existing forwardedRef', async () => {
    // arrange
    const {
      result: { current: ref },
    } = renderHook(() => {
      const ref = useRef(null)

      render(<Paragraph ref={ref} />)

      return ref
    })

    // assert
    expect(ref.current).not.toBeNull()
  })

  it('should log ref', () => {
    // arrange
    const logger = jest.fn()
    render(
      <Paragraph
        ref={(ref) => {
          logger(ref && ref.tagName)
        }}
      />
    )

    // assert
    expect(logger).toHaveBeenCalledWith('P')
  })
})
