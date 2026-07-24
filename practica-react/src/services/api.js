import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000", //obtenemos la url de la api desde el archivo .env 
});
api.interceptors.request.use(
    (config) => {
        // Aquí puedes modificar la configuración de la solicitud antes de enviarla
        const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado de autorización
        }
        return config;
    });
    export default api;