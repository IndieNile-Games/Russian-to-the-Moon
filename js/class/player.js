class Player extends Entity {

    static shipSpriteHandler(...data) {
        let lean_value = 2.5;
        if (data[0].vx > lean_value) {
            return "lean_right";
        } else if (data[0].vx < -lean_value) {
            return "lean_left";
        } else {
            return "normal";
        }
    }

    static bulletMovement(self, world) {
        return new Point(0, -24);
    }

    constructor() {
        super();
        this.x = 450; // Player X
        this.y = 800; // Player Y
        this.w = 100; // Player Width
        this.h = 100; // Player Height
        
        this.lx = this.x; // Last Player X
        this.ly = this.y; // Last Player Y

        this.s = 1; // Player Speed

        this.vx = 0; // Player Velocity X
        this.vy = 0; // Player Veloicty Y

        this.fireTime = 0;

        this.c_box = new FloatingRect(this.w, this.h); // Player Collision Box

        this.sprite = new SpriteManager(new Sprite(
            "assets/sprites/player/final.png", 
            128, 
            128, 
            0, 
            3, 
            this.w, 
            this.h, 
            5,
            false,
            false,
            false
        ), Player.shipSpriteHandler);

        this.sprite.addFrame("lean_left", 2);
        this.sprite.addFrame("normal", 1);
        this.sprite.addFrame("lean_right", 0);
    }

    handleInput(inputManager, world, bulletList) {
        if (inputManager.if("player:left")) {
            this.vx -= this.s;
        };
        if (inputManager.if("player:right")) {
            this.vx += this.s;
        };
        if (inputManager.if("player:up")) {
            this.vy -= this.s;
        };
        if (inputManager.if("player:down")) {
            this.vy += this.s;
        }
        if (inputManager.if("player:fire") && this.fireTime <= 0) {
            this.spawnBullet(bulletList);
            this.fireTime = 3;
        };
    }

    update(world, screenRect, bulletList, inputManager) {
        this.lifeTime++;
        this.fireTime--;
        this.handleInput(inputManager, world, bulletList);

        if (!this.c_box.toRect(this.x, this.y).insideOf(screenRect)) {
            if (this.y < screenRect.y) {
                this.y = 0;
                this.vy = -world.SPEED;
            }
        };

        this.x += this.vx;
        this.y += this.vy;

        this.y += world.SPEED;

        this.vx *= (1 - world.FRICTION);
        this.vy *= (1 - world.FRICTION);

        if (!this.c_box.toRect(this.x, this.y).insideOf(screenRect)) {
            if (this.x < screenRect.x) {
                this.x = 0;
                this.vx = 0;
            }
            if (this.x + this.c_box.w > screenRect.x + screenRect.w) {
                this.x = (screenRect.x + screenRect.w) - this.w;
                this.vx = 0;
            }
        };

        this.sprite.update(this);
    }

    getCenter() {
        return new Point(this.x + (this.w/2), this.y + (this.h/2));
    }

    spawnBullet(bulletList) {
        let sm1 = new SpriteManager(new Sprite(
            "assets/sprites/bullet/player.png",
            32,
            32,
            0,
            1,
            25,
            25,
            1,
            false,
            true,
            false
        ), function (bulletData) {
            return "f_0";
        });
        let sm2 = new SpriteManager(new Sprite(
            "assets/sprites/bullet/player.png",
            32,
            32,
            0,
            1,
            25,
            25,
            1,
            false,
            true,
            false
        ), function (bulletData) {
            return "f_0";
        });
        sm1.addFrame("f_0", 0);
        sm2.addFrame("f_0", 0);
        let bullet1 = new Bullet(
            this.x, 
            this.getCenter().y - 35, 
            25, 
            25,
            sm1,
            Player.bulletMovement
        );
        let bullet2 = new Bullet(
            this.x + this.w - 25, 
            this.getCenter().y - 35, 
            25, 
            25,
            sm2,
            Player.bulletMovement
        );
        bulletList.add(bullet1);
        bulletList.add(bullet2);
        return [bullet1, bullet2];
    }

    toBox() {
        return new Rect(this.x, this.y, this.w, this.h);
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.getCenter());
    }
}