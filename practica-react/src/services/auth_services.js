import api from "./api";

export const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { correo: email, password });
        return response.data; 
    }catch (error) {
        console.error("Error en la solicitud de inicio de sesión:", error);
        throw error;
    }
};

export const register = async (nombre, correo, password, id_rol) => {
    try {
        const response = await api.post("/auth/register", { nombre, correo, password, id_rol });
        return response.data; 
    }catch (error) {
        console.error("Error en el registro:", error);
        throw error;
    }
}
