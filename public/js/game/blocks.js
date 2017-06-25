const rubble = [];
const obstacles = [];
const bushes = [];

class Obstacle{
    constructor(pos){
        this.pos = pos;
        this.size = v(scl, scl);
        this.origin = v(this.pos.x + scl/2, this.pos.y + scl/2);
        this.health = 2;
        this.color = "grey"
        obstacles.push(this);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, scl, scl);
    }
    update(){
        if(this.health === 1) this.color = "darkgrey";
        if(this.health < 1){
            new Block(this.pos, "#131313", rubble);
            if(Math.random() < 0.25){ 
                let olle = new Explosion(this.pos);
                let data = {
                    explosion: olle,
                    game: GAME,
                }
                socket.emit("explosion", data);
            }
            this.remove();
        }
    }
    remove(){
        obstacles.splice(obstacles.indexOf(this), 1);
        return;
    }
}

class Block{
    constructor(pos, color, arr){
        this.pos = pos;
        this.size = v(scl, scl);
        this.origin = v(this.pos.x + scl/2, this.pos.y + scl/2);
        this.color = color;
        arr.push(this);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, scl, scl);
    }
}