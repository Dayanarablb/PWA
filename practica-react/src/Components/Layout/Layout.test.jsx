import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'

test('renderiza el contenido hijo', () => {
  render(
    <BrowserRouter>
      <Layout>
        <h1>Contenido de prueba</h1>
      </Layout>
    </BrowserRouter>
  )

  expect(
    screen.getByText('Contenido de prueba')
  ).toBeInTheDocument()
})
