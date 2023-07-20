const CardPost = require("../models/cardPost.model");
/**
 * Crud
 */

//Enlistar posts
const list = () => {
  const cardPosts = CardPost.find();
  return cardPosts;
};

//Obtener Post por id
const getById = (id) => {
  const cardPosts = CardPost.findById(id);
  return cardPosts;
};

//Crear Post
const create = (data) => {
  const cardPosts = CardPost.create(data);
  return cardPosts;
};

//Modificar Post
const updatedPost = (id, body) => {
  const cardPosts = CardPost.findByIdAndUpdate(id, body);
  return cardPosts;
};

//Eliminar Post
const deletedPost = (id) => {
  const cardPosts = CardPost.findByIdAndDelete(id);
  return cardPosts;
};

module.exports = { list, getById, create, updatedPost, deletedPost };
