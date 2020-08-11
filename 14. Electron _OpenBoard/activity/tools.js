ctx.lineWidth = 5;
ctx.lineCap="round";
ctx.lineJoin='round';
let activeTool = 'pencil';
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
function handleTool(tool) {
    if (tool == "pencil") {
        if (activeTool == "pencil") {
            pencilOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "black";
            activeTool = "pencil";
            eraserOptions.classList.remove("show");
        }
    } else if (tool == "eraser") {
        if (activeTool == "eraser") {
            eraserOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "white";
            activeTool = "eraser";
            pencilOptions.classList.remove("show");
        }

    }
}
function changeColor(color) {
    ctx.strokeStyle = color;
}

let sliders = document.querySelectorAll("input[type='range']");
for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("change", function () {
        let width = sliders[i].value;
        ctx.lineWidth = width;
    })
}