import styles from './usercard.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const UserCard = ({ nombre, url, edad }) => {
    const [mostrarEstado, setMostrarEstado] = useState(false);

    return (
        <div className={styles.contenedor}>
            <img className={styles.imagen} src={url} alt={nombre} />
            <h3 className={styles.titulo}>{nombre}</h3>
            <p className={styles.edad}>Edad: {edad} años</p>
            <p className={styles.estado}>
                {mostrarEstado ? 'Activo' : 'Inactivo'}
            </p>
            <button className={styles.boton} onClick={() => setMostrarEstado(!mostrarEstado)}>
                {mostrarEstado ? 'Ocultar' : 'Mostrar'} Estado
            </button>
        </div>
    );
};

UserCard.propTypes = {
    nombre: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    edad: PropTypes.number.isRequired
};