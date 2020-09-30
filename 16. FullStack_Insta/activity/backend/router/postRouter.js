const express = require("express");
const postRouter = new express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/post')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})
// filtering
const fileFilter = function (req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // To accept the file pass `true`, like so:
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    }
    else {
        cb(new Error('Not an image'))
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
// // POST Routes
const { createPost } = require("../controller/postController");
postRouter.route("/").post(upload.single("post"),createPost);
// // read  => GET ONE
// postRouter.route("/:post_id").get(getPost).patch(updatePost).delete(deletePost);
module.exports = postRouter;