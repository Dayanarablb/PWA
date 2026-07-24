import styles from "./footer.module.css"


export const Footer = () => {

    const anioActual = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <p>Todos los derechos reservados ESPE {anioActual}.</p>
        </footer>
    );

}