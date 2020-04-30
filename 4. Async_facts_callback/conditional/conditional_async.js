let fs = require("fs");
let files = ["../f1.txt", "../f2.txt", "../f3.txt", "../f1.mp4", "../f2.mp4"];
fs.readFile(files[0], function (err, data) {
  console.log(`File 1 data ${data.byteLength}`);
  if (data.byteLength > 20) {
    fs.readFile(files[1], function (err, data) {
      console.log(`File2 Data ${data.byteLength}`);
      if (data.byteLength > 40) {
        fs.readFile(files[5], function (err, data) {
          console.log(`File 6 Data ${data.byteLength}`);
        })
      } else {
        fs.readFile(files[6], function (err, data) {
          console.log(`File 7 Data ${data.byteLength}`);
        })
      }
    })
  } else {
    fs.readFile(files[2], function (err, data) {
      console.log(`File3 Data ${data}`)
      if (data.byteLength < 30) {
        fs.readFile(files[3], function (err, data) {
          console.log(`Data of File 4 ${data.byteLength}`);
        })
      } else {
        fs.readFile(files[4], function (err, data) {
          console.log(`Data of File 5 ${data.byteLength}`);
        })
      }
    })
  }
})
