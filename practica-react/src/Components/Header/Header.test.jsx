import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './Header'

test('muestra el menú principal', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )

  expect(
    screen.getByText('Inicio')
  ).toBeInTheDocument()
})
