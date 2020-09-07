let userDB = require("../model/user.json");
let userModel = require("../model/userModel");
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
function updateUser(req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let user;
    let toUpdate = req.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    // update
    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    // update 
    res.status(200).json({
        status: "success",
        "message": "message"
    })

}
function deleteUser(req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let initialUserL = userDB.length;
    userDB = userDB.filter(function (user) {
        return user.user_id != user_id;
    })
    if (initialUserL == userDB.length) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));

    res.status(200).json({
        status: "success",
        "message": "user deleted"
    })
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

module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.getAllUser = getAllUser;
