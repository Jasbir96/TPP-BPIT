// Function
// Array
// String
// Number 
// function sayHi() {
//   console.log("Hello All");
// }
// console.log(sayHi); [Function :sayHi]
// Array 
Array.prototype.sum = function () {
  let arrSum = 0;
  for (let i = 0; i < this.length; i++) {
    arrSum += this[i];
  }
  return arrSum;
}
Array.prototype.myeach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i]);
  }
}
let arr = [4, 14, 17, 23, 48, 66];
let arr1 = [4, 20, 4, 5, 48, 66];
let sum = arr.sum();
let sum1 = arr1.sum();
console.log(sum);
console.log(sum1);


// String 