const loadAudioTo = (audio, volume) => {
    return new Promise(resolve => {
        audio.bullet = new Audio("/audio/bullet.wav");
        audio.launch = new Audio("/audio/launch.wav");
        audio.explosion = new Audio("/audio/explosion.wav");
        audio.crate = new Audio("/audio/crate.wav");
        audio.hit = new Audio("/audio/hit.wav");
        for(let key in audio){
            audio[key].volume = volume;
        }
        resolve();
    });
}

const changeVolume = (dir) => {
    for(let key in audio){
        if(dir === "up" && audio[key].volume < 1)
            audio[key].volume += 0.1;
        if(dir === "down" && audio[key].volume > 0)
            audio[key].volume -= 0.1;
    }
}

const loadSpritesTo = (sprites) => {
    const addSprite = (src) => {
        let s = new Image();
        s.src = src;
        sprites.push(s);
    } 

    return new Promise(resolve => {
        addSprite("/sprites/player.png");//0
        addSprite("sprites/obstacle.png");//1
        addSprite("sprites/rubble.png");//2
        addSprite("sprites/bush.png");//3
        addSprite("sprites/tnt.png");//4
        addSprite("sprites/crate.png");//5
        addSprite("sprites/bullet.png");//6
        addSprite("sprites/blood.png");//7
        addSprite("sprites/explosion.png");//8
        addSprite("sprites/flash.png");//9
        addSprite("sprites/background.png");//10
        resolve();
    });
}