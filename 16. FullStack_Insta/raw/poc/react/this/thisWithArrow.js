// global object add 
"use strict";
// name = "Jasbir";


let myObj = {
    name: "Steve",
    sayHi: function () {
        //  this is current object that has called sayHi fn
        // console.log("Hi " + this.name);
        // console.log("Inside sayHi");
        console.log("Line no 7");
        console.log(this);

        // fn call => this => undefined 
        let inner = () => {
            // arrow fn doesn't have it's own this takes this from outside
    console.log("line no 11");
    console.log(this.name);
        }

        inner();


    }
}

//  myobj has called say HI
// method call this will current obj 
myObj.sayHi();