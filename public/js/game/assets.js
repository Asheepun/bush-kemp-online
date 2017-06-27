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
    return new Promise(resolve => {
        sprites.player = new Image(26, 26);
        sprites.player.src="/sprites/player.png";
        resolve();
    });
}