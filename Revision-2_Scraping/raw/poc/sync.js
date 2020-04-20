let fs = require("fs");
console.log("Before ");
//  1sec 
let content = fs.readFileSync("f1.html");

console.log(content+"");
// after 
console.log("After");