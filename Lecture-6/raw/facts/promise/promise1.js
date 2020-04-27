function promiseCreater() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("some error occurred");
    }, 1000);
  })
}
let pPromise = promiseCreater();
console.log("When i was pending");
console.log(pPromise);

setTimeout(function () {
  console.log("When  i got resolved");
  console.log(pPromise);
}, 2000)