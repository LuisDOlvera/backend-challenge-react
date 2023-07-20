require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/server");

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
//URL de Base de Datos
//Ocultar Base de Datos por medio de Variables de Entorno
const databaseURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@c${DB_HOST}/${DB_NAME}`;

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("We are connected to our database :)");
    app.listen(8080, () => {
      console.log("Nuestra API de Challenge Raact ya está prendida!!!");
    });
  })
  .catch((err) => {
    console.log("We have an error", err);
  });
