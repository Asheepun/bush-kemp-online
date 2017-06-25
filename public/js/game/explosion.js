const explosions = [];

class Explosion{
    constructor(pos, size = 20){
        this.pos = pos;
        this.size = size;
        explosions.push(this);
        this.time = setTimeout(() => explosions.splice(explosions.indexOf(this), 1), 100);
    }
    draw(){
        ctx.fillStyle="orange";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);
        ctx.fill();
    }
    update(){
        this.size += 10;
        this.col(players);
        this.col(obstacles);
    }
    col(objs){
        objs.forEach(obj => {
            let dif = sub(this.pos, obj.origin);
            if(dif.mag < this.size) {
                obj.health--;
                //this.remove();
            }
        });
    }
    remove(){
        clearTimeout(this.time);
        explosions.splice(explosions.indexOf(this), 1);
    }
}