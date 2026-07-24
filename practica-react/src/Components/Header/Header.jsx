import styles from './header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

export const Header = () => {
    const navigate = useNavigate();
    const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva'));

    const handleLogout = () => {
        localStorage.removeItem('sesionActiva');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <h2 className={styles.titulo}>Bienvenidos a mi sitio web</h2>
            <nav className={styles.navegacion}>
                {sesionActiva ? (
                    <>
                        <Link className={styles.itemsMenu} to="/">Inicio</Link>
                        <Link className={styles.itemsMenu} to="/Nosotros">Acerca de</Link>
                        <Link className={styles.itemsMenu} to="/Contactos">Contacto</Link>
                        <Link className={styles.itemsMenu} to="/Cursos">Cursos</Link>
                        <Link className={styles.itemsMenu} to="/Personaje">Personajes</Link>
                        <Link className={styles.itemsMenu} to="/productos">Productos</Link>
                        <Box display="flex" alignItems="center" gap={2} ml={2}>
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                                Hola, {sesionActiva.nombre} ({sesionActiva.rol || 'admin'})
                            </Typography>
                            <Button variant="contained" color="error" size="small" onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Link className={styles.itemsMenu} to="/login">Iniciar Sesión</Link>
                        <Link className={styles.itemsMenu} to="/registro">Registrarse</Link>
                    </>
                )}
            </nav>
        </header>
    );
};
