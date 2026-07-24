import { CursoCard } from '../../Components/CursoCard';
import styles from './cursos.module.css';
import { useState } from 'react';

export const CursosPage = () => {
    const [cursos] = useState([
        { id: 1, nombre: "Programación Integrativa", descripcion: "Componentes Web", creditos: 4 },
        { id: 2, nombre: "Modelado BD", descripcion: "Base de Datos", creditos: 3 },
        { id: 3, nombre: "Lectura y Escritura", descripcion: "Textos Académicos", creditos: 2 },
        { id: 4, nombre: "IA", descripcion: "Inteligencia Artificial", creditos: 4 },
    ]);

    return (
        <>
            <h1 className={styles.titulo}>Mis Cursos</h1>
            <div className={styles.contenedor}>
                {cursos.map((curso) => (
                    <CursoCard
                        key={curso.id}
                        nombre={curso.nombre}
                        descripcion={curso.descripcion}
                        creditos={curso.creditos}
                    />
                ))}
            </div>
        </>
    );
};