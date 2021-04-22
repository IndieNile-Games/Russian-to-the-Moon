class UIButton {

    static font = "Arial";
    static size = 50;

    static texture = new Image();

    static loaded = false;

    static textureBox = new FloatingRect(128, 56);

    static mappingUp = {
        nw: new Rect(0, 0, 16, 20), // North West
        n: new Rect(16, 0, 96, 20), // North
        ne: new Rect(112, 0, 16, 20), // North East
        w: new Rect(0, 20, 16, 8), // West
        c: new Rect(16, 20, 96, 8), // Center
        e: new Rect(112, 20, 16, 8), // East
        sw: new Rect(0, 28, 16, 24), // South West
        s: new Rect(16, 28, 96, 24), // South
        se: new Rect(112, 28, 16, 24) // South East
    }

    static mappingDown = {
        nw: new Rect(0, 0+56, 16, 20), // North West
        n: new Rect(16, 0+56, 96, 20), // North
        ne: new Rect(112, 0+56, 16, 20), // North East
        w: new Rect(0, 20+56, 16, 8), // West
        c: new Rect(16, 20+56, 96, 8), // Center
        e: new Rect(112, 20+56, 16, 8), // East
        sw: new Rect(0, 28+56, 16, 24), // South West
        s: new Rect(16, 28+56, 96, 24), // South
        se: new Rect(112, 28+56, 16, 24) // South East
    }

    static generateTextures(text) {
        // Unpressed
        let buttonCanvas = document.createElement("canvas");
        let btnctx = buttonCanvas.getContext("2d");

        btnctx.font = `${UIButton.size}px ${UIButton.font}`;

        let textDim = new FloatingRect(btnctx.measureText(text).width, UIButton.size);

        buttonCanvas.width = textDim.w + 32;
        buttonCanvas.height = textDim.h + 40;

        function drawBtnPart(mapping, xp = "center", yp = "center") {
            btnctx.drawImage(
                UIButton.texture,
                mapping.x,
                mapping.y,
                mapping.w,
                mapping.h,
                (xp === "left") ? 0 : ((xp === "right") ? textDim.w+16 : 16),
                (yp === "up") ? 0 : ((yp === "down") ? textDim.h+20 : 20),
                (xp === "center") ? textDim.w : 16,
                (yp === "up") ? 20 : ((yp === "down") ? 24 : textDim.h)
            )
        }

        function drawText(textToDraw, color) {
            btnctx.textBaseline = "middle";
            btnctx.textAlign = "center";
            btnctx.fillStyle = color;
            btnctx.fillText(textToDraw, buttonCanvas.width/2, buttonCanvas.height/2)
        }

        drawBtnPart(UIButton.mappingUp.nw, "left", "up");
        drawBtnPart(UIButton.mappingUp.n, "center", "up");
        drawBtnPart(UIButton.mappingUp.ne, "right", "up");
        drawBtnPart(UIButton.mappingUp.w, "left", "center");
        drawBtnPart(UIButton.mappingUp.c, "center", "center");
        drawBtnPart(UIButton.mappingUp.e, "right", "center");
        drawBtnPart(UIButton.mappingUp.sw, "left", "down");
        drawBtnPart(UIButton.mappingUp.s, "center", "down");
        drawBtnPart(UIButton.mappingUp.se, "right", "down");
        drawText(text, "#000000");

        let btnUpImg = new Image();
        btnUpImg.src = buttonCanvas.toDataURL();

        btnctx.clearRect(0, 0, buttonCanvas.width, buttonCanvas.height);

        drawBtnPart(UIButton.mappingDown.nw, "left", "up");
        drawBtnPart(UIButton.mappingDown.n, "center", "up");
        drawBtnPart(UIButton.mappingDown.ne, "right", "up");
        drawBtnPart(UIButton.mappingDown.w, "left", "center");
        drawBtnPart(UIButton.mappingDown.c, "center", "center");
        drawBtnPart(UIButton.mappingDown.e, "right", "center");
        drawBtnPart(UIButton.mappingDown.sw, "left", "down");
        drawBtnPart(UIButton.mappingDown.s, "center", "down");
        drawBtnPart(UIButton.mappingDown.se, "right", "down");
        drawText(text, "#ffffff");

        let btnDownImg = new Image();
        btnDownImg.src = buttonCanvas.toDataURL();        

        return {
            w: buttonCanvas.width,
            h: buttonCanvas.height,
            img: {
                up: btnUpImg,
                down: btnDownImg
            }
        }
    }

    constructor(text) {
        this.text = text;
        this.gen = UIButton.generateTextures(this.text);
    }

    
}

UIButton.texture.src = "assets/sprites/ui/button.png";
UIButton.texture.onload = _ => {
    UIButton.loaded = true;
};