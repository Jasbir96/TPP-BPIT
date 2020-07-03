const $ = require("jquery");
const electron = require("electron");
const fs = require("fs");
const dialog = require("electron").remote.dialog;
$(document).ready(
    function () {
        let db;
        $("#grid .cell").on("click", function () {
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr + (rid + 1));
        })
        $(".menu-items").on("click", function () {
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })
        $("#New").on("click", function () {
            db = [];
            // $("#grid").find(".row").each(function () {
            //     let row = [];
            //     $(this).find(".cell").each(function () {
            //         let cell = false;
            //         row.push(cell);
            //         $(this).html("false");
            //     })
            //     db.push(row)
            // })
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let row = [];
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    // DB
                    let cell = "false";
                    row.push(cell);
                    // UI 
                    $(cRowCells[j]).html("false");
                }
                db.push(row);
            }
            console.log(db);
        })
        $("#grid .cell").on("keyup", function () {
            // updated db
            let rowId = $(this).attr("ri");
            let colId = $(this).attr("ci");
            db[rowId][colId] = $(this).html();
            console.log(db);
        })
        $("#Save").on("click", async function () {
            let sdb = await dialog.showOpenDialog();
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(sdb.filePaths[0], jsonData);
        })
        // JS  alternative to show dialogBox
        let fileSaver = document.querySelector("#File-saver");
        fileSaver.addEventListener("change", function () {
            let fpath = fileSaver.files[0].path;
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(fpath, jsonData);
            console.log("written file to disk");
        })
        // Open
        $("#Open").on("click", async function () {
            let odb = await dialog.showOpenDialog();
            let fp = odb.filePaths[0];
            let content = await  fs.promises.readFileSync(fp);
            db = JSON.parse(content);
            // loop 
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    // DB
                    
                    $(cRowCells[j]).html(db[i][j]);
                }
            }
        })

        function init() {
            $("#File").trigger("click");
            $("#New").click();
        }
        init();

    }
);