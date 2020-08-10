ctx.lineWidth=5;
function handleTool(tool) {
    if (tool == "pencil") {
        ctx.strokeStyle = "black";
    } else if (tool == "eraser") {
        ctx.strokeStyle = "white"
    }

}