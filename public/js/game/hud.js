const drawHud = () => {
    let player = players.find(p => p.id === ID);
    //overheat
    if(player.overheating < 300) ctx.fillStyle="orange";
    else ctx.fillStyle="red";
    ctx.fillRect(0-offSet.x, 0-offSet.y, player.overheating, 20);
    //health
    ctx.fillStyle="red";
    ctx.font="30px solid";
    ctx.fillText(player.health + "/10 hp", 20-offSet.x, 41 - offSet.y);
}