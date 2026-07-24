import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { login } from '../services/auth_services';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError(false);
    };

    const mostrarMensaje = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const respuesta = await login(formData.email, formData.password);
            
            if (respuesta && respuesta.token) {
                localStorage.setItem('token', respuesta.token);
                if (respuesta.usuario) {
                    localStorage.setItem('sesionActiva', JSON.stringify(respuesta.usuario));
                }
                mostrarMensaje('Inicio de sesión exitoso. Redirigiendo...', 'success');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setError(true);
                mostrarMensaje('Credenciales incorrectas.', 'error');
            }
        } catch (err) {
            setError(true);
            mostrarMensaje('Error al conectar con el servidor.', 'error');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={error}
                        fullWidth
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={error}
                        fullWidth
                    />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Recordarme" />
                    </FormGroup>
                    <Button variant="contained" color="success" type="submit" fullWidth>
                        Entrar
                    </Button>
                </Stack>
            </form>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};


