class Keyboard {
    static KEY_SHIFT = 16;
    static KEY_CTRL = 17;
    static KEY_ALT = 18;
    static KEY_SPACE = 32;
    static KEY_LEFT = 37;
    static KEY_UP = 38;
    static KEY_RIGHT = 39;
    static KEY_DOWN = 40;
    static KEY_A = 65;
    static KEY_B = 66;
    static KEY_C = 67;
    static KEY_D = 68;
    static KEY_E = 69;
    static KEY_F = 70;
    static KEY_G = 71;
    static KEY_H = 72;
    static KEY_I = 73;
    static KEY_J = 74;
    static KEY_K = 75;
    static KEY_L = 76;
    static KEY_M = 77;
    static KEY_N = 78;
    static KEY_O = 79;
    static KEY_P = 80;
    static KEY_Q = 81;
    static KEY_R = 82;
    static KEY_S = 83;
    static KEY_T = 84;
    static KEY_U = 85;
    static KEY_V = 86;
    static KEY_W = 87;
    static KEY_X = 88;
    static KEY_Y = 89;
    static KEY_Z = 90;

    static active = [];
}
document.addEventListener("keydown", function (e) {
    e.preventDefault();
    Keyboard.active[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
    e.preventDefault();
    Keyboard.active[e.keyCode] = false;
});

class Mouse {
    static ACTIVE = false;
    static X = null;
    static Y = null;

    static toRect() {
        return new Rect(Mouse.X, Mouse.Y, 1, 1);
    }
}
document.addEventListener("mousedown", function () {
    Mouse.ACTIVE = true;
});
document.addEventListener("mouseup", function () {
    Mouse.ACTIVE = false;
});
document.addEventListener("mousemove", function (e) {
    Mouse.X = e.pageX;
    Mouse.Y = e.pageY;
});

class Input {
    static keyDown = function (all = false, ...keys) {
        return function (self) {
            if (all) {
                for (let i = 0; i < keys.length; i++) {
                    if (Keyboard.active[keys[i]] == false) return 0;
                };
                return 1;
            } else {
                for (let i = 0; i < keys.length; i++) {
                    if (Keyboard.active[keys[i]] == true) return 1;
                };
                return 0;
            };
        };
    }
    static mouseDown = function () {
        return function (self) {
            return (Mouse.ACTIVE) ? 1 : 0;
        }
    }

    constructor(stateHandler = (self) => 0) {
        this.active = false;
        this.analog = 0;
        this.stateHandler = stateHandler;
    }

    update() {
        this.analog = this.stateHandler(this);
        this.active = (this.analog > 0) ? true : false;
    }
}

class InputManager extends Map {
    constructor(disabled = false) {
        super();
        this.disabled = disabled;
    }

    if(id) {
        this.get(id).update();
        return (this.disabled) ? false : this.get(id).active;
    }

    analog(id) {
        this.get(id).update();
        return (this.disabled) ? false : this.get(id).analog;
    }

    info(id) {
        this.get(id).update();
        return {
            active: this.get(id).active,
            analog: this.get(id).analog
        };
    }
}