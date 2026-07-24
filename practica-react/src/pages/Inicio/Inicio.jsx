import { Card } from '../../Components/Card';
import styles from './inicio.module.css';

export const InicioPage = () => {
    const características = [
        { id: 1, nombre: "Diseño Responsivo" },
        { id: 2, nombre: "Componentes Reutilizables" },
        { id: 3, nombre: "CSS Modules" },
    ];

    return (
        <div className={styles.contenedor}>
            {/* HERO SECTION */}
            <div className={styles.hero}>
                <h1 className={styles.titulo}>Bienvenidos a Mi Portafolio</h1>
                <p className={styles.subtitulo}>
                    Estudiante de Programación Web - React & Desarrollo Frontend
                </p>
            </div>

            {/* IMAGEN PRINCIPAL */}
            <img
                className={styles.imagen}
                src="https://images.pexels.com/photos/37880001/pexels-photo-37880001.jpeg"
                alt="Paisaje bonito"
            />
            {/* DESCRIPCIÓN */}
            <div className={styles.descripcion}>
                <div className={styles.textos}>
                    <p className={styles.parrafo}>
                        Hola, soy Dayanara Bautista. Actualmente estoy practicando React 
                        y desarrollando habilidades en programación web. Este es mi espacio 
                        para mostrar proyectos y aprender nuevas tecnologías.
                    </p>
                    <p className={styles.parrafo}>
                        A través de este portafolio, podrás ver mis proyectos, aprender sobre 
                        mis habilidades y conocer un poco más de mí como desarrolladora.
                    </p>
                </div>
            </div>

            {/* CARACTERÍSTICAS CON CARDS */}
            <h2 style={{ 
                textAlign: 'center', 
                color: 'rgb(93, 86, 189)', 
                marginBottom: '30px',
                fontSize: '28px'
            }}>
                Características Principales
            </h2>
            
            <div className={styles.contenedorCards}>
                {características.map((carac) => (
                    <Card key={carac.id} nombre={carac.nombre} />
                ))}
            </div>
        </div>
    );
}