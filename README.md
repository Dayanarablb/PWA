# Aplicación Full Stack con PWA, Docker y CI/CD

Proyecto Full Stack desarrollado como parte de las actividades de **Programación Web** — ESPE.  
Incluye un backend REST con Node.js + Express, un frontend React con soporte PWA, base de datos PostgreSQL y automatización mediante Docker y GitHub Actions.

---

## Estructura del Proyecto

```
programacion-web/
├── practica-u3/          # Backend (Node.js + Express + PostgreSQL)
├── practica-react/       # Frontend (React + Vite + Material UI + PWA)
├── docker-compose.yml    # Orquestación de contenedores
└── .github/
    └── workflows/
        └── ci.yml        # Flujo de CI/CD con GitHub Actions
```

---

## Tecnologías Utilizadas

### Backend (`practica-u3`)
- **Node.js** + **Express** — Servidor REST
- **PostgreSQL** — Base de datos relacional
- **bcrypt** — Encriptación de contraseñas
- **jsonwebtoken (JWT)** — Autenticación con tokens
- **dotenv** — Gestión de variables de entorno

### Frontend (`practica-react`)
- **React 19** + **Vite** — Framework y bundler
- **Material UI (MUI)** — Componentes de interfaz
- **React Router DOM** — Navegación y rutas protegidas
- **Axios** — Peticiones HTTP
- **vite-plugin-pwa** — Progressive Web App (PWA)

### DevOps
- **Docker** + **Docker Compose** — Contenedores
- **GitHub Actions** — CI/CD automatizado
- **Docker Hub** — Registro de imágenes

---

## Configuración y Ejecución

### 1. Variables de entorno (Backend)

Crea un archivo `.env` dentro de `practica-u3/` con el siguiente contenido:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=123
DB_DATABASE=pweb
DB_PORT=5432
JWT_SECRET=tu_clave_secreta
```

### 2. Ejecutar con Docker Compose (Recomendado)

```bash
# Levantar todos los servicios (DB, Backend, Frontend)
docker compose up -d

# Reconstruir las imágenes ante cambios en el código
docker compose up -d --build

# Detener y eliminar los contenedores
docker compose down -v
```

La aplicación estará disponible en:
- **Frontend:** http://localhost:4173
- **Backend API:** http://localhost:3000

### 3. Ejecutar en modo desarrollo (sin Docker)

**Backend:**
```bash
cd practica-u3
npm install
npm run dev
```

**Frontend:**
```bash
cd practica-react
npm install
npm run dev
```

---

## Base de Datos

El proyecto utiliza PostgreSQL con las siguientes tablas:

| Tabla       | Descripción                        |
|-------------|------------------------------------|
| `usuarios`  | Usuarios registrados del sistema   |
| `roles`     | Roles disponibles (admin, vendedor, cliente) |
| `productos` | Catálogo de productos              |

Los roles disponibles son:
- **1** → Admin
- **2** → Vendedor  
- **3** → Cliente

---

## Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. El usuario se registra con nombre, correo, contraseña y rol.
2. Al iniciar sesión, el servidor devuelve un **token JWT**.
3. El token se almacena en `localStorage` y se adjunta a cada petición protegida mediante un interceptor de Axios.
4. Las rutas protegidas verifican el token antes de renderizar el contenido.

---

## Progressive Web App (PWA)

La aplicación cumple con los requisitos de una PWA:

- Manifest configurado con íconos e información de la app
- Service Worker generado automáticamente por `vite-plugin-pwa`
- Instalable desde Google Chrome en escritorio y móvil
- Funciona bajo protocolo seguro (HTTPS / localhost)

Para instalar la PWA, abre la app en Chrome y busca el ícono de instalación en la barra de direcciones.

---

## Docker

### Imágenes generadas

| Imagen             | Puerto | Descripción         |
|--------------------|--------|---------------------|
| `backend-api`      | 3000   | API REST de Node.js |
| `frontend-react`   | 4173   | Aplicación React    |
| `postgres:15`      | 5432   | Base de datos       |

---

## CI/CD con GitHub Actions

El archivo `.github/workflows/ci.yml` automatiza el siguiente flujo cada vez que se hace un `push` a la rama `main`:

1. **Descarga del código fuente** (`actions/checkout`)
2. **Configuración de Node.js 20** (`actions/setup-node`)
3. **Instalación de dependencias** del backend y frontend
4. **Construcción del frontend** (`npm run build`)
5. **Autenticación en Docker Hub** con secretos del repositorio
6. **Construcción y publicación** de las imágenes Docker

### Secretos requeridos en GitHub

Configura estos secretos en **Settings > Secrets and variables > Actions**:

| Secreto           | Descripción                      |
|-------------------|----------------------------------|
| `DOCKER_USERNAME` | Tu nombre de usuario en Docker Hub |
| `DOCKER_PASSWORD` | Tu contraseña o Access Token de Docker Hub |

---

## Funcionalidades

- [x] Registro de usuarios con selección de rol
- [x] Inicio de sesión con JWT
- [x] Rutas protegidas (requieren autenticación)
- [x] Visualización del rol del usuario en el header
- [x] Cerrar sesión (limpia localStorage)
- [x] CRUD de productos (crear, leer, actualizar, eliminar)
- [x] Validación de campos (precios y stock no negativos)
- [x] Visualización de imagen del producto desde URL
- [x] Notificaciones con Snackbar (MUI)
- [x] Instalable como PWA

---

## Autora

**Dayanara Bautista**  
Estudiante de Ingeniería en Tecnologías de la Información — ESPE  
Departamento de Ciencias de la Computación
