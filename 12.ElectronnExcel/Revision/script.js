const $ = require("jquery");
const fs = require("fs");
const dialog = require("electron").remote.dialog;
$(document).ready(function () {
    let db;
    $("#grid .cell").on("click", function () {
        // perform 
        // action
        let rid = Number($(this).attr("rid")) + 1;
        let cid = Number($(this).attr("cid")) + 65;
        let address = String.fromCharCode(cid) + rid;
        //   to set value of input type element => val set  
        $("#address-input").val(address);
    })

    // New
    $("#new").on("click", function () {
        // 
        db = [];
        let allRows = $("#grid").find(".row");
        for (let i = 0; i < allRows.length; i++) {
            let allCellOfarow = $(allRows[i]).find(".cell");
            let row = [];
            for (let j = 0; j < allCellOfarow.length; j++) {
                $(allCellOfarow[j]).html("");
                let cell = "";
                row.push(cell);
            }
            db.push(row);
        }
    })

    // update
    $("#grid .cell").on("blur", function () {
        //  update entry in db
        let rid = $(this).attr("rid");
        let cid = $(this).attr("cid");
        // to get text of any element except input
        let value = $(this).html();
        console.log(value);
        db[rid][cid] = value;
        console.log(db);


    })
    $("#open").on("click", async function () {
        // it gives array of file Paths os selected file
        let sdb = await dialog.showOpenDialog();
        let buffer = fs.readFileSync(sdb.filePaths[0]);
        console.log(buffer);
        db = JSON.parse(buffer);
        let allRows = $("#grid").find(".row");
        for (let i = 0; i < allRows.length; i++) {
            let allCellOfarow = $(allRows[i]).find(".cell");
            for (let j = 0; j < allCellOfarow.length; j++) {
                $(allCellOfarow[j]).html(db[i][j]);
            }
           
        }
    })
    $("#save").on("click", function () {
        // open dialogbox
        let sdb = dialog.showSaveDialogSync();
        let strData = JSON.stringify(db);
        console.log(sdb);
        // it directly gives pathon which file is to be created
        fs.writeFileSync(sdb, strData);
        console.log("File Saved");
        // write to disk

    })
    function fn() {
        $("#new").trigger("click");
    }
    fn();


})