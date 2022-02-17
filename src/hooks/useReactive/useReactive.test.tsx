import { render, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useReactive } from '../../hooks'

type Props = {
  initialTasks: Task[]
}

type Task = {
  name: string
  description: string
}

const Todo = ({ initialTasks }: Props) => {
  const { tasks } = useReactive({ tasks: initialTasks })

  const buttonHandler = () => {
    tasks.push({ name: 'Name', description: 'Description' })
  }

  return (
    <article>
      <h3>TODO</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.name}>
            <h4>{task.name}</h4>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
      <button onClick={buttonHandler}>add</button>
    </article>
  )
}

const renderReactiveHook = (props: Props) => render(<Todo {...props} />)

describe('useReactive', () => {
  it('should invoke force callback after change value', () => {
    // given
    const { getByText, container } = renderReactiveHook({
      initialTasks: [],
    })

    // when
    fireEvent.click(getByText('add'))

    // then
    expect(container).toMatchInlineSnapshot(`
      <div>
        <article>
          <h3>
            TODO
          </h3>
          <ul>
            <li>
              <h4>
                Name
              </h4>
              <p>
                Description
              </p>
            </li>
          </ul>
          <button>
            add
          </button>
        </article>
      </div>
    `)
  })

  it('should return same proxy when weak set has value', () => {
    // arrange
    const value = {
      user: {
        name: 'Michał',
        age: 18,
      },
    }
    const {
      result: { current: version1 },
    } = renderHook(() => useReactive(value))
    const {
      result: { current: version2 },
    } = renderHook(() => useReactive(value))

    // assert
    expect(version1).toBe(version2)
  })
})
