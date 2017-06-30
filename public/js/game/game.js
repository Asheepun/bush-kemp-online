let c, ctx, scl, stage, FPS, width, height, offSet, WON, FS, current = 0, hit;

const audio = {};
const sprites = [];

const begin = (world) => {
    socket.on("update", data => {
        if(data.game.name === GAME.name){
            //player
            let p = players.find(p => p.id === "enemy");
            p.pos = data.player.pos;
            p.rotation = data.player.rotation;
            if(data.player.hit != undefined){
                let b = bullets[data.player.hit];
                for(let i = 0; i < 5; i++){
                    let spread = v(Math.random()*10 - 5, Math.random()*10 - 5);
                    new Pixel(7, add(b.pos, spread), add(reverse(b.speed), spread), 100);
                }
                bullets.splice(data.player.hit, 1);
            }
            //bullets
            data.bullets.forEach(b => {
                if(b.damage != undefined) new Bullet(b.pos, b.speed, b.damage, false, false, b.size);
                else new Grenade(b.pos, b.speed, false);
            });
            //crates
            if(data.crate) crates.splice(data.crate, 1);
            //victory
            if(data.won != undefined && !data.won){
                WON = true;
                stage = end;
                setTimeout(() => location.reload(), 3000);
            }
        }
    });
    map = world;
    gameArea.style.display = "block";
    stage = setup;
    FPS = 60;
    loadAudioTo(audio, 0.5)
    .then(() => {
        loadSpritesTo(sprites);
    }).then(loop);
    
    FS = false;
    document.addEventListener("keydown", e => {
        if(e.keyCode === 70){
            if(!FS){
                FS = true;
                c.webkitRequestFullscreen();
            }else{
                FS = false;
                document.webkitExitFullscreen();
            }
        }
    });
}

const setup = () => {
    spliceArrays([
        explosions,
        players,
        obstacles,
        bullets,
        rubble,
        bushes,
        crates,
        guns,
        texts,
    ]);
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    c.width = 800;
    c.height = 600;
    scl = 40;
    if(GAME.pos === 1) offSet = v(0, 0);
    else offSet = v(-width + c.width, -height + c.height);
    initializeKeyboard();
    initializePointer(c, offSet);
    initializeGuns();
    initializeMap();
    width = map[0].length*scl;
    height = map.length*scl; 
    stage = game;
}

const update = () => {
    updateArrays([
        bullets,
        obstacles,
        players,
        explosions,
        texts,
        pixels,
    ]);
    updateOffset();
}

const draw = () => {
    ctx.save();
    ctx.translate(offSet.x, offSet.y);
    drawBackground();
    drawArrays([
        rubble,
        obstacles,
        pixels,
        crates,
        bullets,
        players,
        bushes,
        explosions,
        texts,
    ]);
    drawHud();
    ctx.restore();
}

const emitUpdates = () => {
    let c = findIndex(crates, c => c.hit);
    let data = {
        player: players.find(p => p.id === ID),
        bullets: bullets.filter(b => b.num === current),
        crate: c,
        won: WON,
        game: GAME,
    }
    socket.emit("update", data);
    //updateAgain
    current += 1;
    data.player.hit = undefined;
    if(c) crates.splice(c, 1);
}

const game = () => {
    update();
    emitUpdates();
    draw();
}

const end = () => {
    offSet = v(0, 0);
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.font="50px solid"
    if(WON){
        ctx.fillStyle="green";
        ctx.fillText("Victory!", c.width/2-100, c.height/2);
    }else {
        ctx.fillStyle="red";
        ctx.fillText("Defeat", c.width/2-100, c.height/2);
    }
}

const loop = () => {
    stage();
    setTimeout(loop, 1000/FPS);
}

const updateOffset = () => {
    let player = players.find(p => p.id === ID);
    if(player != undefined){
        offSet.x = -player.pos.x + c.width/2;
        offSet.y = -player.pos.y + c.height/2;
        if(offSet.x > 0) offSet.x = 0;
        if(offSet.y > 0) offSet.y = 0;
        if(offSet.x < -width + c.width) offSet.x = -width + c.width;
        if(offSet.y < -height + c.height) offSet.y = -height + c.height;
    }
}

const drawBackground = () => {
    for(let i = 0; i < height/80; i++){
        for(let j = 0; j < width/80; j++){
            ctx.drawImage(sprites[10],
                80*j, 80*i, 80, 80);
        }
    }
}