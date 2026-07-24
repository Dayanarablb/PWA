import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

test('muestra la información institucional', () => {
  render(<Footer />)

  expect(
    screen.getByText(/ESPE/i)
  ).toBeInTheDocument()
})
