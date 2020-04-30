// console.log("Hello All:)");
// let varName=10;
// varName="i could also be string";
// console.log(varName);
let number = 20;
for (let div = 2; div * div <= number; div++) {
  if (number % div == 0) {
    console.log("Number is not prime");
    return;
  }
}
console.log("Number is  prime");
