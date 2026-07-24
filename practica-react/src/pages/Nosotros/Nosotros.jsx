import { UserCard } from '../../Components/UserCard';
import yopImage from '../../assets/yop.jpeg';
import styles from './nosotros.module.css';

export const NosotrosPage = () => {
    return (
        <div className={styles.contenedor}>
            {/* TÍTULOS */}
            <h1 className={styles.titulo}>Acerca de Mí</h1>
            <p className={styles.subtitulo}>Conoce quién soy y mis habilidades</p>

            {/* SECCIÓN PERSONAL CON CARD */}
            <div className={styles.seccionPersonal}>
                <div className={styles.cardContenedor}>
                    <UserCard
                        nombre="Dayanara Bautista"
                        url={yopImage}
                        edad={22}
                    />
                </div>

                <div className={styles.textoSobreMi}>
                    <p className={styles.parrafo}>
                        Hola, soy <strong>Dayanara Bautista</strong>, estudiante de sexto semestre 
                        de Programación Web. Soy apasionada por el desarrollo frontend y actualmente 
                        estoy profundizando mis conocimientos en React.
                    </p>

                    <p className={styles.parrafo}>
                        Me encanta crear interfaces visualmente atractivas y funcionales. 
                        Creo que el código bien escrito no solo funciona, sino que también 
                        es mantenible y escalable.
                    </p>

                    <div className={styles.parrafoDestacado}>
                        <span className={styles.destacadoIcon} aria-hidden="true"></span>
                        Actualmente aprendiendo: React, CSS Modules y mejores prácticas 
                        en desarrollo web
                    </div>

                    <p className={styles.parrafo}>
                        En este portafolio encontrarás algunos de mis proyectos y ejercicios 
                        que reflejan mi progreso como desarrolladora.
                    </p>
                </div>
            </div>

            {/* SECCIÓN DE INFORMACIÓN */}
            <div className={styles.seccionInfo}>
                <h2 style={{ 
                    color: 'rgb(93, 86, 189)', 
                    marginBottom: '30px',
                    textAlign: 'center'
                }}>
                    Mi Información
                </h2>

                <div className={styles.infoItems}>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Edad</p>
                        <p className={styles.infoValor}>22</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Semestre</p>
                        <p className={styles.infoValor}>6to</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Especialidad</p>
                        <p className={styles.infoValor}>Frontend</p>
                    </div>
                </div>
            </div>
        </div>
    );
};