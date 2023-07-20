const mongoose = require("mongoose");
/**
 * 1 - Schema de mongoose
 * 2- Modelo -> lo que vamos a exportar
 */

const cardPostSchema = new mongoose.Schema({
  isFirst: {
    type: Boolean,
  },
  imagePost: {
    type: String,
  },
  titlePost: {
    type: String,
    minlength: 3,
    maxlength: 200,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  bodypost: {
    type: String,
    minlength: 3,
    maxlength: 200,
    required: true,
  },
});

//Exportamos el modelo
module.exports = mongoose.model("cards", cardPostSchema, "Cards");
