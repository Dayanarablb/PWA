import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import styles from "./layout.module.css"

export const Layout = ({ children }) => {
    return (  
        <div className={styles.contenedor}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );  
};