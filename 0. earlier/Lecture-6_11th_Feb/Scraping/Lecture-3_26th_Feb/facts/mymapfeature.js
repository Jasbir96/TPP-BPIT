let arr = [2, 6, 17, 28, 46, 68];
function sqauarer(x) {
  return x * x;
}
// //////////
let anotheArr = [2, 4, 5, 6];
Array.prototype.mymap = function( cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    let ans = cb(this[i]);
    newArr.push(ans);
  }
  return newArr;
};

let SqArr = arr.mymap(sqauarer);
console.log(SqArr);
let AnotherSArr=anotheArr.mymap(sqauarer);
console.log(AnotherSArr);
// function=> Function
// arr=> Array
// Number
// String

