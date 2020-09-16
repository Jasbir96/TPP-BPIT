console.log("Hello");
module.exports.myFn = function (entity) {
    console.log("Inside outer fn")
    console.log(entity);
    return function inner(userObj) {
        console.log("Inside inner");
        console.log(entity+" of outer fn");
        console.log(userObj);
    }
};
