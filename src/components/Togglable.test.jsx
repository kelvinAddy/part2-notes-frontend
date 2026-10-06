import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToggleLable from './ToggleLable'

describe('<Togglelable />', () => {
  beforeEach(() => {
    render(
      <ToggleLable buttonLabel="show...">
        <div>togglelabel content</div>
      </ToggleLable>,
    )
  })

  test('renders its children', () => {
    screen.getByText('togglelabel content')
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglelabel content')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('togglelabel content')
    expect(element).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show...')
    await user.click(showButton)

    const childElement = screen.getByText('togglelabel content')
    const cancelButton = screen.getByText('cancel')
    await user.click(cancelButton)
    expect(childElement).not.toBeVisible()
  })
})
