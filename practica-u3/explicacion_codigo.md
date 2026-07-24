# Explicación Detallada del Proyecto (API RESTful)

Este documento contiene una explicación línea por línea y carpeta por carpeta de todo tu proyecto. Está diseñado para que entiendas exactamente cómo funciona cada parte para tu prueba.

---

## 1. Estructura de Carpetas

*   **`config/`**: Contiene configuraciones de la aplicación, como la generación de JSON Web Tokens (JWT).
*   **`database/`**: Contiene todo lo relacionado con la base de datos (la conexión a PostgreSQL y el script SQL de creación de tablas).
*   **`middlewares/`**: Contiene funciones intermedias que se ejecutan antes de llegar a las rutas finales. Aquí están los filtros de seguridad: autenticación (verificar quién eres) y autorización (verificar qué puedes hacer).
*   **`routes/`**: Contiene las definiciones de las rutas (URLs) de la API (productos, usuarios, autenticación).
*   **`node_modules/`**: Carpeta generada automáticamente por npm que contiene todas las librerías descargadas (dependencias). No se debe modificar.

---

## 2. Archivos en la Raíz del Proyecto

### `package.json`
Este archivo es el "corazón" de un proyecto Node.js. Define información del proyecto y las librerías que utiliza.
*   `"scripts"`: Define comandos rápidos. `"start": "node index.js"` inicia el servidor normalmente. `"dev": "nodemon index.js"` inicia el servidor con `nodemon`, que reinicia el servidor automáticamente si haces cambios en el código.
*   `"dependencies"`: Son las librerías que tu proyecto necesita para funcionar:
    *   `bcrypt`: Para encriptar contraseñas.
    *   `dotenv`: Para leer variables de entorno desde el archivo `.env`.
    *   `express`: El framework principal para crear el servidor y la API web.
    *   `jsonwebtoken`: Para crear y verificar los tokens JWT.
    *   `pg`: El "driver" (controlador) para conectar Node.js con una base de datos PostgreSQL.

### `index.js` (Punto de Entrada)
Este es el archivo principal que levanta el servidor.
```javascript
const express = require ("express"); // Importa la librería Express
const productos = require("./routes/productos.routes"); // Importa las rutas de productos
const autenticacion = require("./routes/auth.routes"); // Importa las rutas de autenticación (login/registro)
const usuarios = require("./routes/usuarios.routes"); // Importa las rutas de usuarios
const app = express(); // Crea una instancia de la aplicación Express

require("dotenv").config(); // Carga las variables de entorno del archivo .env (puerto, credenciales DB)

const PORT = process.env.PORT || 3000; // Define el puerto del servidor. Usa el del .env o el 3000 por defecto.

app.use(express.json()); // MIDDLEWARE GLOBAL: Permite que el servidor entienda y reciba datos en formato JSON en el cuerpo (body) de las peticiones.
app.use("/productos", productos); // Define que todas las rutas dentro de 'productos.routes.js' empezarán con "/productos"
app.use("/auth", autenticacion); // Define que todas las rutas dentro de 'auth.routes.js' empezarán con "/auth"
app.use("/usuarios", usuarios); // Define que todas las rutas dentro de 'usuarios.routes.js' empezarán con "/usuarios"

// Inicia el servidor para que escuche en el puerto definido
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT); // Muestra un mensaje en consola si arranca bien
});
```

---

## 3. Carpeta `database/` (Base de Datos)

### `database/script.sql`
Es el código SQL para crear la estructura de la base de datos en PostgreSQL.
*   `create table productos (...)`: Crea la tabla de productos con id (autonumérico), nombre, descripción, stock, precio e imagen.
*   `create table usuarios (...)`: Crea la tabla de usuarios.
*   `CREATE TABLE roles (...)`: Crea la tabla de roles (admin, vendedor, cliente).
*   `ALTER TABLE usuarios ADD COLUMN id_rol INTEGER;`: Añade una columna `id_rol` a la tabla usuarios para saber qué rol tiene.
*   `ALTER TABLE usuarios ADD CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES roles(id);`: Crea una relación (clave foránea). Obliga a que el `id_rol` en la tabla usuarios deba existir en la tabla roles.

