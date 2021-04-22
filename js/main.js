//const testSprite = new Sprite("assets/favicon/full-width.png", 500, 500, 0, 1, 256, 256, 5);

const player = new Player();

function render() {
    ctx.clear("#666666");
    //testSprite.draw(ctx, canvas.toRect().getCenter());
    bullets.draw(ctx);
    player.draw(ctx);
    //ctx.drawImage(testBtn.gen.img.up, 0, 0, testBtn.gen.w, testBtn.gen.h, 0, 0, testBtn.gen.w, testBtn.gen.h)
    requestAnimationFrame(render);
}

function update() {
    /*
    testSprite.update();
    if (inputManager.if("test:playSound")) {
        soundManager.play("test:ping");
    }
    */

    bullets.update(WORLD, canvas.toRect());
    player.update(WORLD, canvas.toRect(), bullets, inputManager);
}

function start() {
    render();
    return setInterval(update, 1000/30);
};

let gameInterval = start();