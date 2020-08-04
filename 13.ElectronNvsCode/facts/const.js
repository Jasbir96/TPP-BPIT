//  it makes the reference constant
const a = 10;
// a = 20;
const b = [1, 2, 3, 4, 5];
b.myfn=function(){
    console.log("I am a method on b");
}
// b = [1, 2, 3];
b.pop();
// b.shift();
b.myfn()
