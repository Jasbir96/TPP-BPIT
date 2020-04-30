// assign a variable to another variable
// assign a function  to another variable
// Assignment opertion
// let a = 10;
// let b = a;
// // console.log(b);
// // fn definition
// // fn expression
let greeter=function sayHi(){
  console.log("Hello All");
  console.log("all fn are var");
}
// // fn call
// sayHi();
greeter()
// sayHi();
// library=> use fn 
// control => developer
// framework=> code pass => framework 
// control => framework
// library style 
function lib(number) {
  for (let div = 2; div * div <= number; div++) {
    if (number % div == 0) {
      return false;
    }
  }
  return true
}
let ans = lib(21);
if (ans == true) {
  console.log("Number is prime");
} else {
  console.log("Number is not prime");
}
// pass a variable as a parameter
// pass a function as a parameter

// function myfn(varname) {
//   console.log(varname);
// }
// myfn(10);
// myfn("I am a string passed as parameter")
// let valFrmfn = myfn(true);
// console.log(valFrmfn);
// ==,===
let { exec } = require("child_process")
// framework=> number => prime?
function framework(data, scb, fcb) {
  for (let div = 2; div * div <= data; div++) {
    console.log()
    if (data % div === 0) {
      fcb();
      return;
    }
  }
  scb();
}
// user code  
function success() {
  console.log("Number is prime");
  exec("calc");
}
function failure() {
  console.log("Number is not prime");
  exec("start chrome");
}
framework(12, success, failure);
