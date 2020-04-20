//  functions first class citizens
// functions are variables
// assign a variable to another variable
// assign a function  to another variable
// Assignment opertion
let a = 10;
let b = a;
// console.log(b);
// ***************************************************************
// pass a variable as a parameter
// pass a function as a parameter
function myfn(varname) {
  console.log(varname);
}
myfn(10);
myfn("I am a string passed as parameter")
let valFrmfn = myfn(true);
console.log(valFrmfn);
//****************************************************************** */
// return a variable from a function
// return a function from a function
function specialfn() {
  return "some value"
}
let valFrmfn= specialfn();
console.log(valFrmfn)



