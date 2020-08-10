// press mouse
let isPenDown = false;
board.addEventListener("mousedown", function (e) {
    // begin path
    ctx.beginPath();
    // move to mouse pointers location
    let x = e.clientX;
    let y = e.clientY;
    ctx.moveTo(x, y);
    console.log("MOuse down")
    isPenDown = true;
})
// on move
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        console.log("MOuse move")
        // lineTo
        let x = e.clientX;
        let y = e.clientY;
        ctx.lineTo(x, y);
        // stroke
        ctx.stroke();
    }
})
board.addEventListener("mouseup", function () {
    // close Path
    console.log("MOuse up")
    // ctx.closePath();
    isPenDown = false;
})