### `database/conexion.js`
Este archivo se encarga de conectar la aplicación con PostgreSQL.
```javascript
const { Pool } = require('pg'); // Importa la clase Pool de la librería 'pg' para manejar conexiones a PostgreSQL
require("dotenv").config(); // Carga el archivo .env para leer las credenciales

// Crea un "Pool" (grupo) de conexiones a la base de datos usando las variables del .env
const conexion = new Pool({
    host: process.env.DB_HOST,       // Dirección del servidor de BD (ej: localhost)
    user: process.env.DB_USER,       // Usuario de la BD (ej: postgres)
    password: process.env.DB_PASSWORD, // Contraseña de la BD
    database: process.env.DB_DATABASE, // Nombre de la BD
    port: process.env.DB_PORT        // Puerto de la BD (ej: 5432)
});

module.exports = conexion; // Exporta la conexión para poder usarla en otros archivos (como las rutas)
```

---

## 4. Carpeta `config/` (Configuraciones)

### `config/jwt.js`
Se encarga de crear el Token de seguridad cuando un usuario hace Login.
```javascript
const jwt = require("jsonwebtoken"); // Importa la librería para manejar JWT

// Función que recibe un objeto 'usuario' (que viene de la base de datos)
const generarToken = (usuario) => {
    // jwt.sign crea el token.
    return jwt.sign(
        { // 1. PAYLOAD: Los datos que viajarán dentro del token
            id: usuario.id, 
            nombre: usuario.nombre,
            rol: usuario.rol
        }, 
        process.env.JWT_SECRET, // 2. SECRET KEY: Una clave secreta del .env para firmar el token (nadie debe saberla)
        { expiresIn: "1h" }     // 3. OPCIONES: El token expira (deja de servir) en 1 hora
    );
}

module.exports = generarToken; // Exporta la función
```

---

## 5. Carpeta `middlewares/` (Seguridad e Intermediarios)

Un "middleware" es una función que intercepta una petición antes de que llegue a la ruta final. Aquí tienes dos muy importantes:

### `middlewares/autenticacion.js` (¿Quién eres? - Verifica el Token)
Se asegura de que el usuario haya enviado un Token válido para usar rutas protegidas.
```javascript
const jwt = require("jsonwebtoken");

const autenticacion = (req, res, next) => {
    // 1. Busca el token en los "Headers" (encabezados) de la petición, en 'Authorization'
    const encabezado = req.headers.authorization;

    // 2. Si no hay encabezado, rechaza la petición con error 401 (No autorizado)
    if (!encabezado) {
        return res.status(401).json({ "mensaje": "Token no proporcionado" });
    }

    // 3. El formato es "Bearer <token>". El split(" ")[1] extrae solo la parte del <token>
    const token = encabezado.split(" ")[1];

    try {
        // 4. Intenta verificar el token usando la clave secreta del servidor
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        
        // 5. Si es válido, guarda los datos del usuario (id, nombre, rol) dentro de 'req.usuario' para que las siguientes funciones puedan usarlos
        req.usuario = usuario;
        
        console.log("usuario middleware autenticacion" + usuario[0])
        
        // 6. 'next()' le dice a Express: "Todo está bien aquí, pasa a la siguiente función (o a la ruta final)"
        next();

    } catch (error) {
        // 7. Si falla (token falso, modificado o expirado), rechaza con error 401
        return res.status(401).json({ "mensaje": "Token inválido" });
    }
}
module.exports = autenticacion;
```

### `middlewares/autorizacion.js` (¿Qué puedes hacer? - Verifica Roles)
Este middleware se ejecuta *después* del de autenticación. Verifica si el rol del usuario le permite entrar a la ruta.
```javascript
// Es una función que recibe un arreglo de roles permitidos (ej: "admin", "vendedor") y devuelve el middleware
const autorizacion = (...rolesPermitidos) => {
  return (req, res, next) => {
    // 1. Verifica si 'req.usuario' existe (lo debió poner el middleware de autenticación)
    if(!req.usuario){
        return res.status(401).json({ "mensaje": "Usuario no autenticado" });
    }
    
    // 2. Comprueba si el rol del usuario (req.usuario.rol) está incluido en la lista de 'rolesPermitidos'
    if (!rolesPermitidos.includes(req.usuario.rol)) {
        console.log(req.usuario.rol)
        // 3. Si no está permitido, devuelve error 403 (Prohibido - Forbidden)
        return res.status(403).json({ "mensaje": "Usuario no tiene permiso" });
    }
    
    // 4. Si el rol es correcto, pasa a la ruta final
    next();
  }
}
module.exports = autorizacion;
```

