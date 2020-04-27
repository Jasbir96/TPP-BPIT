// functions are variables
// you can assign value /address of one variable to another
let a = 10;
let b = a;
// console.log(b);
// you can pass variables as parameters
// function definition
= function greeter(whatToSay) {
  console.log(whatToSay);
}

let sayHi = greeter;

// greeter(10);
sayHi(function asparam() {
  console.log("I may be passed as parameter");
});
// sayHi("functions are also vars");
// function calls
// greeter("sdjhfbvjsdcb");
// greeter('123e4r56dvfsg');
// greeter(true);


// you can also return a variable from a function
