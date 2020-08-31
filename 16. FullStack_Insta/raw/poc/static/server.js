const express = require("express");
const app = express();
//  public folder that could be used by any client
app.use(express.static("public"));
// localhost:3000

app.listen(3000, function () {
    console.log("Server started at port 3000");
})