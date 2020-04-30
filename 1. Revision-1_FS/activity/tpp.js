let { view } = require("./commands/viewFile");
let { treefy } = require("./commands/treefyFile");
let { untreefy } = require("./commands/untreefyFile");
let { help } = require("./commands/helpFile");
// console.log(input[2]);
// console.log(input[3]);
//  function actual paramter
let cmd = process.argv[2];
// node tpp view src -t
switch (cmd) {
  case "view":
    view(process.argv[3], process.argv[4]);
    break;
  case "treefy":
    treefy(process.argv[3], process.argv[4]);
    break;
  case "untreefy":
    untreefy(process.argv[3], process.argv[4]);
    break;
  case "help":
    help();
    break;
  default:
    console.log("Wrong command");
}