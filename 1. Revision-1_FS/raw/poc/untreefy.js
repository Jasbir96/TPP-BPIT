// file =>   with new name copy it's data
// directory => 
let uniqid = require('uniqid');
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
// d10
function untreefy(src, dest) {
  let isFile = checkPathisDirectoryOrNot(src);
  if (isFile === true) {
    // src => file
    // copy data
    let newFileName = uniqid();
    let destPath = path.join(dest, newFileName);
    fs.copyFileSync(src, destPath);
    // store information
    node.isFile = true;
    node.oldName = path.basename(src);
    node.newName = newFileName;
    // console.log(`file copied from ${path.basename(src)} to ${path.basename(dest)}/${path.basename(destPath)}`);
  } else {
    // store information
    node.isFile = false;
    node.children = [];
    node.name = path.basename(src);
    // get content
    let childrens = childrenReader(src);
    // childrens loop
    for (let i = 0; i < childrens.length; i++) {
      let cpath = path.join(src, childrens[i]);
      let chobj = {}
      untreefy(cpath, dest, chobj);
      node.children.push(chobj);
    }
  }
}
let root = {
  
};
untreefy(process.argv[2], process.argv[3], root);
fs.writeFileSync(path.join(process.argv[3], "metadata.json"), JSON.stringify(root))
// console.log(root);