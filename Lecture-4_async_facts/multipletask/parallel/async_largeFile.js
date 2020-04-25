// parallel
// f1 => read 
// f2 => read
let fs = require("fs");

console.time("task1");
fs.readFile("../f1.txt", function (err, data) {
  console.log(data.byteLength);
  console.timeEnd("task1");
})
// synchronous wait 
let ft = Date.now() + 10 * 1000;
while (Date.now() < ft) {
}
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

// => main work finish //=? async work will not start => 