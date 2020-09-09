// global object add 
// name = "Jasbir";
let myObj = {
    name: "Steve",
    sayHi: function () {
        //  this is current object that has called sayHi fn
        // console.log("Hi " + this.name);
        console.log("Line no 7");
        console.log(this);
        console.log(this == global);
        console.log("Inside sayHi");
        // fn call => this => global 
        function inner() {
            console.log("line no 11");
            console.log(this == global);
            console.log(this.name);
        }
        // global object 
        inner();
    }
}
//  myobj has called say HI
// method call this will current obj 
myObj.sayHi();
//  addres transfer
// let myVar = myObj.sayHi;

// myVar();
// myObj.sayHi()
// this is decided on runtime
// function fun() {
//     console.log(global);
// }
// fun();