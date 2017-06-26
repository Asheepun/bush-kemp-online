let c, ctx, scl, stage, FPS, width, height, offSet, WON;

const begin = (world) => {
    map = world;
    gameArea.style.display = "block";
    stage = setup;
    FPS = 60;
    loop();
    socket.on("update", data => {
        if(data.game.name === GAME.name){
            let player = players.find(p => p.id === "enemy");
            player.pos = data.player.pos;
        }
    });
    socket.on("bullet", data => {
        if(data.game.name === GAME.name)
            new Bullet(data.bullet.pos, data.bullet.speed, data.bullet.damage, false, false, data.bullet.scl);
    });
    socket.on("grenade", data => {
        if(data.game.name === GAME.name)
            new Grenade(data.grenade.pos, data.grenade.speed, false);
    });
    socket.on("explosion", data => {
        if(data.game.name === GAME.name)
            new Explosion(data.explosion.pos, data.explosion.size, false);
    });
    socket.on("hit", data => {
        if(data.game.name === GAME.name)
            bullets.splice(data.bullet, 1);
    });
    socket.on("crate", data => {
        if(data.game.name === GAME.name)
            crates.splice(data.crate, 1);
    });
    socket.on("victory", data => {
        WON = true;
        stage = end;
        setTimeout(() => location.reload(), 3000);
    });
    socket.on("pixel", data => {
        new Pixel(data.pixel.pos, data.pixel.speed, false);
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
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, width, height);
    drawArrays([
        rubble,
        obstacles,
        crates,
        bullets,
        pixels,
        players,
        bushes,
        explosions,
        texts,
    ]);
    drawHud();
    ctx.restore();
}

const emitUpdates = () => {
    let data = {
        player: players.find(p => p.id === ID),
        game: GAME,
    }
    socket.emit("update", data);
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
    offSet.x = -player.pos.x + c.width/2;
    offSet.y = -player.pos.y + c.height/2;
    if(offSet.x > 0) offSet.x = 0;
    if(offSet.y > 0) offSet.y = 0;
    if(offSet.x < -width + c.width) offSet.x = -width + c.width;
    if(offSet.y < -height + c.height) offSet.y = -height + c.height;
}
