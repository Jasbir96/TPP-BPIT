
const db = require("./connection");
const { v4: uuidv4 } = require('uuid');
//  db => model , authentication
const create = function (userobj) {
    // create user in db
    userobj.uid = uuidv4();

    // validation=> extra value 
    return new Promise(function (resolve, reject) {
        db.query('INSERT INTO user SET ?', userobj, function (err, result) {
            // Neat!
            if (err) {
                reject(err)
            } else {
                resolve(userobj);
            }
        });
    })

}
const getById = function (id, selectionobj) {
    // get user in db
}
const updateById = function (uid, updateObj) {
    // update 
}

const deleteById = function (id) {
    // delete  user in db
}
module.exports.create = create
module.exports.getById = getById
module.exports.updateById = updateById
module.exports.deleteById = deleteById