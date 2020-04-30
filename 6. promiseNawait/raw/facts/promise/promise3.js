function promiseCreater() {
  return new Promise(function mfn(resolve, reject) {
    setTimeout(function () {
      resolve(10);
    }, 1000);
  })
}
let pPromise = promiseCreater();
console.log("pending recieved from p1");
console.log(pPromise);
console.log("`````````````````````````````````````````````");
function resolve(data) {
  console.log("Inside resolve of 1st then")
  console.log(data);
  console.log("````````````````````````````````````");
  // return undefined;
}
function reject(err) {
  console.log(err);
}
const pPromiseFrom1stThen = pPromise.then(resolve, reject)
console.log("pending recieved from then");
console.log(pPromiseFrom1stThen);
setTimeout(function () {
  console.log("`````````````````````````````````````");
  console.log(pPromiseFrom1stThen);
}, 1500);