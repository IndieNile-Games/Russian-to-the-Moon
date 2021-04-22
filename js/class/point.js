class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toRect(w, h) {
        return new Rect(this.x, this.y, w, h);
    }

    toRectFromCenter(w, h) {
        return new Rect(this.x - (w/2), this.y - (h/2), w, h);
    }
}