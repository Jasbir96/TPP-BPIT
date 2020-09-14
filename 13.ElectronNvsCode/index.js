const $ = jQuery = require("jquery");
require("jquery-ui-dist/jquery-ui");
const path = require("path");
const fs = require("fs");
let myEditor, myMonaco;
$(document).ready(async function () {
    myEditor = await createEditor();
    //    set editor content
    // ***************************File explorer logic*****************************
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
            "data": chArr,
            "themes": {
                "icons": false
            }

        },
        // when a directory is opened
    }).on("open_node.jstree", function (e, data) {
        // console.log(data);
        let children = data.node.children;
        // console.log(children)
        for (let i = 0; i < children.length; i++) {
            let gcNodes = createChildNode(children[i]);
            // console.log(gcNodes);
            for (let j = 0; j < gcNodes.length; j++) {
                // data array 
                // console.log("inside gc")
                $("#tree").jstree().create_node(children[i], gcNodes[j], "last");
            }
        }
    }).on("select_node.jstree", function (e, data) {
        console.log("select event occured");
        let src = data.node.id;
        let isFile = fs.lstatSync(src).isFile();

        if (!isFile) {
            return;
        }
        setData(src);
        // set name on tab
        createTab(src);
    });
    const os = require('os');
    const pty = require('node-pty');
    // UI 
    const Terminal = require('xterm').Terminal;
    // Initialize node-pty with an appropriate shell
    const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
    // Magic
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env,

    });
    // console.log(process.env);
    // Initialize xterm.js and attach it to the DOM
    let { FitAddon } = require('xterm-addon-fit');
    const xterm = new Terminal();
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    xterm.setOption('theme', { background: 'rebeccapurple' });
    // Make the terminal's size and geometry fit the size of #terminal-container
    // document
    xterm.open(document.getElementById('terminal'));
    // Setup communication between xterm.js and node-pty
    xterm.onData(function (data) {
        // console.log("Command "+data);
        ptyProcess.write(data)
    });

    // Magic
    ptyProcess.on('data', function (data) {
        xterm.write(data);
    });

    fitAddon.fit();
    myMonaco.editor.defineTheme('dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '#1e2024' }],
        "colors": {
            "editor.foreground": "#F8F8F8",
            "editor.background": "#1e2024",
            "editor.selectionBackground": "#DDF0FF33",
            "editor.lineHighlightBackground": "#FFFFFF08",
            "editorCursor.foreground": "#A7A7A7",
            "editorWhitespace.foreground": "#FFFFFF40"
        }
    });
    myMonaco.editor.defineTheme('light', {
        "base": "vs",
        "inherit": true,
        rules: [{ background: '#1e2024' }],
        "colors": {
            "editor.foreground": "#3B3B3B",
            "editor.background": "#FFFFFF",
            "editor.selectionBackground": "#BAD6FD",
            "editor.lineHighlightBackground": "#00000012",
            "editorCursor.foreground": "#000000",
            "editorWhitespace.foreground": "#BFBFBF"
        }
    });
    let isDark = false;
    $("#toggle").on("click", function () {
        // if (isDark) {
        //     myMonaco.editor.setTheme('light');
        // } else {
        //     myMonaco.editor.setTheme('dark');
        // }
        // isDark = !isDark;
        $(".overlay").css("display", "block");
    })
    $(".file-explorer").resizable();
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
// npm install monaco-editor
function createEditor() {
    const path = require('path');
    const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;
    amdRequire.config({
        baseUrl: './node_modules/monaco-editor/min'
    });
    // workaround monaco-css not understanding the environment
    self.module = undefined;
    return new Promise(function (resolve, reject) {
        amdRequire(['vs/editor/editor.main'], function () {

            var editor = monaco.editor.create(document.getElementById('code-editor'), {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript',
                theme: "vs-dark"
            });
            console.log("line number 100")
            myMonaco = monaco;
            resolve(editor);
        });
    })

}
// dynamically 
// callback 
function createTab(src) {
    let fName = path.basename(src);
    $(".tab-container").append(`
    <div class="tab" ><span onclick=handleClick(this) id=${src}>${fName}</span>
    <i class="fas fa-times" onclick=handleClose(this) id=${src}></i>
    </div>`);
}

function handleClick(elem) {
    // console.log("clicked");
    let src = $(elem).attr("id");
    setData(src);
}
function handleClose(elem) {
    console.log("closed");
    // remove current tab 
    $(elem).parent().remove();
    //set content of first tab
    // LRU cache 
    let src = $($(".tab-container span")[0]).attr("id");
    if (src) {
        setData(src);
    }

}
function setData(src) {
    let content = fs.readFileSync(src) + "";
    //    show in editor
    // console.log(content);
    myEditor.getModel().setValue(content);
    // how to set language in monaco editor
    let ext = src.split(".").pop();

    if (ext == "js") {
        ext = "javascript"
    }
    myMonaco.editor.setModelLanguage(myEditor.getModel(), ext);
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
