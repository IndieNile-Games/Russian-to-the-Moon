class Player extends Entity {

    static shipSpriteHandler(...data) {
        let lean_value = 2.5;
        if (data[0].vx > lean_value) {
            return (data[0].hasShield) ? "s_lean_right" : "lean_right";
        } else if (data[0].vx < -lean_value) {
            return (data[0].hasShield) ? "s_lean_left" : "lean_left";
        } else {
            return (data[0].hasShield) ? "s_normal" : "normal";
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

        this.s = 1; // Player Speed

        this.vx = 0; // Player Velocity X
        this.vy = 0; // Player Veloicty Y

        this.bulletOwner = "player";

        this.fireTime = 0;
        this.fireSpeed = 3;
        this.hasShield = false;

        this.lastPos = [];
        this.lastPosMaxLength = 5;

        this.c_box = new FloatingRect(this.w, this.h); // Player Collision Box

        this.rawSprite = new Sprite(
            "assets/sprites/player/final.png", 
            128, 
            128, 
            0, 
            6, 
            this.w, 
            this.h, 
            5,
            false,
            false,
            false
        );

        this.sprite = new SpriteManager(this.rawSprite, Player.shipSpriteHandler);

        this.sprite.addFrame("lean_left", 0);
        this.sprite.addFrame("normal", 1);
        this.sprite.addFrame("lean_right", 2);
        this.sprite.addFrame("s_lean_left", 3);
        this.sprite.addFrame("s_normal", 4);
        this.sprite.addFrame("s_lean_right", 5);
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
            this.fireTime = this.fireSpeed;
        };
    }

    update(world, bulletList, inputManager) {
        this.lifeTime++;
        this.fireTime--;
        this.handleInput(inputManager, world, bulletList);

        this.lastPos.push(new Rect(this.x, this.y, this.w, this.h));
        if (this.lastPos.length > this.lastPosMaxLength) {
            this.lastPos.shift();
        }

        this.x += this.vx;
        this.y += this.vy;

        this.y += world.SPEED;

        this.vx *= (1 - world.FRICTION);
        this.vy *= (1 - world.FRICTION);

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
            Player.bulletMovement,
            this.bulletOwner
            
        );
        let bullet2 = new Bullet(
            this.x + this.w - 25, 
            this.getCenter().y - 35, 
            25, 
            25,
            sm2,
            Player.bulletMovement,
            this.bulletOwner
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