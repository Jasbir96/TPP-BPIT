// parallel
// f1 => read 
// f2 => read
let fs = require("fs");

console.time("task1");
fs.readFile("../f1.txt", function (err, data) {
  console.log(data.byteLength);
  console.timeEnd("task1");
})

console.time("task2");
fs.readFile("../f1.txt", function (err, data) {
  console.log(data.byteLength);
  console.timeEnd("task2");
})

console.time("task3");
fs.readFile("../f1.txt", function (err, data) {
  console.log(data.byteLength);
  console.timeEnd("task3");
})
