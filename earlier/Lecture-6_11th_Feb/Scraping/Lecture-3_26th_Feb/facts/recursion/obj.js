function pd(n) {
  if (n == -5) {
    return;
  }
  // self 
  console.log(n);
  // abstraction;
  pd(n - 1);
}
pd(5);
// function c() {
//   console.log("I am c");
// }
// function b() {
//   console.log("I am B");
//   c();
//   console.log(" I was printed after c ki call");
// }

// function a() {
//   console.log("A was called");
//   b();
//   console.log("I was printed after b ki call");
// }

// a();
