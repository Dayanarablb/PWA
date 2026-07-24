import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PersonajePage } from './Personaje'

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            species: 'Human'
          }
        ]
      })
  })
)

test('carga personajes desde la API', async () => {
  render(<PersonajePage />)

  expect(
    await screen.findByText('Rick Sanchez')
  ).toBeInTheDocument()
})
