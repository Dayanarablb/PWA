//Obtener todos los usuarios - implementando uno de autorizacion
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const conexion = require("../database/conexion");
const autenticacion = require("../middlewares/autenticacion");
const autorizacion = require("../middlewares/autorizacion");

router.get(
  "/",
  autenticacion,
  autorizacion("admin"),
  async (req, res) => {
    try {
      const resultado = await conexion.query(
        `SELECT u.id, u.nombre, u.correo, r.nombre AS rol
         FROM usuarios u
         JOIN roles r ON r.id = u.id_rol
         ORDER BY u.id;`,
      );

      res.status(200).json(resultado.rows);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener usuarios",
      });
    }
  },
);



module.exports = router;