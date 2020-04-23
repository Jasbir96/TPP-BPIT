// parallel
// f1 => read 
// f2 => read
let fs = require("fs");
let request = require("request");
console.time("task1");
request("https://www.google.com", function (err, res, html) {
  // console.log("Data has arrived for r1");
  console.timeEnd("task1")
  fs.writeFileSync("index.html", html)
})

let finalTime=Date.now()+10*1000;
while(Date.now()<finalTime){
  }
  console.time("task2");
  request("https://www.google.com", function (err, res, html) {
    // console.log("Data has arrived for r2");
    fs.writeFileSync("index1.html", html);
    console.timeEnd("task2")
})

//  finalTime=Date.now()+10*1000;
// while(Date.now()<finalTime){
// }
console.time("task3");
request("https://www.google.com", function (err, res, html) {
  // console.log("Data has arrived for r3");
  fs.writeFileSync("index2.html",html);
  console.timeEnd("task3");
})
// nodejs //browser=> request,readfile
// 
