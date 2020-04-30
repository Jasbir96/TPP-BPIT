let fs = require("fs");
let path = require("path");
module.exports.view = function() {
  let src = arguments[0];
  let mode = arguments[1];
  if (mode == "-t") {
    viewAsTree("", src);
  } else if (mode == "-f") {
    viewAsFlatFiles(src);
  } else {
    console.log("Wrong parameters");
  }
};
function viewAsTree(indent, src) {
  let ans = fs.lstatSync(src).isDirectory();
  if (ans == false) {
    console.log(indent + path.basename(src) + "*");
  } else {
    console.log(indent + path.basename(src));
    // how to list the content of  a directory in nodejs
    let childrens = fs.readdirSync(src);
    // console.log(childrens);
    for (let i = 0; i < childrens.length; i++) {
      let cChPath = path.join(src, childrens[i]);
      viewAsTree(indent + "\t", cChPath);
    }
  }
}
function viewAsFlatFiles(src) {
  let ans = fs.lstatSync(src).isDirectory();
  if (ans == false) {
    console.log(src + "*");
  } else {
    console.log(src);
    // how to list the content of  a directory in nodejs
    let childrens = fs.readdirSync(src);
    // console.log(childrens);
    for (let i = 0; i < childrens.length; i++) {
      let cChPath = path.join(src, childrens[i]);
      viewAsFlatFiles(cChPath);
    }
  }
}
