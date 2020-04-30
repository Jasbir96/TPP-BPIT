setTimeout(
  function () { console.log("Task 1 printed after 3 sec") }, 3000);
// sync wait => async code serially 
// async fs ,request => 
  let ft = Date.now() + 3 * 1000;
while (Date.now() < ft) {
}
setTimeout(function () {
  console.log("Task 2 printed after  minmum delay of 2sec")
}, 2000);
setTimeout(function () {
  console.log("Task 3printed after 2 sec")
}, 2000);