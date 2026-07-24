import { useState, useEffect } from 'react';
import { 
    Box, Typography, TextField, Button, Stack, 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, IconButton, Snackbar, Alert
} from '@mui/material';
import { 
    obtenerProductos, crearProducto, 
    actualizarProducto, eliminarProducto 
} from '../../services/products_services';

export const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '', descripcion: '', precio: '', stock: '', imagen: ''
    });
    const [editId, setEditId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data || []);
        } catch (error) {
            mostrarMensaje('Error al obtener productos', 'error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const mostrarMensaje = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (parseFloat(formData.precio) < 0) {
            mostrarMensaje('El precio no puede ser negativo.', 'error');
            return;
        }
        if (parseInt(formData.stock) < 0) {
            mostrarMensaje('El stock no puede ser negativo.', 'error');
            return;
        }

        try {
            if (editId) {
                await actualizarProducto(editId, formData);
                mostrarMensaje('Producto actualizado correctamente.', 'success');
            } else {
                await crearProducto(formData);
                mostrarMensaje('Producto registrado correctamente.', 'success');
            }
            setFormData({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
            setEditId(null);
            cargarProductos();
        } catch (error) {
            mostrarMensaje('Error al procesar la solicitud.', 'error');
        }
    };

    const handleEdit = (producto) => {
        setFormData({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen
        });
        setEditId(producto.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await eliminarProducto(id);
                mostrarMensaje('Producto eliminado correctamente.', 'success');
                cargarProductos();
            } catch (error) {
                mostrarMensaje('Error al procesar la solicitud.', 'error');
            }
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Productos
            </Typography>

            {/* Formulario de Producto */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {editId ? 'Editar Producto' : 'Nuevo Producto'}
                </Typography>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" useFlexGap>
                    <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required sx={{ flex: 1, minWidth: '200px' }} />
                    <TextField label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} required sx={{ flex: 2, minWidth: '200px' }} />
                    <TextField label="Precio" name="precio" type="number" inputProps={{ step: "0.01", min: "0" }} value={formData.precio} onChange={handleChange} required sx={{ flex: 1, minWidth: '100px' }} />
                    <TextField label="Stock" name="stock" type="number" inputProps={{ min: "0" }} value={formData.stock} onChange={handleChange} required sx={{ flex: 1, minWidth: '100px' }} />
                    <TextField label="Imagen (URL)" name="imagen" value={formData.imagen} onChange={handleChange} sx={{ flex: 2, minWidth: '200px' }} />
                    <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', height: '56px' }}>
                        {editId ? 'Actualizar' : 'Guardar'}
                    </Button>
                    {editId && (
                        <Button variant="outlined" color="secondary" sx={{ alignSelf: 'center', height: '56px' }} onClick={() => { setEditId(null); setFormData({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' }); }}>
                            Cancelar
                        </Button>
                    )}
                </Stack>
            </Box>

            {/* Lista de Productos */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>{producto.id}</TableCell>
                                <TableCell>
                                    {producto.imagen ? (
                                        <img 
                                            src={producto.imagen} 
                                            alt={producto.nombre} 
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                                        />
                                    ) : (
                                        'Sin imagen'
                                    )}
                                </TableCell>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell>{producto.descripcion}</TableCell>
                                <TableCell>${producto.precio}</TableCell>
                                <TableCell>{producto.stock}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleEdit(producto)}>
                                        Editar
                                    </Button>
                                    <Button color="error" onClick={() => handleDelete(producto.id)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
