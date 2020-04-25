let fs = require("fs");
// readFiles(0)
// sequentially n number files read
// function readFiles(i) {
  //   if (i == files.length) {
    //     return;
    //   }
    //   fs.readFile(files[i], function (err, data) {
      //     // console.log(err);
      //     console.log(`Data of file${i + 1} : ${data.byteLength}`);
      //     readFiles(i + 1);
      //   })
      // }
      function promiseMultiFileReader() {
        let files = ["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt", "../f5.txt"];

  let file1WillBeReadPromise = fs.promises.readFile(files[0]);
  for (let i = 1; i < files.length; i++) {
    file1WillBeReadPromise = file1WillBeReadPromise.then(function (data) {
      console.log(`File no ${i} printed`)
      let nfp = fs.promises.readFile(files[i]);
      return nfp;
    })
    // return file1WillBeReadPromise
  }
  return file1WillBeReadPromise;
}
promiseMultiFileReader().then(function(data){
  console.log("file 5 will be printed");
  console.log(data);
})
// let f1WillBereadPromise = filezWillBeReadPromise.then(function (data) {
//   console.log(data);
//   return fs.promises.readFile[1];
// })
// let f2WillBeReadPromise = f1WillBereadPromise.then(function (data) {
//   console.log(data);
//   return fs.promises.readFile[2];
// })
// f2WillBeReadPromise.then(function (data) {
//   console.log(data)
// })
