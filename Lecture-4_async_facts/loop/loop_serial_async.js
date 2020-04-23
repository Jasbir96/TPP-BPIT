let fs = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt", "../f1.mp4", "../f2.mp4"];
readFiles(0)
// sequentially n number files read
function readFiles(i) {
  if (i == files.length) {
    return;
  }
  fs.readFile(files[i], function (err, data) {
    console.log(`Data of file${i + 1} : ${data.byteLength}`);
  })
  readFiles(i + 1);
}