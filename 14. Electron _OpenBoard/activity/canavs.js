// press mouse
let isPenDown = false;
board.addEventListener("mousedown", function (e) {
    // begin path
    ctx.beginPath();
    // move to mouse pointers location
    let x = e.clientX;
    let y = e.clientY;
    let top = getLocation();
    y = Number(y) - top
    ctx.moveTo(x, y);
    console.log("Mouse down")
    isPenDown = true;
    // mouse down
})
// on move
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        console.log("Mouse move")
        // lineTo
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();
        y = Number(y) - top;
        ctx.lineTo(x, y);
        // stroke
        ctx.stroke();
        // mouse move
    }
})
window.addEventListener("mouseup", function () {
    // close Path
    console.log("Mouse up")
    // ctx.closePath();
    isPenDown = false;
})
function getLocation() {
    let { top } = board.getBoundingClientRect();
    return top;
}
function undoLast() {
    //  pop the last point
    //  clear canvas=> 
    ctx.clearRect(0, 0, board.width, board.height);
    // redraw
}

