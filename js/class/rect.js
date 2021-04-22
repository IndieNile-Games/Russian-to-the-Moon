class FloatingRect {

    constructor(w, h, a = 0) {
        this.w = w;
        this.h = h;
        this.a = a;
    }

    toRect(x, y) {
        return new Rect(x, y, this.w, this.h, this.a);
    }

    toRectFromCenter(x, y) {
        return new Rect(x - (this.w/2), y - (this.h/2), this.w, this.h, this.a);
    };
}

class Rect {
    static checkCollision(rect1, rect2) {
        return (rect1.x + rect1.w >= rect2.x && rect2.x + rect2.w >= rect1.x)
        && (rect1.y + rect1.h >= rect2.y && rect2.y + rect2.h >= rect1.y);
    }
    static checkInside(inner, outer) {
        return (inner.x >= outer.x && inner.x + inner.w <= outer.x + outer.w)
        && (inner.y >= outer.y && inner.y + inner.h <= outer.y + outer.h);
    };
    static getCenter(rect) {
        return new Point(rect.x + (rect.w/2), rect.y + (rect.h/2))
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

    scaleTo(scale) {
        return new Rect(this.x, this.y, this.w*scale, this.h*scale, this.a);
    }

    insideOf(rect) {
        return Rect.checkInside(this, rect);
    }

    contains(rect) {
        return Rect.checkInside(rect, this);
    }
}