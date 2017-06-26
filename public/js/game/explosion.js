const explosions = [];

class Explosion{
    constructor(pos, size = 50, send = true){
        this.pos = pos;
        this.size = size;
        explosions.push(this);
        this.time = setTimeout(() => explosions.splice(explosions.indexOf(this), 1), 100);
        let data = {
            explosion: this,
            game: GAME,
        }
        if(send) socket.emit("explosion", data);
    }
    draw(){
        ctx.fillStyle="orange";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);
        ctx.fill();
    }
    update(){
        this.size += 10;

        this.col(obstacles);
        this.col(players);
    }
    col(objs){
        objs.forEach(obj => {
            let dif = sub(this.pos, obj.origin);
            if(dif.mag < this.size) {
                obj.health--;
                if(Tnt.prototype.isPrototypeOf(obj)) obj.health -= 2;
            }
        });
    }
    remove(){
        clearTimeout(this.time);
        explosions.splice(explosions.indexOf(this), 1);
    }
}