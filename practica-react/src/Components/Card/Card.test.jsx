import { render, screen } from '@testing-library/react'
import { Card } from './Card'

test('muestra correctamente el título recibido', () => {
  render(
    <Card
      nombre="React"
    />
  )

  expect(
    screen.getByText('React')
  ).toBeInTheDocument()
})
