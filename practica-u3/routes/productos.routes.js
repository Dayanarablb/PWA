const express = require("express");
const router = express.Router();
const conexion = require("../database/conexion");
const autenticacion = require("../middlewares/autenticacion");
const autorizacion = require("../middlewares/autorizacion");

// Ruta para obtener todos los productos

router.get("/", autenticacion, autorizacion("admin"), async (req, res) => {
  try {
    const resultado = await conexion.query(`
            
            SELECT * FROM productos order by id
        `);
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al obtener los productos" });
  }
});

// Obtener un producto por su ID

router.get("/:id", autenticacion, autorizacion("admin"),  async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await conexion.query(
      `
            SELECT * FROM productos WHERE id = $1
        `,
      [id],
    );
    if (resultado.rows.length === 0) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al obtener los productos" });
  }
});

// Crear un nuevo producto

router.post("/", autenticacion, autorizacion("admin","vendedor"), async (req, res) => {
  try {
    const { nombre, descripcion, stock, precio, imagen } = req.body;
    const resultado = await conexion.query(
      `
            INSERT INTO productos (nombre, descripcion, stock, precio, imagen)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
      [nombre, descripcion, stock, precio, imagen],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al crear el producto" });
  }
});

//Actualizar un producto por su ID

router.put("/:id", autenticacion, autorizacion("admin","vendedor"), async (req, res) => {
  try {
    const { nombre, descripcion, stock, precio, imagen } = req.body;
    const { id } = req.params;
    const resultado = await conexion.query(
      `
            UPDATE productos SET nombre = $1, descripcion = $2, stock = $3, precio = $4, imagen = $5 WHERE id = $6 RETURNING *
        `,
      [nombre, descripcion, stock, precio, imagen, id],
    );
    if (resultado.rows.length === 0) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al crear el producto" });
  }
});

//Eliminar un producto por su ID

router.delete("/:id", autenticacion, autorizacion("admin"),  async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await conexion.query(
      `
            DELETE FROM productos WHERE id = $1 RETURNING * 

        `,[id]
    );
    if (resultado.rows.length === 0) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.status(200).json("mensaje: Producto eliminado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ "mensaje": "Error al eliminar el producto" });
  }
});


module.exports = router;
