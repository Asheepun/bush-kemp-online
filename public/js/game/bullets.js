const bullets = [];

class Bullet{
    constructor(pos, speed, damage = 1, friendly = true){
        this.damage = damage;
        this.pos = pos;
        this.size = v(scl/3, scl/3);
        this.friendly = friendly;
        this.speed = speed;
        this.rotation = angle(this.pos, v(this.pos.x + this.speed.x*100, this.pos.y + this.speed.y*100));
        this.fired = false;
        bullets.push(this);
    }
    draw(){
        ctx.fillStyle="yellow";
        if(!this.fired){
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, scl/3,  0, 2*Math.PI);
            ctx.fill();
            this.fired = true;
        }else {
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rotation);
            ctx.fillRect(-this.size.x/2, -this.size.y/2, scl/1.5, scl/3);
            ctx.restore();
        }
    }
    update(){
        this.pos = add(this.pos, this.speed);

        let oub = checkOub(this, width, height);
        let col = checkColission(this, obstacles);
        if(oub.hit) this.remove();
        if(col.hit){
            if(col.object)col.object.color = "darkgrey";
            col.object.health--;
            this.remove();
        }
    }
    remove(){
        bullets.splice(bullets.indexOf(this), 1);
        return;
    }
}