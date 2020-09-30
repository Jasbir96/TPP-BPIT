let userDB = require("../model/user.json");
let userModel = require("../model/userModel");
let userFollowerModel = require("../model/userFollowerModel");
// ********************CRUD USER*****************
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
    console.log(req.body)
    let img;
    if (req.file) {

        img = req.file.filename;
        updateObj.p_img_url = "/user/" + img;
    }
    // sql => update 
    // getById=> user
    // send to res
    // update 
    // url 
    try {
        await userModel.updateById(user_id, updateObj);
        const uUser = await userModel.getById(user_id);
        // console.log(uUser);
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
// *******************Request***********************
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
async function acceptRequest(req, res) {
    try {
        // user_id=> public/private
        let { user_id, follower_id } = req.params;
        await userFollowerModel.acceptRequestQ(user_id, follower_id);
        let { handle } = await userModel.getById(follower_id);
        res.status(201).json({
            success: "successfull",
            message: `${handle} started following you`
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}

async function rejectRequest(req, res) {
    try {
        // user_id=> public/private
        let { user_id, follower_id } = req.params;
        await userFollowerModel.rejectRequestQ(user_id, follower_id);
        let { handle } = await userModel.getById(follower_id);
        res.status(201).json({
            success: "successfull",
            message: `${handle} rejected`
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
async function getAllFollowers(req, res) {

    try {
        // user_id=> public/private
        let { user_id } = req.params;
        // user_id, follower_id,is_pending ,
        let UfollResult = await userFollowerModel.getAllFolId(user_id);
        if (UfollResult.length > 0) {
            async function helper(userfollowObj) {
                let { follower_id, is_pending } = userfollowObj;
                // user table
                let { handle, p_img_url } = await userModel
                    .getById(follower_id);
                console.log(handle);
                return { handle, p_img_url, is_pending };
            }
            //             let newArr = [];
            //             for (let i = 0; i < UfollResult.length; i++) {
            //                 newArr.push(helper(UfollResult[i]));
            //             }
            // console.log("Line no 212");
            //             console.log(newArr);
            let pArray = UfollResult.map(helper);
            //  await => sync 
            let folImgHandArr = await Promise.all(pArray);

            res.status(201).json({
                success: "successfull",
                message: folImgHandArr
            })
        } else {
            res.status(201).json({
                success: "successfull",
                message: `no user found`
            })
        }
        // 1. image_url
        // 2. handle

        // res.status(201).json({
        //     success: "successfull",
        //     message: `${handle} rejected`
        // })
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
module.exports.acceptRequest = acceptRequest;
module.exports.rejectRequest = rejectRequest;
module.exports.getAllFollowers = getAllFollowers;

