const express = require("express");
const postRouter = new express.Router();

// // POST Routes
const { createPost } = require("../controller/postController");
postRouter.route("/").post(createPost);
// // read  => GET ONE
// postRouter.route("/:post_id").get(getPost).patch(updatePost).delete(deletePost);
module.exports = postRouter;