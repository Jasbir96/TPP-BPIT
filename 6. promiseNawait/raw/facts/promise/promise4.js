function promiseCreater() {
  return new Promise(function mfn(resolve, reject) {
    setTimeout(function () {
      reject(10);
    }, 1000);})
}
let pPromise = promiseCreater();
function resolve(data) {
  console.log("Inside resolve of 1st then")
  console.log(data);
  console.log("````````````````````````````````````");
  // return undefined;
}
function reject(err) {
  console.log(err);
  // return Promise.reject();
  // return Promise.resolve();
  // throw new Error("Error send by reject /fcb of 1st Then");
}
function resolve1(data) {
  console.log("scb of 2nd then")
  console.log(data);
  
}
function reject1(err) {
  console.log("Inside fcb of 2nd then")
  console.log(err)
}
pPromise.then(resolve, reject).then(resolve1(20), reject1)
