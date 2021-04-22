const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.ctx = ctx;
canvas.toRect = function () {
    return new Rect(0, 0, canvas.width, canvas.height);
}
canvas.clear = function (color = null) {
    if (color) {
        canvas.fill(color);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
};
ctx.clear = canvas.clear;
canvas.fill = function (color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
};
ctx.fill = canvas.fill;
canvas.resize = function () {
    var canvasRatio = GAME_HEIGHT / GAME_WIDTH;
    var windowRatio = window.innerHeight / window.innerWidth;
    var width;
    var height;

    if (windowRatio < canvasRatio) {
        height = window.innerHeight;
        width = height / canvasRatio;
    } else {
        width = window.innerWidth;
        height = width * canvasRatio;
    }

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
};
canvas.resize();
window.addEventListener("resize", canvas.resize);
document.body.appendChild(canvas);