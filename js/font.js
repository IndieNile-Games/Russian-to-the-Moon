const fontImgBlack = new Image();
fontImgBlack.src = "assets/font/fontmap.png";

const fontImgWhite = new Image();
fontImgWhite.src = "assets/font/fontmap_white.png";

const dimentionRatio = 4/5;

const dimentions = {
    A: new Rect(0, 0, 20, 24),
    B: new Rect(20, 0, 20, 24),
    C: new Rect(40, 0, 20, 24),
    D: new Rect(60, 0, 20, 24),
    E: new Rect(80, 0, 20, 24),
    F: new Rect(100, 0, 20, 24),
    G: new Rect(120, 0, 20, 24),
    H: new Rect(0, 24, 20, 24),
    I: new Rect(20, 24, 20, 24),
    J: new Rect(40, 24, 20, 24),
    K: new Rect(60, 24, 20, 24),
    L: new Rect(80, 24, 20, 24),
    M: new Rect(100, 24, 20, 24),
    N: new Rect(120, 24, 20, 24),
    O: new Rect(0, 48, 20, 24),
    P: new Rect(20, 48, 20, 24),
    Q: new Rect(40, 48, 20, 24),
    R: new Rect(60, 48, 20, 24),
    S: new Rect(80, 48, 20, 24),
    T: new Rect(100, 48, 20, 24),
    U: new Rect(120, 48, 20, 24),
    V: new Rect(0, 72, 20, 24),
    W: new Rect(20, 72, 20, 24),
    X: new Rect(40, 72, 20, 24),
    Y: new Rect(60, 72, 20, 24),
    Z: new Rect(80, 72, 20, 24),

    "1": new Rect(0, 96, 20, 24),
    "2": new Rect(20, 96, 20, 24),
    "3": new Rect(40, 96, 20, 24),
    "4": new Rect(60, 96, 20, 24),
    "5": new Rect(80, 96, 20, 24),
    "6": new Rect(100, 96, 20, 24),
    "7": new Rect(120, 96, 20, 24),
    "8": new Rect(0, 120, 20, 24),
    "9": new Rect(20, 120, 20, 24),
    "0": new Rect(40, 120, 20, 24)
};

function drawText(text, x, y, size, ctx, color = "white") {
    let curX = x;
    let curY = y;
    let chars = text.split("");
    
    chars.forEach(char => {
        let charRect = dimentions[String(char).toUpperCase()]
        if (charRect == null) return;
        //console.info(charRect);
        ctx.drawImage((color === "black") ? fontImgBlack : fontImgWhite, charRect.x, charRect.y, charRect.w, charRect.h, curX, curY, size*dimentionRatio, size)
        curX += size*dimentionRatio;
    });
};