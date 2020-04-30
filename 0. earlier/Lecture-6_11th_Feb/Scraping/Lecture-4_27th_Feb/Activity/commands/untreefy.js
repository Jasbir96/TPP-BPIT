let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");
module.exports.untreefy = function() {
  console.log("untreefy command has been Called");
  let src = arguments[0];
  let dest = arguments[1];
  let root = {};
  untreefyFolder(src, dest, root);
  fs.writeFileSync(path.join(dest, "metadata.json"), JSON.stringify(root));
  console.log("File written to dest");
  // console.log(root);

  console.log("All files have been copied");
};

function untreefyFolder(src, dest, node) {
  let ans = fs.lstatSync(src).isDirectory();
  if (ans == false) {
    let uniqueName = uniqid();
    node.isFile = true;
    node.name = path.basename(src);
    node.newName = uniqueName;
    //copy file from src to dest=> and rename them
    fs.copyFileSync(src, path.join(dest, uniqueName));
  } else {
    node.isFile = false;
    node.name = path.basename(src);
    node.children = [];
    let childrens = fs.readdirSync(src);
    for (let i = 0; i < childrens.length; i++) {
      let cChildObj = {};
      let chPath = path.join(src, childrens[i]);
      untreefyFolder(chPath, dest, cChildObj);
      node.children.push(cChildObj);
    }
  }
}
