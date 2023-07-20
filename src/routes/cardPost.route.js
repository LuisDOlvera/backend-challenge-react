const express = require("express");
const {
  list,
  getById,
  create,
  updatedPost,
  deletedPost,
} = require("../usecases/cardPost.usecase");

//Router
//Un conjunto de rutas en una aplicación:
const router = express.Router();

/**
 * Las Rutas
 * Aqui vamos a leer el request y el response
 * /cardPosts
 */

router.get("/", async (req, res) => {
  try {
    const cardPosts = await list();
    console.log("cardPosts", cardPosts);
    res.json({
      success: true,
      data: cardPosts,
    });
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//Obtener un post por ID
//Path params ----> id ----> /cardPosts/:id

router.get("/:id", async (req, res) => {
  try {
    const cardPosts = await getById(req.params.id);
    if (!cardPosts) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error; //return
    }
    res.json({
      success: true,
      data: cardPosts,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//Crear Post
// /cardPosts
router.post("/", async (req, res) => {
  try {
    const cardPosts = await create(req.body);
    res.status(201);
    res.json({
      success: true,
      data: cardPosts,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//Modificar un Post por ID
//Path params ----> id ----> /cardPosts/:id
router.patch("/:id", async (req, res) => {
  const { body, params } = req;
  try {
    const cardPosts = await updatedPost(params.id, body, {
      returnDocument: "after",
    });
    res.status(200);
    res.json({
      success: true,
      data: cardPosts,
      message: "El Post fue actualizado con Exito!!!",
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//Eliminar un post por ID
//Path params ----> id ----> /cardPosts/:id
router.delete("/:id", async (req, res) => {
  try {
    const cardPosts = await deletedPost(req.params.id); //Promesa
    if (!cardPosts) {
      const error = new Error("Post not found");
      error.status = 404; //not found
      throw error; //return
    }
    res.json({
      succes: true,
      data: cardPosts,
      message: "El post fue eliminado con Exito!!!",
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
