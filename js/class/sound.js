class Sound extends Audio {
    constructor(src, volume = 1, time = 0, loop = false) {
        super(src);
        this.controls = false;
        this.pause();
        this.currentTime = 0;

        this.volume = volume;
        this.currentTime = time;
        this.loop = loop;
    }

    setVol(volume) {
        this.volume = volume;
        return this.volume;
    }

    getVol() {
        return this.volume;
    }

    setTime(time) {
        this.currentTime = time;
        return this.currentTime;
    }

    getTime() {
        return this.currentTime;
    }

    setLoop(loop) {
        this.loop = loop;
        return this.loop;
    }

    getLoop() {
        return this.loop;
    }

    stop() {
        this.pause();
        this.currentTime = 0;
    }

    restart() {
        this.pause();
        this.currentTime = 0;
        this.play();
    }
}

class SoundManager extends Map {
    static DEFAULT_DATA = {
        src: "",
        volume: 1,
        time: 0,
        loop: false
    };

    static basicSound(src) {
        return {...SoundManager.DEFAULT_DATA, ...{src: src}};
    }

    constructor() {
        super();
    }

    createSound(id) {
        let finData = {...SoundManager.DEFAULT_DATA, ...this.get(id)};
        return new Sound(finData.src, finData.volume, finData.time, finData.loop);
    }

    play(id) {
        let sound = this.createSound(id);
        sound.play();
        return sound;
    }

    pause(id) {
        let sound = this.createSound(id);
        sound.pause();
        return sound;
    }

    stop(id) {
        let sound = this.createSound(id);
        sound.stop();
        return sound;
    }

    restart(id) {
        let sound = this.createSound(id);
        sound.restart();
        return sound;
    }

    getInfo(id) {
        const data = {...SoundManager.DEFAULT_DATA, ...this.get(id)};
        return {
            src: data.src,
            volume: data.volume,
            time: data.time,
            loop: data.loop
        }
    }

    setInfo(id, data = {}) {
        let finalData = {...this.getInfo(id), ...data};
        this.set(id, {
            src: finalData.src,
            volume: finalData.volume,
            time: finalData.time,
            loop: finalData.loop
        });
        return this.getInfo(id);
    }
}