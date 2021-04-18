class Rect {
    static checkCollision(rect1, rect2) {
        return (rect1.x + rect1.w >= rect2.x && rect2.x + rect2.w >= rect1.x)
        || (rect1.y + rect1.h >= rect2.y && rect2.y + rect2.h >= rect1.y);
    }
    static getCenter(rect) {
        return {
            x: rect.x + (rect.w/2),
            y: rect.y + (rect.h/2)
        }
    }

    constructor(x, y, w, h, a = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
    }

    getCenter() {
        return Rect.getCenter(this);
    }

    collidingWith(rect) {
        return Rect.checkCollision(this, rect);
    }
}