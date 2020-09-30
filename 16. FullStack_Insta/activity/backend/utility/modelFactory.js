let { v4: uuidv4 } = require("uuid");
let db = require("./connection");
module.exports.createEntityFact = function (entity) {
    //  function
    return function (entityObj) {
        // create user in db
        // google / facebook 
        entityObj.id = uuidv4();
        if (entity == "post") {
            let date = new Date();
            entityObj.created_at = date.toISOString().slice(0, 19).replace('T', ' ');

        }
        // validation=> extra value 
        return new Promise(function (resolve, reject) {
            db.query(`INSERT INTO ${entity} SET?`, entityObj, function (err, result) {
                // Neat!
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(entityObj);
                }
            });
        })

    }
}
