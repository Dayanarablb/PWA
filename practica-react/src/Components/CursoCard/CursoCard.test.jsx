import { render, screen } from '@testing-library/react'
import { CursoCard } from './CursoCard'

test('muestra correctamente la asignatura', () => {
  render(
    <CursoCard
      nombre="Programación Web"
      descripcion="Desarrollo Frontend"
      creditos={3}
    />
  )

  expect(
    screen.getByText('Programación Web')
  ).toBeInTheDocument()
})
