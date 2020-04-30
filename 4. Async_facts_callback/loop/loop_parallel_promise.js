let fs = require("fs");
function promiseMultiFileReader() {
  let files = ["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt", "../f5.txt"];
  for (let i = 0; i < files.length;) {
    let nsp = fs.promises.readFile(files[i++]);
    nsp.then(function (data) {
      console.log(`Data of file ${i}`);
    })
    nsp.catch(function (err) {
      console.log(err)
    })
  }
}
promiseMultiFileReader()