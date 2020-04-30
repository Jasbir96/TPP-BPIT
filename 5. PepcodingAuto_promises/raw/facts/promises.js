let fs = require("fs");
// promise based fn use=> promise => pending 
// paradigm
// creater 
// resolve 
//reject 
function promisifyfs(path) {
  let createrPromise = new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
  return createrPromise;
}
// consume
// let fileWillBeReadPromise = fs.promises.readFile("f1.html");

// promise => settle 
// console.log(fileWillBeReadPromise);
// resolve=> ans 
// fileWillBeReadPromise.
//   then(
//     function (data) {
//       console.log("inside scb")
//       console.log(data.length);
//       let f2WillBeReadPromise = promisifyfs("f2.html");
//       return f2WillBeReadPromise;
//     },
//     function (err) {
//       console.log("inside fcb");
//       console.log(err);
//       let f2WillBeReadPromise = promisifyfs("f2.html");
//       return f2WillBeReadPromise;
//     })
//   .then(
//     function (data) {
//       console.log("Inside 2nd then");
//       console.log(data);
//     })


// // consumer // 2nd then 
// fileWillBeReadPromise.
//   then(
//     function (data) {
//       console.log("inside scb")
//       console.log(data.length);
//       let f2WillBeReadPromise = promisifyfs("f2.html");
//       return f2WillBeReadPromise;
//     })
//   .then(
//     function (data) {
//       console.log("Inside 2nd then");
//       console.log(data);
//     },function fcb(err){
//       console.log("fcb of 2nd then")
//       // console.log(err);
//       return "All Well"
//     }).then(function(data){
// console.log(data);
//     })


let fileWillBeReadPromise = promisifyfs("f11.html");
fileWillBeReadPromise.
  then(
    function (data) {
      console.log("inside scb")
      console.log(data.length);
      let f2WillBeReadPromise = promisifyfs("f2.html");
      return f2WillBeReadPromise;
    })
  .then(
    function (data) {
      console.log("Inside 2nd then");
      console.log(data);
    }).then(function () {
      console.log("I saved the day");
      console.log(err);
    }).catch(function (err) {
      console.log("catch saved me");
    }).then()



    // wherever you will introduce catch  => error will be suppressed