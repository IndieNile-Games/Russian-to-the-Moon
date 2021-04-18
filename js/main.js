const soundManager = new SoundManager();
const inputManager = new InputManager();

soundManager.set("test:ping", {
    src: "assets/audio/sfx/ping.wav"
});
inputManager.set("test:playSound", new Input(function (self) {
    return (Keyboard.active[Keyboard.KEY_SPACE]) ? 1 : 0;
}));

const testSprite = new Sprite("assets/favicon/full-width.png", 500, 500, 0, 1, 256, 256, 5);

function update() {
    ctx.clear();
    testSprite.update(ctx, canvas.toRect().getCenter());
    if (inputManager.if("test:playSound")) {
        soundManager.play("test:ping");
    }
}

setInterval(update, 1000/30);