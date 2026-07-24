const jwt = require("jsonwebtoken");

const autenticacion = (req, res, next) => {

    const encabezado = req.headers.authorization;

    if (!encabezado) {
        return res.status(401).json({ "mensaje": "Token no proporcionado" });
    }

    const token = encabezado.split(" ")[1];

    try{

        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario;
        console.log("usuario middleware autenticacion" + usuario[0])
        next();



    }catch (error) {
        return res.status(401).json({ "mensaje": "Token inválido" });

    }
}
module.exports = autenticacion;