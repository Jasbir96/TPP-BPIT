let fs = require("fs");
let path = require("path");

function displayList(src) {
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
      displayList(cChPath);
    }
  }
}

// displayList("d10");

function displayTree(indent, src) {
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
      displayTree(indent + "\t", cChPath);
    }
  }
}
displayTree("", "d10");
