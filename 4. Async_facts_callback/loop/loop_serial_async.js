let fs = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt","../f4.txt","../f5.txt"];
readFiles(0)
// sequentially n number files read
function readFiles(i) {
  if (i == files.length) {
    return;
  }
  fs.readFile(files[i], function (err, data) {
    // console.log(err);
    console.log(`Data of file${i + 1} : ${data.byteLength}`);
    readFiles(i + 1);
  })
}