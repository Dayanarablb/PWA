import { useState } from 'react';
import styles from './contactos.module.css';

export const ContactosPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        alert('¡Gracias por tu mensaje! Pronto nos pondremos en contacto.');
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    };

    return (
        <div className={styles.contenedor}>
            <h1 className={styles.titulo}>Contáctame</h1>
            <p className={styles.subtitulo}>
                Déjame tu mensaje y te responderé lo antes posible
            </p>

            {/* FORMULARIO */}
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <div className={styles.grupoFormulario}>
                    <label className={styles.label}>Nombre:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre completo"
                    />
                </div>

                <div className={styles.grupoFormulario}>
                    <label className={styles.label}>Email:</label>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu.email@ejemplo.com"
                    />
                </div>

                <div className={styles.grupoFormulario}>
                    <label className={styles.label}>Asunto:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                        placeholder="Asunto de tu mensaje"
                    />
                </div>

                <div className={styles.grupoFormulario}>
                    <label className={styles.label}>Mensaje:</label>
                    <textarea
                        className={styles.textarea}
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                </div>

                <button type="submit" className={styles.boton}>
                    Enviar Mensaje
                </button>
            </form>

            {/* INFORMACIÓN DE CONTACTO */}
            <div className={styles.infoContacto}>
                <div className={styles.infoItem}>
                    <div className={`${styles.infoIcon} ${styles.emailIcon}`} aria-hidden="true"></div>
                    <div className={styles.infoTitulo}>Email</div>
                    <div className={styles.infoTexto}>dayanara@ejemplo.com</div>
                </div>

                <div className={styles.infoItem}>
                    <div className={`${styles.infoIcon} ${styles.phoneIcon}`} aria-hidden="true"></div>
                    <div className={styles.infoTitulo}>Teléfono</div>
                    <div className={styles.infoTexto}>+57 123 456 7890</div>
                </div>

                <div className={styles.infoItem}>
                    <div className={`${styles.infoIcon} ${styles.locationIcon}`} aria-hidden="true"></div>
                    <div className={styles.infoTitulo}>Ubicación</div>
                    <div className={styles.infoTexto}>Cali, Colombia</div>
                </div>
            </div>
        </div>
    );
};