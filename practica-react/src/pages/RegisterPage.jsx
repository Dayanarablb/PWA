import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { register } from '../services/auth_services';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '', id_rol: '' });
    const [errors, setErrors] = useState({ nombre: false, email: false, password: false, id_rol: false });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const mostrarMensaje = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let currentErrors = {
            nombre: formData.nombre.trim() === '',
            email: formData.email.trim() === '',
            password: formData.password.trim() === '',
            id_rol: formData.id_rol === ''
        };

        if (currentErrors.nombre || currentErrors.email || currentErrors.password || currentErrors.id_rol) {
            setErrors(currentErrors);
            mostrarMensaje('Por favor, completa todos los campos.', 'error');
            return;
        }

        try {
            await register(formData.nombre, formData.email, formData.password, formData.id_rol);
            mostrarMensaje('Usuario registrado correctamente. Redirigiendo...', 'success');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            mostrarMensaje('Ocurrió un error al registrar el usuario.', 'error');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Registro
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Nombre Completo"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        error={errors.nombre}
                        fullWidth
                    />
                    <TextField
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        fullWidth
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        fullWidth
                    />
                    <FormControl fullWidth error={errors.id_rol}>
                        <InputLabel id="rol-label">Rol</InputLabel>
                        <Select
                            labelId="rol-label"
                            id="id_rol"
                            name="id_rol"
                            value={formData.id_rol}
                            label="Rol"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>Vendedor</MenuItem>
                            <MenuItem value={3}>Cliente</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="success" type="submit" fullWidth>
                        Registrarse
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


