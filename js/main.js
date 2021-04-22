//const testSprite = new Sprite("assets/favicon/full-width.png", 500, 500, 0, 1, 256, 256, 5);

let lerp = (x, y, a) => x * (1 - a) + y * a;

let player;

let bgImg = new Image();
bgImg.src = "assets/sprites/bg.png";
let logoImg = new Image();
logoImg.src = "assets/sprites/logo.png";
let bgImgScrl = 0;
let bgm = new Audio("assets/audio/music/cs.wav");
bgm.loop = true;
bgm.controls = false;
bgm.play();
let playBtn = new UIButton("assets/sprites/ui/play.png", (canvas.width/2) - 50, (canvas.height/3)*2, 100, 111, 72, 80, 72);

function gameRender() {
    ctx.clear("#666666");
    //testSprite.draw(ctx, canvas.toRect().getCenter());
    ctx.drawImage(bgImg, 0, 0, 256, 256, 0, 0, canvas.width, canvas.height);
    bullets.draw(ctx);
    enemyList.draw(ctx);
    player.draw(ctx);
    drawText("WASD to move", 100, 100, 25, ctx);
    drawText("SPACE to move", 130, 100, 25, ctx);
    //ctx.drawImage(testBtn.gen.img.up, 0, 0, testBtn.gen.w, testBtn.gen.h, 0, 0, testBtn.gen.w, testBtn.gen.h)
}

function homeRender() {
    ctx.clear();
    ctx.drawImage(bgImg, 0, 256 - bgImgScrl, 256, 256, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(logoImg, 0, 0, 1440, 880, (canvas.width/2) - 350, -500 + bgImgScrl*5, 700, 400);
    playBtn.draw(ctx);
    drawText("Test Text", 100, 100, 25, ctx);
}

function homeUpdate() {
    bgImgScrl += 1;
    if (bgImgScrl > 128) {
        bgImgScrl = 128;
    };
    playBtn.update(canvas);
    homeRender();
}

playBtn.onclick = function () {
    clearInterval(startInterval);
    gameInterval = startGame();
}

function gameUpdate() {
    /*
    testSprite.update();
    if (inputManager.if("test:playSound")) {
        soundManager.play("test:ping");
    }
    */

    bullets.update(WORLD, canvas.toRect());
    enemyList.update(WORLD, canvas.toRect(), bullets, player);
    player.update(WORLD, bullets, inputManager);
    gameRender();
}

function startGame() {
    player = new Player();
    enemyList.push(new EnemyShip(shipAI_fromLeftoutRight))
    return setInterval(gameUpdate, 1000/30);
};

function startScreen() {
    return setInterval(homeUpdate, 1000/30);
};

let gameInterval;
let startInterval;

setTimeout(_ => {
    startInterval = startScreen()
}, 1000);