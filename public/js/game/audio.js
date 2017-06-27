const loadAudioTo = (audio) => {
    return new Promise(resolve => {
        audio.bullet = new Audio("/audio/pang.wav");
        audio.launch = new Audio("/audio/launch.wav");
        audio.explosion = new Audio("/audio/explosion.wav");
        audio.crate = new Audio("/audio/crate.wav");
        audio.hit = new Audio("/audio/hit.wav");
        resolve();
    });
}