class Bullet extends Entity {

    constructor(x, y, w, h, sm, movement = (point, world) => new Point(0, 0)) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sm = sm;

        this.mx = 1;

        this.movement = movement;
    }

    getCenter() {
        return new Point(this.x + (this.w/2), this.y + (this.h/2));
    }

    toRect() {
        return new Rect(this.x, this.y, this.w, this.h);
    }

    update(world) {
        this.lifeTime++;

        let velc = this.movement(this, world);

        this.x += velc.x;
        this.y += velc.y;

        this.sm.update(this);
    }

    draw(ctx) {
        this.sm.draw(ctx, this.getCenter());
    }
}

class BulletList extends Array {

    constructor() {
        super();
    }

    add(bullet) {
        this.push(bullet);
    }

    update(world, worldRect) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] == null) continue;
            this[i].update(world);
            if (!worldRect.collidingWith(this[i].toRect())) {
                delete this[i];
            }
        }
    }

    draw(ctx) {
        this.forEach(bullet => {
            bullet.draw(ctx);
        });
    }
}