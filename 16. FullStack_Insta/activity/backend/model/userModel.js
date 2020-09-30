const db = require("./connection");
const { v4: uuidv4 } = require('uuid');
//  db => model , authentication
const { createEntityFact } = require("../utility/modelFactory");
const createUser = createEntityFact("user");
const getById = function (id) {
    // get user in db
    console.log(`SELECT * from user WHERE id="${id}"`);
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * from user WHERE id="${id}"`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result[0])
            }
        })
    })
}
const getAll = function () {
    // get user in db
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * from user`, function (err, result) {
            if (err) {

                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}
const updateById = function (uid, updateObj) {
   
    let updateStr = "";
    for (let key in updateObj) {
        updateStr += `${key} = "${updateObj[key]}",`
    }
    // "name = Jasbir,number = 8800943685,"
    updateStr = updateStr.substring(0, updateStr.length - 1);
    // "name = Jasbir,number = 8800943685"

    var query = `UPDATE user SET ${updateStr} WHERE id="${uid}"`
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }

        })
    })

}
const deleteById = function (id) {
    // delete  user in db
    return new Promise(function (resolve, reject) {
        db.query(` DELETE  from user WHERE id="${id}"`, function (err, result) {
            if (err) {

                reject(err);
            } else {
                resolve()
            }
        })
    })
}

module.exports.create = createUser;
module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;