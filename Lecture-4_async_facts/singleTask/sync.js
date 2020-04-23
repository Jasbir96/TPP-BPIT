//  file read =>  sync ,async
// nodejs => fs  
let fs = require("fs");
console.log("Started Executing file");
console.log("Cpu is stuck till file is read");
// code stuck =>nodejs => synchronous 
let content = fs.readFileSync("f1.mp4");
// binary => array
console.log(content.byteLength);
console.log("cpu is free now");
console.log("Now i can print something")