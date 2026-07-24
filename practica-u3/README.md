# API RESTful - Práctica U3

Esta es una API RESTful desarrollada con **Node.js** y **Express**, conectada a una base de datos **PostgreSQL**. Implementa autenticación mediante **JSON Web Tokens (JWT)** y encriptación de contraseñas con **Bcrypt**. Además, cuenta con un sistema de autorización basado en roles (e.g., admin, vendedor).

## Tecnologías Utilizadas

*   **Node.js**: Entorno de ejecución para JavaScript.
*   **Express**: Framework para aplicaciones web en Node.js, utilizado para construir la API.
*   **PostgreSQL (pg)**: Sistema de gestión de bases de datos relacional.
*   **JWT (jsonwebtoken)**: Para la generación y validación de tokens de autenticación.
*   **Bcrypt**: Para el hasheo seguro de contraseñas.
*   **Dotenv**: Para la gestión de variables de entorno.
*   **Nodemon**: Herramienta de desarrollo que reinicia automáticamente el servidor ante cambios.

## Estructura del Proyecto

```
practica-u3/
├── config/             # Configuración general (ej. JWT)
├── database/           # Archivos relacionados con la base de datos (conexión, scripts SQL)
├── middlewares/        # Middlewares de Express (autenticación, autorización)
├── routes/             # Definición de las rutas de la API (auth, productos, usuarios)
├── .env                # Variables de entorno (NO subir al repositorio)
├── index.js            # Punto de entrada de la aplicación
└── package.json        # Dependencias y scripts del proyecto
```

## Instalación y Configuración

1.  **Clonar el repositorio** (si aplica) o descargar los archivos.
2.  **Instalar las dependencias**:
    ```bash
    npm install
    ```
3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env` en la raíz del proyecto basándote en un posible archivo de ejemplo (si existe) y configura al menos:
    *   Variables de conexión a la base de datos PostgreSQL (Host, Usuario, Contraseña, Nombre de la DB, Puerto).
    *   Secreto para la firma de los JWT.
    *   Puerto del servidor (ej. `PORT=3000`).
4.  **Base de Datos**:
    Ejecuta el script SQL que se encuentra en `database/script.sql` en tu gestor de base de datos PostgreSQL para crear las tablas necesarias (`usuarios`, `roles`, `productos`, etc.).
5.  **Iniciar el Servidor**:
    *   Modo desarrollo (con nodemon):
        ```bash
        npm run dev
        ```
    *   Modo producción:
        ```bash
        npm start
        ```

## Endpoints Principales

La API expone las siguientes rutas principales:

### Autenticación (`/auth`)
*   `POST /auth/login`: Iniciar sesión. Requiere `correo` y `password`. Devuelve un token JWT y datos del usuario.
*   `POST /auth/register`: Registrar un nuevo usuario. Requiere `nombre`, `correo` y `password`.

### Productos (`/productos`) - *Requieren Autenticación y Autorización*
*   `GET /productos`: Obtener todos los productos (Requiere rol: `admin`).
*   `GET /productos/:id`: Obtener un producto por ID (Requiere rol: `admin`).
*   `POST /productos`: Crear un producto (Requiere rol: `admin` o `vendedor`).
*   `PUT /productos/:id`: Actualizar un producto (Requiere rol: `admin` o `vendedor`).
*   `DELETE /productos/:id`: Eliminar un producto (Requiere rol: `admin`).

### Usuarios (`/usuarios`)
*   *(Las rutas específicas dependen de la implementación en `usuarios.routes.js`)*

## Seguridad y Autenticación

Todas las rutas sensibles están protegidas por middlewares:
*   **`autenticacion.js`**: Verifica la validez del token JWT enviado en las cabeceras de la petición.
*   **`autorizacion.js`**: Verifica que el usuario autenticado posea el rol necesario para acceder al recurso.
