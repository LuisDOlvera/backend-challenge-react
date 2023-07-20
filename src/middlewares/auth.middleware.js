/**
 * Middeeare de Auth que vamos a utilizar en las rutas privadas
 * El token se pone en los headers
 *
 * headers : {
 * Content-Type: application/json,
 * Autorization: `Bearer ${token}`
 * }
 */
const jwt = require("../lib/jwt.lib");

const auth = (request, response, next) => {
  try {
    //Obtener mi header de autorización
    const authorization = request.headers.authorization || "";
    //Quitar el Bearer a mi header para obtener mi token de JWT
    const token = authorization.replace("Bearer ", "");
    console.log("Token :", token);
    //Verificar el token
    const isVerified = jwt.verify(token);
    next();
  } catch (err) {
    response.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = auth;
