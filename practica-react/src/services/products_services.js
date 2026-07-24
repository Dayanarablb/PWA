import api from "./api";


export const obtenerProductos = async () => {
    try{
    const response = await api.get(`/productos/`); //await espera a que se consuma ese servcio
    return response.data; //retorna el array de productos
    }catch (error) {
        console.error("Error en la solicitud de productos:", error);     
    }
}

export const obtenerProductosPorId = async (id) => {
    try{
    const response = await api.get(`/productos/${id}`); //await espera a que se consuma ese servcio
    return response.data; //retorna el array de productos
    }catch (error) {
        console.error("Error en la solicitud de productos:", error);     
    }
}

export const crearProducto = async (producto) => {
    try{
    const response = await api.post(`/productos/`, producto); //await espera a que se consuma ese servcio   
    return response.data; //retorna el array de productos
    }catch (error) {    
        console.error("Error en la solicitud de productos:", error);
    }   
}
export const actualizarProducto = async (id, producto) => {
    try{
    const response = await api.put(`/productos/${id}`, producto); //await espera a que se consuma ese servcio
    return response.data; //retorna el array de productos
    }catch (error) {
        console.error("Error en la solicitud de productos:", error);
    }
}

export const eliminarProducto = async (id) => {
    try{
    const response = await api.delete(`/productos/${id}`); //await espera a que se consuma ese servcio
    return response.data; //retorna el array de productos
    }catch (error) {
        console.error("Error en la solicitud de productos:", error);
    }
}