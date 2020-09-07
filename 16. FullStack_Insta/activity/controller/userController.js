let userDB = require("../model/user.json");
let userModel = require("../model/userModel");
let userFollowerModel = require("../model/userFollowerModel");
async function createUser(req, res) {
    try {
        let ndbuser = await userModel.create(req.body);
        // db Save
        // console.log(user);
        // if a new entry is created on server
        // memory -> ram
        //    res status code server send 
        res.status(201).json({
            success: "successfull",
            user: ndbuser
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
async function getUser(req, res) {
    try {
        let { user_id } = req.params;
        let user;
        //   db get using id 
        user = await userModel.getById(user_id);
        if (user == undefined) {
            return res.status(404).json({
                status: "failure",
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "success",
            user: user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        })
    }

}
async function updateUser(req, res) {
    let { user_id } = req.params;
    let updateObj = req.body;
    // sql => update 
    // getById=> user
    // send to res
    // update 
    try {
        await userModel.updateById(user_id, updateObj);
        const uUser = await userModel.getById(user_id);
        res.status(200).json({
            status: "success",
            "message": uUser
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
    // {user_id:12345}
}
async function deleteUser(req, res) {
    let { user_id } = req.params;
    try {
        const dUser = await userModel.getById(user_id);
        await userModel.deleteById(user_id, updateObj);
        res.status(200).json({
            status: "success",
            "message": dUser

        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}
async function getAllUser(req, res) {
    try {
        let user;
        //   db get using id 
        user = await userModel.getAll();
        if (user.length == 0) {
            return res.status(404).json({
                status: "failure",
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "success",
            user: user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "failure",
        })
    }

}
async function handleRequest(req, res) {
    try {
        // user_id=> public/private
        let reqobj = req.body;
        let { is_public } = await userModel.getById(reqobj.user_id);
        if (is_public == true) {
            reqobj.is_pending = false;
            let mappingObj = await userFollowerModel.createRequest(reqobj);
            return res.status(201).json({
                status: "accepted",
                request: mappingObj,
                "message": "your request has been accepted"

            })
        }
        let mappingObj = await userFollowerModel.createRequest(reqobj);
        return res.status(201).json({
            status: "pending",
            request: mappingObj,
            "message": "your request is pending user will accept it "

        })
        // check
        //  public=> is_pending => false
        // private => is_pending=>true
        // create Request
        // db Save
        // console.log(user);
        // if a new entry is created on server
        // memory -> ram
        //    res status code server send 
        res.status(201).json({
            success: "successfull",
            message: mappingObj
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.getAllUser = getAllUser;
module.exports.handleRequest = handleRequest;
