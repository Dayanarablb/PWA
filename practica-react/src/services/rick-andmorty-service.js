const API_URL = import.meta.env.VITE_API_URL; //obtenemos la url de la api desde el archivo .env

export const obtenerPersonajes = async () => {

    const response = await fetch(API_URL); //await espera a que se consuma ese servcio
    //await espera a que se convierta a json
    const data = await response.json(); 
    return data.results; //retorna el array de personajes
    
}