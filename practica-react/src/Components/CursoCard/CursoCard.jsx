import styles from './cursocard.module.css';
import PropTypes from 'prop-types';

export const CursoCard = ({ nombre, descripcion, creditos }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.titulo}>{nombre}</h3>
            <p className={styles.descripcion}>{descripcion}</p>
            <p className={styles.creditos}>Créditos: {creditos}</p>
        </div>
    );
};

CursoCard.propTypes = {
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    creditos: PropTypes.number.isRequired
};
