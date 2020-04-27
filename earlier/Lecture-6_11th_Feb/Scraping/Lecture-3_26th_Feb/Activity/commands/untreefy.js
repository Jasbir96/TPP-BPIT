let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");
module.exports.untreefy = function() {
  console.log("untreefy command has been Called");
  let src = arguments[0];
  let dest = arguments[1];

  untreefyFolder(src, dest);
  console.log("All files have been copied")
};

function untreefyFolder(src, dest) {
  let ans = fs.lstatSync(src).isDirectory();
  if (ans == false) {
    let uniqueName = uniqid();
    //copy file from src to dest=> and rename them
    fs.copyFileSync(src, path.join(dest, uniqueName));
  } else {
    let childrens = fs.readdirSync(src);

    // console.log(childrens);
    for (let i = 0; i < childrens.length; i++) {
      let cChPath = path.join(src, childrens[i]);
      untreefyFolder(cChPath, dest);
    }
  }
}
