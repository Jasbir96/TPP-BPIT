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


    // **************New Open Save**************
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
                let cell = {
                    value: "",
                    formula: "",
                    children: []
                };
                row.push(cell);
            }
            db.push(row);
        }
    })

    // update
    $("#grid .cell").on("blur", function () {
        //  update entry in db
        let rowId = $(this).attr("rid");
        let colId = $(this).attr("cid");
        // to get text of any element except input
        let value = $(this).html();
        // console.log(value);
        updateCell(rowId, colId, value);
        // console.log(db);
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
                $(allCellOfarow[j]).html(db[i][j].value);
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



    // ****************Formula************************

    $("#formula-input").on("blur", function () {
        let formula = $(this).val();
        // console.log(value);
        let cellAdddress = $("#address-input").val();
        // coordinates=> update ui and db 
        let ans = evaluate(formula);
        let { rowId, colId } = getRCFromAddr(cellAdddress);
        let cellObject = db[rowId][colId];
        cellObject.formula = formula;
        setUpFormula(rowId, colId, formula);
        updateCell(rowId, colId, ans);
    })
    function evaluate(formula) {
        // Split and iterate over formula
        // ( A1 + A2 )
        let fCOmp = formula.split(" ");
        // [(,A1,+,A2)]
        console.log(fCOmp)
        for (let i = 0; i < fCOmp.length; i++) {
            let ascii = fCOmp[i].charCodeAt(0);
            if (ascii >= 65 && ascii <= 90) {
                // get RC of the parent Cell
                let { rowId, colId } = getRCFromAddr(fCOmp[i]);
                // Get value from db and replace in formula
                let value = db[rowId][colId].value;
                formula = formula.replace(fCOmp[i], value);
            }

        }
        console.log(formula);
        // evaluate the formula
        let ans = eval(formula);
        console.log(ans);
        return ans;
    }

    function setUpFormula(crowId, ccolId, formula) {
        // Split and iterate over formula
        // ( A1 + A2 )
        let fCOmp = formula.split(" ");
        // [(,A1,+,A2)]
        console.log(fCOmp)
        for (let i = 0; i < fCOmp.length; i++) {
            let ascii = fCOmp[i].charCodeAt(0);
            if (ascii >= 65 && ascii <= 90) {
                // get RC of the parent Cell
                let { rowId, colId } = getRCFromAddr(fCOmp[i]);
                // Get value from db and replace in formula
                let parentObj = db[rowId][colId];
                parentObj.children.push({
                    rowId: crowId,
                    colId: ccolId
                })

            }

        }

    }
    function updateCell(rowId, colId, ans) {

        $(`#grid .cell[rid=${rowId}][cid=${colId}]`).html(ans);
        // $('#grid .cell[rid="+rowId"+"]["+"cid="+colId+"]"').html(ans);
        let cellObject = db[rowId][colId];
        cellObject.value = ans;
        for (let i = 0; i < cellObject.children.length; i++) {
            let childRc = cellObject.children[i];
            let cObj = db[childRc.rowId][childRc.colId];
           let cAns= evaluate(cObj.formula);
           updateCell(childRc.rowId,childRc.colId,cAns);
        }
    }



    function getRCFromAddr(cellAddress) {
        // A1,A11
        let Ascii = cellAddress.charCodeAt(0);
        let colId = Ascii - 65;
        let rowId = Number(cellAddress.substring(1)) - 1;
        let obj = {
            rowId: rowId,
            colId: colId
        }
        return obj
    }

    function fn() {
        $("#new").trigger("click");
    }
    fn();


})