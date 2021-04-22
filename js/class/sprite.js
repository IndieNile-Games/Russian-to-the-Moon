class Sprite {
    static Empty() {
        return new Sprite("", 0, 0, 0, 0, 0, 0, 0, false, false, true);
    }

    static usingExistingImage(img, f_width, f_height, f_start, f_count, d_width, d_height, ipf = 1, run = true, loop = true, blank = false) {
        let sprite = new Sprite(null, f_width, f_height, f_start, f_count, d_width, d_height, ipf, run, loop, blank);
        sprite.img = img;
        return sprite;
    }

    constructor(src, f_width, f_height, f_start, f_count, d_width, d_height, ipf = 1, run = true, loop = true, blank = false) {
        this.img = new Image(); // Image element
        this.img.src = src;

        this.run = run; // If the sprite should update at all
        this.loop = loop; // If the sprite should loop
        this.blank = blank; // Used for empty sprite checking

        this.f_start = f_start;
        this.f_count = f_start + f_count; // Frame count
        this.r_time = f_count * ipf; // Update calls until Reset
        this.ipf = ipf; // Update calls per frame

        this.i = 0; // Current calls to update 
        this.c_frame = f_start; // Current frame

        this.d_width = d_width; // Drawn Width
        this.d_height = d_height; // Drawn Height

        this.frame_w = f_width; // Frame width
        this.frame_h = f_height; // Frame height

        this.frame_img_rat_x = this.img.width/f_width; // How many frames are horizontal in the image
        this.frame_img_rat_y = this.img.height/f_height; // How many frames are vertical in the image
    }

    getFrameCoords() {
        return {
            x: this.c_frame % this.frame_img_rat_x,
            y: Math.floor(this.c_frame / this.frame_img_rat_x)
        }
    }

    setFrame(frame) {
        this.c_frame = frame;
    }

    draw(wCtx, center) {
        wCtx.drawImage(
            this.img, 
            this.getFrameCoords().x * this.frame_w, 
            this.getFrameCoords().y * this.frame_h, 
            this.frame_w, 
            this.frame_h,
            Math.floor(center.x - (this.d_width/2)),
            Math.floor(center.y - (this.d_height/2)),
            this.d_width,
            this.d_height
        );
    }

    update() {
        if (this.run) {
            this.i++;
            if (this.i >= this.r_time) {
                this.i = 0;
            };

            if (this.i % this.ipf === this.ipf-1) this.c_frame++;

            if (this.c_frame >= this.f_count) {
                if (this.loop) {
                    this.c_frame = 0;
                } else {
                    this.c_frame = this.f_count-1;
                }
            }
        }
    }
}

class SpriteManager {

    constructor(sprite, handler) {
        this.sprite = sprite;
        this.handler = handler;
        this.current_frame = null;
        this.frameReg = new Map();
    }

    addFrame(id, f) {
        this.frameReg.set(id, f);
    }

    getFrame(id) {
        return this.frameReg.get(id);
    }

    draw(ctx, center) {
        this.sprite.draw(ctx, center);   
    }

    update(...data) {
        this.sprite.setFrame(this.getFrame(this.handler(...data)));
    }
}

class MassSpriteManager extends Map {
    constructor(dataParser = (...data) => null) {
        super();
        this.current_sprite = null;
        this.parseData = dataParser;
    }

    getSprite(id) {
        let sprite = this.get(id);
        if (sprite == null) {
            return Sprite.Empty();
        } else {
            return sprite;
        };
    }

    setCurrentSprite(id) {
        if (id !== this.current_sprite) {
            this.current_sprite = id;
            let sprite = this.getSprite(this.current_sprite);
            if (sprite.blank) {
                return null;
            } else {
                sprite.i = 0;
                sprite.c_frame = 0;
                this.set(this.current_sprite, sprite);
                return sprite;
            };
        };
        return null;
    };

    update(...data) {
        this.parseData(...data);
        this.getSprite(this.current_sprite).update();
    }

    updateAll() {
        this.forEach(function (sprite) {
            sprite.update();
        });
    }

    draw(ctx, center) {
        this.getSprite(this.current_sprite).draw(ctx, center);
    }

    drawAll(ctx, center) {
        this.forEach(function (sprite) {
            sprite.draw(ctx, center);
        });
    }
}