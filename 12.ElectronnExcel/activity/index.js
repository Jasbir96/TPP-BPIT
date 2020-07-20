const $ = require("jquery");
const electron = require("electron");
const fs = require("fs");
const dialog = require("electron").remote.dialog;
$(document).ready(
    function () {
        let db;
        let lsc;
        $("#grid .cell").on("click", function () {
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr + (rid + 1));
            $("#formula-container").val(db[rid][cid].formula);
            // get al the formating from the cellobject
            // add selected class 
// checks
            

            $(this).addClass("selected");
            if (lsc && lsc != this)
                $(lsc).removeClass("selected");
            lsc = this;
        })

        $("#grid-container").on("scroll", function () {
            let scrollX = $(this).scrollLeft();
            let scrollY = $(this).scrollTop();
            console.log(scrollX + " " + scrollY);
            $("#top-left-cell ,#left-col").css("left", scrollX + "px");
            $("#top-left-cell,#top-row").css("top", scrollY + "px");
        })
        $(".menu-items").on("click", function () {
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })
        $("#Save").on("click", async function () {
            let sdb = await dialog.showOpenDialog();
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(sdb.filePaths[0], jsonData);
        })
        // JS  alternative to show dialogBox
        // let fileSaver = document.querySelector("#File-saver");
        // fileSaver.addEventListener("change", function () {
        //     let fpath = fileSaver.files[0].path;
        //     let jsonData = JSON.stringify(db);
        //     fs.writeFileSync(fpath, jsonData);
        //     console.log("written file to disk");
        // })
        // Open
        $("#Open").on("click", async function () {
            let odb = await dialog.showOpenDialog();
            let fp = odb.filePaths[0];
            let content = await fs.promises.readFile(fp);
            db = JSON.parse(content);
            // loop 
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    // DB
                    let cell = db[i][j];
                    $(cRowCells[j]).html(cell.value);
                    $(cRowCells[j]).css("font-family", cell.fontfamily);
                    $(cRowCells[j]).css("font-size", cell.fontSize + "px");
                    $(cRowCells[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                    $(cRowCells[j]).css("text-decoration", cell.underline ? "underline" : "none");
                    $(cRowCells[j]).css("font-style", cell.italic ? "italic" : "normal");
                    $(cRowCells[j]).css("background-color", cell.bgColor);
                    $(cRowCells[j]).css("color", cell.textColor);
                    $(cRowCells[j]).css("text-align", cell.halign);

                }
            }
        })
        $("#New").on("click", function () {
            db = [];

            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let row = [];
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    // DB
                    let cell = {
                        value: "",
                        formula: "",
                        downstream: [],
                        upstream: [],
                        fontfamily: "Arial",
                        fontSize: 12,
                        bold: false,
                        underline: false,
                        italic: false,
                        textColor: "#000000",
                        bgColor: "white",
                        halign: 'left'
                    }

                    row.push(cell);

                    // UI 
                    $(cRowCells[j]).html("");
                    $(cRowCells[j]).css("font-family", cell.fontfamily);
                    $(cRowCells[j]).css("font-size", cell.fontSize + "px");
                    $(cRowCells[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                    $(cRowCells[j]).css("text-decoration", cell.underline ? "underline" : "none");
                    $(cRowCells[j]).css("font-style", cell.italic ? "italic" : "normal");
                    $(cRowCells[j]).css("background-color", cell.bgColor);
                    $(cRowCells[j]).css("color", cell.textColor);
                    $(cRowCells[j]).css("text-align", cell.halign);
                }
                db.push(row);
            }
            console.log(db);
            // Home menu click 

        })
        // *************Formatting*****

        $("#bold").on("click", function () {
            $(this).toggleClass("selected");
            let isBold = $(this).hasClass("selected");
            $("#grid .cell.selected").css("font-weight", isBold ? "bolder" : "normal");
            let cellElem = $("#grid .cell.selected");
            let { rowId, colId } = getRc(cellElem);
            let cellObject = getCellObject(rowId, colId);
            cellObject.bold = isBold;
        })
        $("#italic").on("click", function () {
            $(this).toggleClass("selected");
            let isitalic = $(this).hasClass("selected");

            $("#grid .cell.selected").css("font-style", isitalic ? "italic" : "normal");
            let cellElem = $("#grid .cell.selected");
            let { rowId, colId } = getRc(cellElem);
            let cellObject = getCellObject(rowId, colId);
            cellObject.b = isitalic;
        })
        $("#underline").on("click", function () {
            $(this).toggleClass("selected");
            let isunderline = $(this).hasClass("selected");
            $("#grid .cell.selected").css("text-decoration", isunderline ? "underline" : "none");
            let cellElem = $("#grid .cell.selected");
            let { rowId, colId } = getRc(cellElem);
            let cellObject = getCellObject(rowId, colId);
            cellObject.underline = isunderline;
        })

        $("#font-family").on("change", function () {
            let fontFamily = $(this).val();
            console.log(fontFamily);
            $("#grid .cell.selected").css("font-family", fontFamily);
            let cellElem = $("#grid .cell.selected");
            let { rowId, colId } = getRc(cellElem);
            let cellObject = getCellObject(rowId, colId);
            cellObject.fontfamily = fontFamily;

        })
        $("#font-size").on("change", function () {
            let fontSize = $(this).val();
            console.log(fontSize);
            $("#grid .cell.selected").css("font-size", fontSize + "px");
            let cellElem = $("#grid .cell.selected");
            let { rowId, colId } = getRc(cellElem);
            let cellObject = getCellObject(rowId, colId);
            cellObject.fontSize = fontSize;

        })
        // *************Formatting*****


        // formula Logic Starts Here
        // let lsc;
        $("#grid .cell").on("blur", function () {
            console.log("cell fn")
            // lsc = this;
            let { rowId, colId } = getRc(this);

            let cellObject = getCellObject(rowId, colId);

            if ($(this).html() == cellObject.value) {
                return
            }
            if (cellObject.formula) {
                removeFormula(cellObject, rowId, colId);
            }

            updateCell(rowId, colId, $(this).html(), cellObject);
            // console.log(db);
        })
        $("#formula-container").on("blur", function () {
            // 
            let address = $("#address-container").val();
            // console.log(address);
            let { rowId, colId } = getRcFromAddress(address);
            // set formula
            let cellObject = getCellObject(rowId, colId);
            let formula = $(this).val();
            if (cellObject.formula == $(this).val()) {
                return;
            }
            if (cellObject.formula) {
                removeFormula(cellObject, rowId, colId)
            }
            cellObject.formula = formula;
            let eValuatedVal = evaluate(cellObject);
            setUpFormula(rowId, colId, formula);
            // value set
            updateCell(rowId, colId, eValuatedVal, cellObject);
        })
        function evaluate(cellObject) {
            let formula = cellObject.formula;
            // ( A1 + A2 )
            let formulaComponent = formula.split(" ");
            // [( ,A1,+,A2,)]
            for (let i = 0; i < formulaComponent.length; i++) {
                let code = formulaComponent[i].charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    let parentRc = getRcFromAddress(formulaComponent[i]);
                    let fParent = db[parentRc.rowId][parentRc.colId];
                    let value = fParent.value;
                    formula = formula.replace(formulaComponent[i], value)
                    // (10 + 20)
                }
            }
            // ( 10 + 20 )
            console.log(formula);
            let ans = eval(formula);
            console.log(ans);
            return ans;
        }
        function updateCell(rowId, colId, val, cellObject) {
            // update yourself
            $(`#grid .cell[ri=${rowId}][ci=${colId}]`).html(val);
            // val = val.trim();
            cellObject.value = val
            // if (val) {
            // } {
            //     cellObject.value = 0;
            // }
            for (let i = 0; i < cellObject.downstream.length; i++) {
                let sdsorc = cellObject.downstream[i];
                let fdso = db[sdsorc.rowId][sdsorc.colId];
                let evaluatedValue = evaluate(fdso);
                updateCell(sdsorc.rowId, sdsorc.colId, evaluatedValue, fdso);
            }
        }
        function setUpFormula(rowId, colId, formula) {
            // parent  downstream add
            let cellObject = getCellObject(rowId, colId);
            // ( A1 + A2 )
            //    ( A1 + A2 )
            let formulaComponent = formula.split(" ");
            // [(,A1,+,A2,)]
            for (let i = 0; i < formulaComponent.length; i++) {
                let code = formulaComponent[i].charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    let parentRc = getRcFromAddress(formulaComponent[i]);
                    let fParent = db[parentRc.rowId][parentRc.colId];
                    // set yourself to your parent's downstream
                    fParent.downstream.push({
                        rowId, colId
                    })

                    cellObject.upstream.push({
                        rowId: parentRc.rowId,
                        colId: parentRc.colId
                    })
                }
            }
        }
        function removeFormula(cellObject, rowId, colId) {
            // delete yourself from parents downstream

            for (let i = 0; i < cellObject.upstream.length; i++) {
                let suso = cellObject.upstream[i];
                let fuso = db[suso.rowId][suso.colId];
                let fds = fuso.downstream.filter(function (rc) {
                    return !(rc.rowId == rowId && rc.colId == colId)
                })
                fuso.downstream = fds;
            }
            cellObject.upstream = [];
            cellObject.formula = "";
            // upstream clear
            // formula clear
        }
        function getRcFromAddress(address) {
            let colId = address.charCodeAt(0) - 65;
            let rowId = Number(address.substring(1)) - 1;
            return { colId, rowId };

        }
        function getRc(elem) {
            let rowId = $(elem).attr("ri");
            let colId = $(elem).attr("ci");
            return {
                rowId, colId
            }
        }
        function getCellObject(rowId, colId) {
            return db[rowId][colId];
        }

        function init() {
            $("#File").trigger("click");
            $("#New").click();
            $("#Home").click();
            $("#grid .cell").eq(0).click();
        }
        init();

    }

);