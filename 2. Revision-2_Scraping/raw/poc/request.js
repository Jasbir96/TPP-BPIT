let request = require("request");
let fs = require("fs");
console.log("Before");
request("https://www.amazon.in/Apple-iPhone-Plus-Gold-256GB/dp/B071VTZYYH/ref=sr_1_1?dchild=1&keywords=iphone&qid=1587381622&sr=8-1", function (err, res, html) {
  if (err === null && res.statusCode === 200) {
    // fs.writeFile("index.html", html, function () {
    //   console.log("Written file to disk");
    // })
    fs.writeFileSync("index.html", html);
  } else if (res.statusCode === 404) {
    console.log("Invalid URL");
  } else {
    console.log(err);
    console.log(res.statusCode);
  }

})
console.log("After");