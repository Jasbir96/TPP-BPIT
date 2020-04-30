let fs = require("fs");
let f1 = fs.readFileSync("../../f1.txt");
console.log("F1 File content: " + f1.byteLength)
let f2 = fs.readFileSync("../../f2.txt");
console.log("F2 File Content: " + f2.byteLength);
let f3 = fs.readFileSync("../../f3.txt");
console.log("F3 FileContent " + f3.byteLength);