---

## 6. Carpeta `routes/` (Rutas o Endpoints)

### `routes/auth.routes.js` (Login y Registro)
Maneja la creación de usuarios y el inicio de sesión.
```javascript
const express = require("express");
const bcrypt = require("bcrypt"); // Para encriptar contraseñas
const router = express.Router();
const conexion = require("../database/conexion"); // Importa la conexión a BD
const generToken = require("../config/jwt"); // Importa la función para crear tokens

// ------------------------------------
// RUTA DE LOGIN (POST /auth/login)
// ------------------------------------
router.post("/login", async (req, res) => {
    try {
        // 1. Obtiene correo y password del cuerpo de la petición (lo que envía el usuario)
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({ message: "Correo y contraseña son requeridos" });
        }

        // 2. Busca al usuario en la BD por su correo (y hace un JOIN para obtener el nombre de su rol)
        const resultado = await conexion.query(
            `select u.id, u.nombre, u.correo, u.password, r.nombre as rol from usuarios u
            inner join roles r on u.id_rol = r.id where u.correo = $1`,
            [correo] // $1 evita inyecciones SQL
        );

        if (resultado.rows.length === 0) { // Si no encuentra el correo
            return res.status(404).json({ message: "Credenciales incorrectas" });
        }

        const usuario = resultado.rows[0]; // Guarda los datos del usuario encontrado

        // 3. Compara la contraseña en texto plano con la encriptada en la base de datos usando bcrypt
        const esCorrecto = await bcrypt.compare(password, usuario.password);

        if (!esCorrecto) { // Si la contraseña es mala
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // 4. Si todo está bien, genera el token pasando el objeto usuario
        const token = generToken(usuario);
        
        delete usuario.password; // 5. Borra la contraseña del objeto para no enviarla de vuelta en la respuesta (por seguridad)
        
        // 6. Responde con éxito, enviando el token y los datos del usuario
        res.json({ "mensaje": "Inicio de sesión exitoso", token, usuario });

    } catch (error) { ... } // Manejo de errores
});

// ------------------------------------
// RUTA DE REGISTRO (POST /auth/register)
// ------------------------------------
router.post("/register", async (req, res) => {
    try {
        const {nombre, correo, password } = req.body; // Obtiene los datos
        
        if (!nombre || !correo || !password) return res.status(400).json({ message: "Ingrese las credenciales correctas" });

        // 1. Verifica si el correo ya existe en la BD
        const consulta = `SELECT id FROM usuarios WHERE correo = $1`;
        const resultado = await conexion.query(consulta, [correo]);
        if (resultado.rows.length > 0) {
            return res.status(400).send({ message: "El correo ya está registrado"})
        }

        // 2. Encripta la contraseña usando bcrypt con un nivel de "sal" de 10 (lo hace muy seguro)
        const passwordEncriptada = await bcrypt.hash(password, 10);

        // 3. Guarda el nuevo usuario en la base de datos con la contraseña encriptada
        const resultadoUsuario = await conexion.query(`insert into usuarios (nombre, correo, password)
            values ($1, $2, $3)`, [nombre, correo, passwordEncriptada]);

        // 4. Responde código 201 (Creado)
        res.status(201).json({ message: "Usuario registrado exitosamente", usuario: resultadoUsuario.rows[0] });

    } catch (error) { ... }
});

module.exports = router;
```

