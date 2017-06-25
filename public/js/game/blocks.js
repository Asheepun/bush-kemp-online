const rubble = [];
const obstacles = [];
const bushes = [];

class Obstacle{
    constructor(pos){
        this.pos = pos;
        this.size = v(scl, scl);
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
        this.color = color;
        arr.push(this);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, scl, scl);
    }
}