const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const conexion = require("../database/conexion");
const generToken = require("../config/jwt");

router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                message: "Correo y contraseña son requeridos"
            });
        }

        const resultado = await conexion.query(
            `select u.id, u.nombre, u.correo, u.password, r.nombre as rol from usuarios u
            inner join roles r on u.id_rol = r.id where u.correo = $1`,
            [correo]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                message: "Credenciales incorrectas"
            });
        }

        const usuario = resultado.rows[0];

        const esCorrecto = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!esCorrecto) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            });
        }

        const token = generToken(usuario);
        delete usuario.password; // Eliminar la contraseña del objeto usuario antes de enviarlo en la respuesta
        res.json({ 
            "mensaje": "Inicio de sesión exitoso", 
            token,
            usuario
         });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({
            error: "Error en el servidor"
        });
    }
});

router.post("/register", async (req, res) => {
    try {
        const {nombre, correo, password, id_rol } = req.body;
        if (!nombre || !correo || !password || !id_rol) {
            return res.status(400).json({
                message: "Ingrese las credenciales y el rol correctos"
            });
        }
        const consulta = `SELECT id FROM usuarios WHERE correo = $1`;
        
        const resultado = await conexion.query(consulta, [correo]);
        if (resultado.rows.length > 0) {
            return res.status(400).send({
                message: "El correo ya está registrado"})
        }
        const passwordEncriptada = await bcrypt.hash(password, 10);

        const resultadoUsuario = await conexion.query(`insert into usuarios (nombre, correo, password, id_rol)
            values ($1, $2, $3, $4) RETURNING *`, [nombre, correo, passwordEncriptada, id_rol]);

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            usuario: resultadoUsuario.rows[0]
        });
        

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({
            error: "Error en el servidor"
        });
    }
});

module.exports = router;