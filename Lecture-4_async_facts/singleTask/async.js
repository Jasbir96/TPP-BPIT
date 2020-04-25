let fs = require("fs");

console.log("Started Executing file");
console.log("Cpu is stuck till file is read");
// code stuck =>nodejs => async 
// control flow => async functions 
function cb(err,data){
  // console.log(data.byteLength);
  console.log("printed file")
}
fs.readFile("f1.mp4",cb);
// binary => array
console.log("cpu is free now");
console.log("Now i can print something")
