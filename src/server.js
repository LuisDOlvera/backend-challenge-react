const express = require("express");
const app = express();
const cors = require("cors");

//Routes
const routerCardPost = require("./routes/cardPost.route");
const routerUser = require("./routes/user.route");
const routerAuth = require("./routes/auth.route");

//Middlewares para toda nuestra API
app.use(cors());
app.use(express.json());

//Middlewares de Rutas
app.use("/cardPosts", routerCardPost);
app.use("/users", routerUser);
app.use("/auth", routerAuth);

/**
 * ----> Aqui se ponen los Middlewares
 * ----> Probar el endpoint de home
 * ----> Rutear
 */

//Endpoint de Home
app.get("/", (request, response) => {
  response.json("Nuestra API Sirve!!!");
});

//Exportar app
module.exports = app;
