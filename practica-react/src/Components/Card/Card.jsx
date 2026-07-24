import styles from './card.module.css';

import PropTypes from 'prop-types'
import { useState } from 'react'



export const Card = ({ nombre }) => {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className={styles.contenedor}>
            <h1 className={styles.titulo}>{nombre}</h1>
            
            <button 
                className={styles.boton} 
                onClick={() => setMostrar(!mostrar)}
            >
                {mostrar ? 'Ocultar' : 'Mostrar más'}
            </button>

            {mostrar && (
                <p style={{ marginTop: '20px', color: '#555', fontSize: '0.95rem' }}>
                    Aquí puedes poner más información sobre esta característica.
                </p>
            )}
        </div>
    );
};

Card.propTypes = {
    nombre: PropTypes.string.isRequired
};