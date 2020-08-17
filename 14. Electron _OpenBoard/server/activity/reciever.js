socket.on("rColorChange", function (color) {
    ctx.strokeStyle = color;
})
socket.on("onmd", function (point) {
    let { x, y, color, width } = point;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
})
socket.on("onmm", function (point) {
    let { x, y, color, width } = point;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineTo(x, y);
    ctx.stroke();
})