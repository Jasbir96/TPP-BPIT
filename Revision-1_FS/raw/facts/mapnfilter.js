let arr = [4, 14, 17, 23, 48, 66];

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
function test(elem) {
  for (let div = 2; div * div <= elem; div++) {
    if (elem % div == 0) {
      return false;
    }
  }
  return true
}
// 2015=> library(lodash) => language
let transformedArr = arr.map(small);
let primeArr = transformedArr.filter(test);
console.log(primeArr);
// mymap(arr, small);

// myfilter(arr,test);

// map
// even+1
// odd-1
// filter
// filter prime number