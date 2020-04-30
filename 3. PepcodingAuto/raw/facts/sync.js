let fs = require("fs");
console.log("Before");
console.log("Start")
let f1content = fs.readFileSync("f1.html");
console.log(f1content + "");
let f2Content = fs.readFileSync("f2.html");
console.log(f2Content + "");
console.log("Finish");
console.log("After");