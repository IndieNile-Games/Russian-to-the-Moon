class Sprite {
    constructor(src, f_width, f_height, f_start, f_count, d_width, d_height, ipf = 1) {
        this.img = new Image(); // Image element
        this.img.src = src;

        this.f_start = f_start;
        this.f_count = f_start + f_count; // Frame count
        this.r_time = f_count * ipf; // Update calls until Reset
        this.ipf = ipf; // Update calls per frame

        this.i = 0; // Current calls to update 
        this.c_frame = f_start; // Current frame
        this.c_frame_cx = 0; // Current frame x
        this.c_frame_cy = 0; // Current frame y

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

    draw(wCtx, center, framePos) {
        wCtx.drawImage(
            this.img, 
            framePos.x * this.frame_w, 
            framePos.y * this.frame_h, 
            this.frame_w, 
            this.frame_h,
            center.x - (this.d_width/2),
            center.y - (this.d_height/2),
            this.d_width,
            this.d_height
        );
    }

    update(wCtx, center) {
        this.i++;
        if (this.i >= this.r_time) {
            this.i = 0;
        };

        if (this.i % this.ipf === this.ipf-1) this.c_frame++;

        if (this.c_frame >= this.f_count) this.c_frame = 0;

        this.draw(wCtx, center, this.getFrameCoords());
    }
}

class SpriteManager extends Map {
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }

    update(id, center) {
        this.get(id).update(this.ctx, center);
    }
}