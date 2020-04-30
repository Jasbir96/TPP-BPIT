// server
const { exec } = require("child_process");
function takeRequest(data, success, failure) {
  if (data % 2 == 0) {
    success();
  } else {
    failure();
  }
}
//client
function success() {
  console.log("Your request was completed");
  exec("calc");
}
function failure() {
  console.log("Some error occurred");
  // chrome facebook page
  exec("start chrome https://ifttt.com/");
}
takeRequest(17, success, failure);
takeRequest(18, success, failure);
