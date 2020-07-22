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
        let { rowId, colId } = getRCFromAddr(address);
        $("#formula-input").val(db[rowId][colId].formula);
    })

    $("#grid .cell").on("keyup", function () {
        let height = $(this).height();
        // console.log(height);
        let rowId = $(this).attr("rid");
        let lcArr = $("#left-col .cell");
        let myCol = lcArr[rowId];
        $(myCol).css("height", height);
    })
    $("#cell-container").on("scroll", function () {
        let vS = $(this).scrollTop();
        let hS = $(this).scrollLeft();
        // console.log(vS + " " + hS);
        $("#tl-cell,#top-row").css("top", vS);
        $("#tl-cell,#left-col").css("left", hS);
    })

    $(".menu").on("click", function () {
        let optionName = $(this).attr("id");
        $(".menu-options").removeClass("active");
        $(`#${optionName}-menu-options`).addClass("active");
       
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
                    children: [],
                    parents: []
                };
                row.push(cell);
            }
            db.push(row);
        }
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
    // update
    // val=> val 
    // val => formula
    $("#grid .cell").on("blur", function () {
        //  update entry in db
        let rowId = $(this).attr("rid");
        let colId = $(this).attr("cid");
        let cellObject = db[rowId][colId];
        if (cellObject.value == $(this).html()) {
            return;
        }
        if (cellObject.formula) {
            removeFormula(cellObject, rowId, colId);
        }
        // to get text of any element except input
        let value = $(this).html();
        // console.log(value);
        updateCell(rowId, colId, value);
        // console.log(db);
    })

    // val=> formula
    // formula => formula
    $("#formula-input").on("blur", function () {
        let formula = $(this).val();
        // console.log(value);
        let cellAdddress = $("#address-input").val();
        let { rowId, colId } = getRCFromAddr(cellAdddress);
        let cellObject = db[rowId][colId];

        if (cellObject.formula == $(this).val()) {
            return;
        }
        // if (checkFormula(cellObject, formula) == false) {
        //     console.log("Formula is invalid");
        //     return;
        // }
        if (cellObject.formula) {
            removeFormula(cellObject, rowId, colId);
        }
        // coordinates=> update ui and db 
        let ans = evaluate(formula);
        cellObject.formula = formula;
        setUpFormula(rowId, colId, formula, cellObject);
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
        // infix evaluation
        let ans = eval(formula);
        console.log(ans);
        return ans;
    }

    function setUpFormula(crowId, ccolId, formula, cellObject) {
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
                cellObject.parents.push({
                    rowId: rowId,
                    colId: colId
                })
            }

        }

    }
    function removeFormula(cellObject, rowId, colId) {
        for (let i = 0; i < cellObject.parents.length; i++) {
            let parentRc = cellObject.parents[i];
            let parentObj = db[parentRc.rowId][parentRc.colId];
            // let newArr = parentObj.children.filter(function (elemRc) {
            //     return !(rowId == elemRc.rowId && colId == elemRc.colId);
            // })
            // parentObj.children = newArr;
            let idx = parentObj.children.findIndex(function (elemRc) {
                return (rowId == elemRc.rowId && colId == elemRc.colId);
            })
            parentObj.children.splice(idx, 1)
        }
        cellObject.parents = [];
        cellObject.formula = "";

    }
    function updateCell(rowId, colId, ans) {

        $(`#grid .cell[rid=${rowId}][cid=${colId}]`).html(ans);
        // $('#grid .cell[rid="+rowId"+"]["+"cid="+colId+"]"').html(ans);
        let cellObject = db[rowId][colId];
        cellObject.value = ans;

        for (let i = 0; i < cellObject.children.length; i++) {
            let childRc = cellObject.children[i];
            let cObj = db[childRc.rowId][childRc.colId];
            let cAns = evaluate(cObj.formula);
            updateCell(childRc.rowId, childRc.colId, cAns);
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
        $("#File").trigger("click");
        $("#new").trigger("click");
    }
    fn();


})