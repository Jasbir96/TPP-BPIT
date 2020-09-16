let { myFn } = require("./lib");
let fnAdd=myFn;
console.log(fnAdd);
let rVal = myFn("post");
console.log(rVal);
console.log("````````````````````````````");
rVal({name:"Jasbir"});