### `routes/productos.routes.js` (CRUD de Productos)
Aquí se ven los middlewares de seguridad en acción.
```javascript
const express = require("express");
const router = express.Router();
const conexion = require("../database/conexion");
const autenticacion = require("../middlewares/autenticacion");
const autorizacion = require("../middlewares/autorizacion");

// GET /productos (Obtener todos)
// OJO a los middlewares: Primero pasa por 'autenticacion' (debe tener token)
// y luego por 'autorizacion("admin")' (el token debe pertenecer a un admin)
router.get("/", autenticacion, autorizacion("admin"), async (req, res) => {
  try {
    const resultado = await conexion.query(`SELECT * FROM productos order by id`); // Consulta SQL
    res.status(200).json(resultado.rows); // Responde con las filas
  } catch (error) { ... }
});

// GET /productos/:id (Obtener uno específico)
router.get("/:id", autenticacion, autorizacion("admin"),  async (req, res) => {
  try {
    const { id } = req.params; // Extrae el 'id' de la URL (ej: /productos/5)
    const resultado = await conexion.query(`SELECT * FROM productos WHERE id = $1`, [id]);
    if (resultado.rows.length === 0) res.status(404).json({ mensaje: "Producto no encontrado" }); // 404 No encontrado
    res.status(200).json(resultado.rows[0]);
  } catch (error) { ... }
});

// POST /productos (Crear producto)
// Permite acceso a "admin" Y a "vendedor"
router.post("/", autenticacion, autorizacion("admin","vendedor"), async (req, res) => {
  try {
    const { nombre, descripcion, stock, precio, imagen } = req.body; // Saca los datos del cuerpo
    // Inserta y RETURNING * hace que PostgreSQL devuelva los datos del elemento recién creado
    const resultado = await conexion.query(
      `INSERT INTO productos (nombre, descripcion, stock, precio, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, stock, precio, imagen]
    );
    res.status(201).json(resultado.rows[0]); // 201 Creado
  } catch (error) { ... }
});

// PUT /productos/:id (Actualizar producto)
// Permite a "admin" y "vendedor"
router.put("/:id", autenticacion, autorizacion("admin","vendedor"), async (req, res) => {
  try {
    const { nombre, descripcion, stock, precio, imagen } = req.body; // Datos nuevos
    const { id } = req.params; // ID a actualizar
    const resultado = await conexion.query(
      `UPDATE productos SET nombre = $1, descripcion = $2, stock = $3, precio = $4, imagen = $5 WHERE id = $6 RETURNING *`,
      [nombre, descripcion, stock, precio, imagen, id]
    );
    if (resultado.rows.length === 0) res.status(404).json({ mensaje: "Producto no encontrado" });
    res.status(200).json(resultado.rows[0]);
  } catch (error) { ... }
});

// DELETE /productos/:id (Eliminar producto)
// Solo permitido para "admin"
router.delete("/:id", autenticacion, autorizacion("admin"),  async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await conexion.query(`DELETE FROM productos WHERE id = $1 RETURNING *`, [id]);
    if (resultado.rows.length === 0) res.status(404).json({ mensaje: "Producto no encontrado" });
    res.status(200).json("mensaje: Producto eliminado correctamente");
  } catch (error) { ... }
});

module.exports = router;
```

### `routes/usuarios.routes.js` (Consultar Usuarios)
```javascript
const express = require("express");
const router = express.Router();
const conexion = require("../database/conexion");
const autenticacion = require("../middlewares/autenticacion");
const autorizacion = require("../middlewares/autorizacion");

// GET /usuarios (Obtener todos los usuarios con su rol)
// Solo accesible para "admin"
router.get("/", autenticacion, autorizacion("admin"), async (req, res) => {
    try {
      // Consulta SQL con un JOIN para unir la tabla usuarios con la tabla roles
      // y así mostrar el nombre del rol en lugar de solo el id_rol
      const resultado = await conexion.query(
        `SELECT u.id, u.nombre, u.correo, r.nombre AS rol
         FROM usuarios u
         JOIN roles r ON r.id = u.id_rol
         ORDER BY u.id;`
      );
      res.status(200).json(resultado.rows);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
  }
);

module.exports = router;
```

---
### Resumen del Flujo (Cómo funciona todo junto)
1. El usuario intenta hacer Login enviando correo y password (`/auth/login`).
2. El servidor busca el usuario, compara la contraseña (`bcrypt`) y si todo está bien, crea un Token (`jsonwebtoken`) en `config/jwt.js` y se lo envía al usuario.
3. Ahora el usuario quiere ver los productos. Hace una petición a `GET /productos` y envía su Token en los headers (`Authorization: Bearer <token>`).
4. Express intercepta la petición con el middleware `autenticacion`. Extrae el Token, lo verifica, y extrae los datos del usuario.
5. Luego pasa al middleware `autorizacion("admin")`. Revisa si el rol del usuario extraído es "admin".
6. Si es "admin", lo deja pasar a la ruta final en `productos.routes.js`, donde se hace un `SELECT *` a PostgreSQL y se le devuelve la lista de productos.

¡Mucho éxito en tu prueba!
