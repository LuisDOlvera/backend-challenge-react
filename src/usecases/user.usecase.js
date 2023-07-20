const bcrypt = require("bcrypt");
const createError = require("http-errors");
const User = require("../models/user.model");
const jwt = require("../lib/jwt.lib");
/**
 * Registro ----> Autenticación
 */

//Iniciar sesión
const login = async (email, textPlainPassword) => {
  //Validar que un usuario con ese correo exista
  const user = await User.findOne({ email });

  // Si falla correo
  if (!user) throw createError(401, "Invalid Data");

  //Verificamos la Password
  const isValidPassword = await bcrypt.compare(
    textPlainPassword,
    user.password
  );
  if (!isValidPassword) throw createError(401, "Invalid Data");

  //Si es la password y si es el correo, regresamos el token
  const token = jwt.sign({ email: user.email, id: user._id });
  console.log("Token: ", token);
  return token;
};

//Crear y hashear la Password
const create = async (data) => {
  //Cadenas aleatorias
  const saltRounds = 10;
  //Hashear la password
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  //Cambiar la password en texto plano a la hasheada
  data.password = hashedPassword;
  // Crear el usuario con la password hasheada
  const user = await User.create(data);
  return user;
};

//Enlistar Usuarios
const list = (filters) => {
  const users = User.find(filters);
  return users;
};

//Obtener Usuarios por su ID:
const get = async (id) => {
  const users = await User.findById(id);
  if (!users) throw createError(404, "User not found");
  return users;
};

module.exports = { create, login, list, get };
