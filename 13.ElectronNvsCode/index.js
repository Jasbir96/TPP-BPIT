const $ = require("jquery");

const path = require("path");
const fs = require("fs");
$(document).ready(function () {


    let src = process.cwd();
    let name = path.basename(src);
    
    let pObj = {
        id: src,
        parent: "#",
        text: name
    }
    let chArr = createChildNode(src);

    chArr.unshift(pObj);
    console.log(chArr);
    $("#tree").jstree({
        "core": {
            "data": chArr
        },
    })
})
function createChildNode(src) {
    let children = fs.readdirSync(src);
    let chArr = [];
    for (let i = 0; i < children.length; i++) {
        let cPath = path.join(src, children[i]);
        let chObj = {
            id: cPath,
            parent: src,
            text: children[i]
        }
        chArr.push(chObj);
    }
    return chArr
}
    // Event bubbling
    // $("#tree").on("click", function () {
    //     let children = fs.readdirSync(src);
    //     // console.log(childrens)
    //     for (let i = 0; i < children.length; i++) {
    //         $(this).append(`<li>${children[i]}</li>`);
    //     }
    //     $("li").on("click", "li", function (e) {
    //         e.stopImmediatePropagation();
    //         let fPath = path.join(src, $(this).html());
    //         let children = fs.readdirSync(fPath);
    //         // console.log(childrens)
    //         for (let i = 0; i < children.length; i++) {
    //             $(this).append(`<li>${children[i]}</li>`);
    //         }
    //     })
    // })
