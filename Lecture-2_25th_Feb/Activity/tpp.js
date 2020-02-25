let cmd = process.argv[2];
let viewFile = require("./commands/view");
let treefyFile = require("./commands/treefy");
let untreefyFile = require("./commands/untreefy");
let monitorFile = require("./commands/monitor");
let helpFile = require("./commands/help");

switch (cmd) {
  case "view":
    viewFile.view(process.argv[3],process.argv[4]);
    break;
  case "untreefy":
    untreefyFile.untreefy(process.argv[3],process.argv[4]);
    break;
  case "treefy":
    treefyFile.treefy(process.argv[3],process.argv[4]);
    break;
  case "monitor":
    monitorFile.monitor(process.argv[3],process.argv[4]);
    break;
  case "help":
    helpFile.help();
    break;
  default:
    console.log("Wrong Command");
}
