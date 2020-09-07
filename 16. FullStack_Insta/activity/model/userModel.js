
const db = require("./connection");
const { v4: uuidv4 } = require('uuid');
//  db => model , authentication
const create = function (userobj) {
    // create user in db
    // google / facebook 
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

const getById = function (id) {
    // get user in db
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * from user WHERE uid="${id}"`, function (err, result) {
            if (err) {

                reject(err);
            } else {
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
    // update UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"

    // {
    //     name: "Jasbir",
    //         number : 8800943685
    // }
    // name="kjghh",number="jghfjg"
    let updateStr = "";
    for (let key in updateObj) {
        updateStr += `${key} = "${updateObj[key]}",`
    }
    // "name = Jasbir,number = 8800943685,"
    updateStr = updateStr.substring(0, updateStr.length - 1);
    // "name = Jasbir,number = 8800943685"

    var query = `UPDATE user SET ${updateStr} WHERE uid="${uid}"`
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
        db.query(` DELETE  from user WHERE uid="${id}"`, function (err, result) {
            if (err) {

                reject(err);
            } else {
                resolve()
            }
        })
    })
}
module.exports.create = create
module.exports.getById = getById
module.exports.getAll = getAll
module.exports.updateById = updateById
module.exports.deleteById = deleteById