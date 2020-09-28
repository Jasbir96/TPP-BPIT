const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.json());
app.use(express.static());
// naming control => multer 
// no filtering
// folder where files from client would be saved
// naming filteration
// naming
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})
// filtering
const fileFilter = function (req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // To accept the file pass `true`, like so:
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    }
    else {
        cb(new Error('Not an image'))
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
// upload=multer({dest:"public"})
app.post("/uploadMedia", upload.single("photo"), function (req, res) {
    console.log(req.body);
    // console.log(req.file.file);
    let img = req.file;
    // link => db 

    res.status(200).json({
        "message": "file recieved"
    })
})

app.listen(4000, console.log("Server started at port 4000"));