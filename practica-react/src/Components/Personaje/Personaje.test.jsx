import { render, screen } from '@testing-library/react'
import { PersonajeCard } from './Personaje'

test('muestra correctamente el nombre del personaje', () => {
  render(
    <PersonajeCard
      nombre="Rick Sanchez"
      especie="Humano"
      imagen="rick.png"
    />
  )

  expect(
    screen.getByText('Rick Sanchez')
  ).toBeInTheDocument()
})
