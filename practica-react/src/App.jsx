import './App.css'
import {Layout} from './Components'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { PrivateRoutes } from './routes'

import {InicioPage, ContactosPage, NosotrosPage, CursosPage, PersonajePage, LoginPage, RegisterPage, Productos} from './pages'

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PrivateRoutes><InicioPage /></PrivateRoutes>} />
          <Route path="/Contactos" element={<PrivateRoutes><ContactosPage /></PrivateRoutes>} />
          <Route path="/Nosotros" element={<PrivateRoutes><NosotrosPage /></PrivateRoutes>} />
          <Route path="/Cursos" element={<PrivateRoutes><CursosPage /></PrivateRoutes>} />
          <Route path="/Personaje" element={<PrivateRoutes><PersonajePage /></PrivateRoutes>} />
          <Route path="/productos" element={<PrivateRoutes><Productos /></PrivateRoutes>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/registro" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
