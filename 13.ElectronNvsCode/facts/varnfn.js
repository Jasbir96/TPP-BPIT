console.log(x);
var x = 10;
console.log(x);
function a() {
    // var x = 20;

    x += 1;
    console.log("Line Number 4" + x); //21
    if (true) {
        var x = 30;
        x += 1;
        console.log("Line number 9 " + x);  //31
    }
    console.log("Line number 11 " + x); //31

}
x += 1;
// var x=40;
console.log("Line Number 18 " + x);  // 11
// a();
console.log("Line Number 20 " + x); //11
