const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "ThisIsMySecret");

    // En el token viene codificado el _id, por lo que después de decodificarlo podemos usarlo para encontrar el usuario

    // También tenemos que ver si el token que nos enviaron aún está en la lista de tokens del usuario
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    // Para cerrar, enviamos el usuario en el request, ya lo teníamos, no tiene sentido volverlo a pedir. Finalmente ejecutamos la ruta como estaba pensada con next()
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
