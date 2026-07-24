import { useState, useEffect } from "react";
import { obtenerPersonajes } from "../../services/rick-andmorty-service";
import { PersonajeCard } from "../../Components/Personaje";
import styles from "./personaje.module.css";

export const PersonajePage = () => {

    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
        const getPersonajes = async () => {
            const personajesData = await obtenerPersonajes(); //await espera en esa linea y pasa a la siguiente linea hasta que se resuelva esa promesa
            setPersonajes(personajesData);
        }
        getPersonajes();
    }, []);

    return (

        <>
        
        <h1 className={styles.titulo}>Personajes de Rick and Morty</h1>
        
        <div className={styles.contenedor}>
            {Array.isArray(personajes) && personajes.map((personaje) => (
                <PersonajeCard
                    key={personaje.id}
                    nombre={personaje.name}
                    especie={personaje.species}
                    imagen={personaje.image}
                />
            ))}
        </div>
        
        </>

);
}