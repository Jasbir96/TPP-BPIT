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
        // so that create works
        "core": {
            "check_callback": true,
            "data": chArr
        },
    }).on("open_node.jstree", function (e, data) {
        let children = data.node.children;
        // console.log(children)
        for (let i = 0; i < children.length; i++) {
            let gcNodes = createChildNode(children[i]);
            // console.log(gcNodes);
            for (let j = 0; j < gcNodes.length; j++) {
                // data array 
                // console.log("inside gc")
                console.log(children[i])
                let isGcPresent = $('#tree').jstree(true).get_node(gcNodes[j].id);
                if (isGcPresent) {
                    return;
                }
                $("#tree").jstree().create_node(children[i], gcNodes[j],"first");
            }
        }
    })
})
function createChildNode(src) {
    let isDir = fs.lstatSync(src).isDirectory();
    //    console.log(src);
    if (isDir == false) {
        return [];
    }
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
