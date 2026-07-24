const express = require ("express");
const productos = require("./routes/productos.routes");
const autenticacion = require("./routes/auth.routes");
const usuarios = require("./routes/usuarios.routes");
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/productos", productos);
app.use("/auth", autenticacion);
app.use("/usuarios", usuarios);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});