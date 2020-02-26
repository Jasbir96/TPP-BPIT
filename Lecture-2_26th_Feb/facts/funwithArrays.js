let arr = [2, 6, 17, 28, 46, 68];

function transformer(num) {
  if (num % 2 == 0) {
    return num + 1;
  } else {
    return num - 1;
  }
}

function filterPrime(number) {
  for (let div = 2; div * div <= number; div++) {
    if (number % div == 0) {
      return false;
    }
  }
  return true;
}

let transformedArr = arr.map(transformer);
const primeArr = transformedArr.filter(filterPrime);
console.log(primeArr);



function sqauarer(x) {
  return x * x;
}
mymap(arr, squarer);

// mymap(arr,cb)
// map => odd=>-1,even=>+1 done
// filter => used mapped arr=> filter prime arr
