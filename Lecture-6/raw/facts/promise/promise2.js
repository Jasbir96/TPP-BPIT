function promiseCreater() {
  return new Promise(function mfn(resolve, reject) {
      reject(10);
  })
}
let pPromise = promiseCreater();
console.log("When i was pending");
console.log(pPromise);
function resolve(data) {
  console.log(data);
}
function reject(err) {
  console.log(err)
}

pPromise.then(resolve, reject)
