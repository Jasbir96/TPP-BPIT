let  x = 10;
// console.log(x);
function a() {
    let x = 20;
    x += 1;
console.log("Line Number 4 " + x); //21
    if (true) {
 let x = 30;
        x += 1;
        console.log("Line number 9 " + x);  //31
    }
    console.log("Line number 11 " + x); //31

}
let x=20;
x += 1;
// var x=40;
console.log("Line Number 18 " + x);  // 11
a();
console.log("Line Number 20 " + x); //11
