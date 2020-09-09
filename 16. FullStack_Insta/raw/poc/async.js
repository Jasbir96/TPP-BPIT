let fs = require("fs");
async function fReader() {
    // inside this fn all the statment will run in serail manner
    console.log("Before file Read");
    let content = await fs.promises.readFile("f1.txt");
    
    console.log("After file  started");
    return content;
}
let content = fReader();
console.log(content);
console.log("After fn call");

setTimeout(function () {
    console.log("After 1 sec");
    console.log(content)
}, 1000)