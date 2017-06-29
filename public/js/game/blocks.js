const rubble = [];
const obstacles = [];
const bushes = [];

class Obstacle{
    constructor(pos){
        this.pos = pos;
        this.size = v(scl, scl);
        this.origin = v(this.pos.x + scl/2, this.pos.y + scl/2);
        this.health = 2;
        this.img = 1;
        this.frame = 0;
        obstacles.push(this);
    }
    draw(){
        ctx.drawImage(sprites[this.img],
            40*this.frame, 0, 40, 40,
            this.pos.x, this.pos.y, scl, scl);
    }
    update(){
        if(this.health === 1) this.frame = 1;
        if(this.health < 1){
            for(let i = 0; i < 10; i++){
                let speed = v(Math.random()*5 - 2.5, Math.random()*5 - 2.5);
                new Pixel(2, add(this.origin, mult(speed, 10)), speed, 200);
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
    constructor(pos, img, arr){
        this.pos = pos;
        this.size = v(scl, scl);
        this.origin = v(this.pos.x + scl/2, this.pos.y + scl/2);
        this.img = img;
        arr.push(this);
    }
    draw(){
        ctx.drawImage(sprites[this.img],
            this.pos.x, this.pos.y, scl, scl);
    }
}

class Tnt{
    constructor(pos){
        this.pos = pos;
        this.size = v(scl, scl);
        this.origin = v(this.pos.x + scl/2, this.pos.y + scl/2);
        this.health = 2;
        this.img = 4;
        this.frame = 0;
        obstacles.push(this);
    }
    draw(){
        ctx.drawImage(sprites[this.img],
            40*this.frame, 0, 40, 40,
            this.pos.x, this.pos.y, scl, scl);
    }
    update(){
        if(this.health === 1) this.frame = 1;
        if(this.health < 1){
            new Explosion(this.pos, Math.random()*70 + 30);
            this.remove();
        }
    }
    remove(){
        obstacles.splice(obstacles.indexOf(this), 1);
        return;
    }
}

class Crate{
    constructor(pos){
        this.pos = pos;
        this.size = v(scl, scl);
        this.img = 5;
        crates.push(this);
    }
    draw(){
        ctx.drawImage(sprites[this.img],
            this.pos.x + scl/4, this.pos.y + scl/4, this.size.x/2, this.size.y/2);
    }
}