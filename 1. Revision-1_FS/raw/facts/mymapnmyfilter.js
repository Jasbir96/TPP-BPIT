
Array.prototype.mymap = function (cb) {
  let narr = [];
  for (let i = 0; i < this.length; i++) {
    narr.push(cb(this[i]));
  }
  return narr;
}

function small(elem) {
  if (elem % 2 == 0) {
    return elem + 1;
  } else {
    return elem - 1;
  }
}
function squarer(elem) {
  return elem * elem;
}
let arr = [4, 14, 17, 23, 48, 66];

let transformedArr=arr.mymap(small);
// let transformedArr = arr.mymap(squarer);

console.log(transformedArr);

// myfilter(arr,test);