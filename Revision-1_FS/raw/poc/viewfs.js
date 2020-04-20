// file ,directory
// directory -> content
let fs = require("fs");
let path = require("path");
function checkPathisDirectoryOrNot(src) {
  let ans = fs.lstatSync(src).isFile();
  return ans;
}

function childrenReader(src) {
  let childrens = fs.readdirSync(src);
  return childrens;
}
function viewAsFlatFile(src) {
  let isFile = checkPathisDirectoryOrNot(src);
  if (isFile == true) {
    console.log(src + "*");
  } else {
    console.log(src);
    //childrens=> content read
    let childrens = childrenReader(src);
    for (let i = 0; i < childrens.length; i++) {
      let child = childrens[i];

      let childPath = path.join(src, child);
      // d10/d20
      viewAsFlatFile(childPath);
    }
    // children => viewAsFlatfile
  }
}
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
viewAsTree(process.argv[2], "");
// viewAsFlatFile(process.argv[2]);
// console.log(fs.readdirSync(process.argv[2]));