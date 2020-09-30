const express = require("express");
const userRouter = new express.Router();
const multer=require("multer");
let { createUser, updateUser, deleteUser, getUser, getAllUser,
    handleRequest, acceptRequest, rejectRequest, getAllFollowers } = require("../controller/userController");
// user routes
// /:user_id
// read  => GET ONE 
// localhost:3000/api/v1/users/followrequest
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/user')
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
userRouter.route("/").post(createUser).get(getAllUser)
userRouter.route("/fr").post(handleRequest);
userRouter.route("/fr/:user_id").get(getAllFollowers)
userRouter.route("/fr/:user_id/:follower_id").patch(acceptRequest).delete(rejectRequest);
userRouter.route("/:user_id").get(getUser).patch(upload.single("user"), updateUser).delete(deleteUser);
module.exports = userRouter