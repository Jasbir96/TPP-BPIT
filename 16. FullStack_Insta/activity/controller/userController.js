let userDB = require("../model/user.json");
function createUser(req, res) {
    let user = req.body;
    // db Save
    // console.log(user);
    // if a new entry is created on server
    // memory -> ram
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname,
        "user.json"),
        JSON.stringify(userDB));
    //    res status code server send 
    res.status(201).json({
        success: "successfull",
        user: user
    })
}
function getUser(req, res) {
    let { user_id } = req.params;
    let user;
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

    res.status(200).json({
        status: "success",
        user: user
    })
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
module.exports.createUser = createUser;
module.exports.updateUser = updateUser; 
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
