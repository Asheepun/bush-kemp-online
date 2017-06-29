const explosions = [];

class Explosion{
    constructor(pos, size = 50){
        this.pos = pos;
        this.size = size;
        this.img = 8;
        explosions.push(this);
        this.time = setTimeout(() => explosions.splice(explosions.indexOf(this), 1), 100);
        if(!checkOb(this.pos, -offSet.x, -offSet.y, c.width, c.heigth)){
            audio.explosion.pause();
            audio.explosion.load();
            audio.explosion.play();
        }
    }
    draw(){
        ctx.drawImage(sprites[this.img],
        this.pos.x-this.size, this.pos.y-this.size, this.size*2, this.size*2);
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