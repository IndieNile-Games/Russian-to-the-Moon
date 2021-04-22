const   GAME_WIDTH      = 1024,
        GAME_HEIGHT     = 1024;

const WORLD = {
        FRICTION: 0.1,
        SPEED: 3
};


// Enemy Ship AI

function shipAI_flyFromMidLeft(...data) {
    if (data[0].lifeTime <= 1) {
        data[0].x = -data[0].w;
        data[0].y = data[2].y + (data[2].h/2) - (data[0].h/2);
    }
    data[0].shootBullet(data[0].degreeOfShip(data[4]), data[3]);
    return new Point(data[0].speed, 0);
};