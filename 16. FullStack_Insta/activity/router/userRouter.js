const express = require("express");
const userRouter = new express.Router();
let { createUser, updateUser, deleteUser, getUser, getAllUser,
    handleRequest, acceptRequest, rejectRequest, getAllFollowers } = require("../controller/userController");
// user routes
// /:user_id
// read  => GET ONE 
// localhost:3000/api/v1/users/followrequest
userRouter.route("/").post(createUser).get(getAllUser)
userRouter.route("/fr").post(handleRequest);
userRouter.route("/fr/:user_id").get(getAllFollowers)
userRouter.route("/fr/:user_id/:follower_id").patch(acceptRequest).delete(rejectRequest);
userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = userRouter