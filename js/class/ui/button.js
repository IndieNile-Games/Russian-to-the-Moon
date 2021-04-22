class UIButton {

    constructor(src, x, y, w, h, sw, sh, sx) {
        this.img = new Image();
        this.img.src = src;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.sw = sw;
        this.sh = sh;
        this.sx = sx;

        this.state = "up";

        this.locked = false;
    }

    onclick() {

    };

    toRect() {
        return new Rect(this.x, this.y, this.w, this.h);
    }

    checkMouse() {
        let mousePos = Mouse.toRect();
        let thisRect = this.toRect();
        mousePos.x -= canvas.getBoundingClientRect().x;
        mousePos.y -= canvas.getBoundingClientRect().y;
        thisRect.w *= canvas.getBoundingClientRect().width/GAME_WIDTH;
        thisRect.h *= canvas.getBoundingClientRect().height/GAME_HEIGHT;
        console.log(mousePos, thisRect);
        return mousePos.collidingWith(thisRect);
    }

    update(canvas) {
        let mousePos = Mouse.toRect();
        let thisRect = this.toRect();
        mousePos.x -= canvas.getBoundingClientRect().x;
        mousePos.y -= canvas.getBoundingClientRect().y;
        thisRect.w *= canvas.getBoundingClientRect().width/GAME_WIDTH;
        thisRect.h *= canvas.getBoundingClientRect().height/GAME_HEIGHT;
        if (mousePos.collidingWith(thisRect) && Mouse.ACTIVE && !this.locked) {
            this.state = "down";
            this.onclick();
            return;
        };
        if (mousePos.collidingWith(thisRect) && !this.locked) {
            this.state = "hover";
            return;
        };
        this.state = "up";
    }

    draw(ctx) {
        if (this.state == "up") {
            ctx.drawImage(this.img, 0, 0, this.sw, this.sh, this.x, this.y, this.w, this.h);
        } else {
            ctx.drawImage(this.img, this.sx, 0, this.sw, this.sh, this.x, this.y, this.w, this.h);
        }
    }
}