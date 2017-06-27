const drawHud = () => {
    let player = players.find(p => p.id === ID);
    //overheat
    if(player.overheating < 300) ctx.fillStyle="orange";
    else ctx.fillStyle="red";
    ctx.fillRect(0-offSet.x, 0-offSet.y, player.overheating, 20);
    //health
    ctx.fillStyle="white";
    ctx.font="30px Graduate";
    ctx.fillText(player.health + " hp", 20-offSet.x, 41 - offSet.y);
    ctx.fillText(player.gun.name, 20 - offSet.x, 71 - offSet.y);
}