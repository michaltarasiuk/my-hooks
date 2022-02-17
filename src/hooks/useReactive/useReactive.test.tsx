import { render, fireEvent } from '@testing-library/react'

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
})
