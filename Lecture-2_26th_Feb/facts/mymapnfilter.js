let arr = [2, 6, 17, 28, 46, 68];
function sqauarer(x) {
  return x * x;
}

/////////////////////////////





let SqArr = mymap(arr, sqauarer);
console.log(SqArr);
///////////////////////


function filterPrime(number) {
  for (let div = 2; div * div <= number; div++) {
    if (number % div == 0) {
      return false;
    }
  }
  return true;
}





function myfilter(arr, cb) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (cb(arr[i]) == true) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}



let primeArr = myfilter(arr, filterPrime);
console.log(primeArr);
arr.map()

// prototype => 