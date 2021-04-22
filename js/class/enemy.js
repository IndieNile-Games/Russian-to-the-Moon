class EnemyShip extends Entity {

    static sprite = new Sprite(
        "assets/sprites/enemy/main.png", 
        108, 
        104, 
        0, 
        6, 
        this.w, 
        this.h, 
        5,
        false,
        false,
        false
    );

    static spriteHandler = function (...data) {
        let lean_value = 2.5;
        if (data[0].vx > lean_value) {
            return "lean_right"
        } else if (data[0].vx < -lean_value) {
            return "lean_left"
        } else {
            return "normal"
        }
    }

    constructor(ai_func = (...data) => new Point(0,0)) {
        super();

        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 100;

        this.vx = 0;
        this.vy = 0;

        this.speed = 1;
        this.bulletSpeed = 24;

        this.bulletOwner = "enemy";

        this.hp = 100;

        this.bulletTimer = 9;
        this.nextBulletShotTimer = 9;

        this.canShoot = true;

        this.ai_func = ai_func;

        this.spriteRaw = EnemyShip.sprite;

        this.sprite = new SpriteManager(this.spriteRaw, EnemyShip.spriteHandler);

        this.sprite.addFrame("lean_left", 1);
        this.sprite.addFrame("normal", 0);
        this.sprite.addFrame("lean_right", 3);
    }

    degreeOfShip(ship) {
        let deg = (radians) => radians * (180/Math.PI);
        let distX = ship.getCenter().x - this.getCenter().x;
        let distY = ship.getCenter().y - this.getCenter().y;
        if (this.getCenter().x >= ship.getCenter().x) {
            return deg(Math.atan(distY/distX))-90;
        } else {
            return deg(Math.atan(distY/distX))+90;
        };
    }

    shootBullet(deg, bulletList) {
        deg = deg - 90;
        if (this.canShoot && this.bulletTimer <= 0) {
            this.bulletTimer = this.nextBulletShotTimer;
            let bspeed = this.bulletSpeed;
            let rads = (degree) => degree * (Math.PI/180);
            let vx = Math.cos(rads(deg));
            let vy = Math.sin(rads(deg));
            let sm1 = new SpriteManager(new Sprite(
                "assets/sprites/bullet/enemy.png",
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
            let bullet1 = new Bullet(
                this.getCenter().x-12.5, 
                this.getCenter().y-12.5, 
                25, 
                25,
                sm1,
                function (self, world) {
                    return new Point(bspeed * vx, bspeed * vy);
                },
                this.bulletOwner
            );
            bulletList.add(bullet1);
            return bullet1;
        };
    }

    getCenter() {
        return new Point(this.x + (this.w/2), this.y + (this.h/2));
    }

    update(world, screenRect, bulletList, playerShip) {
        this.lifeTime++;
        this.bulletTimer--;

        let vel = this.ai_func(this, world, screenRect, bulletList, playerShip);
        
        this.vx += vel.x;
        this.vy += vel.y;
        
        this.x += this.vx;
        this.y += this.vy;

        this.y += world.SPEED;

        this.vx *= (1 - world.FRICTION);
        this.vy *= (1 - world.FRICTION);

        this.sprite.update(this);
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.getCenter());
    }

    toRect() {
        return new Rect(this.x, this.y, this.w, this.h);
    }

}

class EnemyList extends Array {

    constructor() {
        super();
    }

    update(world, screenRect, bulletList, playerShip) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] == null) continue;
            this[i].update(world, screenRect, bulletList, playerShip);
            if (!this[i].toRect().collidingWith(screenRect)) {
                delete this[i]
            }
            for (let j = 0; j < bulletList.length; j++) {
                if (bulletList[j] == null) continue;
                if (this[i].toRect().collidingWith(bulletList[j].toRect()) && this[i].bulletOwner !== bulletList[j].owner) {
                    delete this[i]
                }
            };
        };
    }

    draw(ctx) {
        this.forEach(enemy => {
            enemy.draw(ctx)
        })
    }
}