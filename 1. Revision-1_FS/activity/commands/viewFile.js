let fs = require("fs");
let path = require("path");

module.exports.view = function () {
  // console.log(arguments);
  let src = arguments[0];
  let mode = arguments[1];
  if (mode == "-t") {
    viewAsTree(src, "");
  } else if (mode == "-f") {
    // console.log();
    // dmvbdsvmvkv,n/d10
    viewAsFlatFile(src, path.basename(src));
  } else {
    console.log("Wrong mode");
  }
}

// view as flat file 
// d10
function viewAsFlatFile(src, toprint) {
  let isFile = checkPathisDirectoryOrNot(src);
  if (isFile == true) {
    console.log(toprint + "*");
  } else {
    console.log(toprint);
    //childrens=> content read
    let childrens = childrenReader(src);
    for (let i = 0; i < childrens.length; i++) {
      let child = childrens[i];

      let childPath = path.join(src, child);
      // d10/d20
      viewAsFlatFile(childPath, path.join(toprint,child));
    }
    // children => viewAsFlatfile
  }
}
// view as tree
function viewAsTree(src, indent) {
  let isFile = checkPathisDirectoryOrNot(src);
  if (isFile == true) {
    console.log(indent + path.basename(src) + "*");
  } else {
    console.log(indent + path.basename(src));
    //childrens=> content read
    let childrens = childrenReader(src);
    for (let i = 0; i < childrens.length; i++) {
      let child = childrens[i];
      let childPath = path.join(src, child);
      // d10/d20
      viewAsTree(childPath, indent + "\t");
    }
    // children => viewAsFlatfile
  }
}
function checkPathisDirectoryOrNot(src) {
  let ans = fs.lstatSync(src).isFile();
  return ans;
}
function childrenReader(src) {
  let childrens = fs.readdirSync(src);
  return childrens;
}