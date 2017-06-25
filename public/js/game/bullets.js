const bullets = [];

class Bullet{
    constructor(pos, speed, damage = 1, friendly = true, send = true){
        this.damage = damage;
        this.pos = pos;
        this.size = v(scl/1.5, scl/1.5);
        this.friendly = friendly;
        this.speed = speed;
        this.rotation = angle(this.pos, v(this.pos.x + this.speed.x*100, this.pos.y + this.speed.y*100));
        this.fired = false;
        bullets.push(this);
        let data = {
            bullet: this,
            game: GAME,
        }
        if(send)socket.emit("bullet", data);
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
            //ctx.fillRect(-this.size.x/2, -this.size.y/2, scl/1.5, scl/3);
            ctx.fillRect(-this.size.x/2, -this.size.y/4, this.size.x, this.size.y/2);
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

class Grenade{
    constructor(pos, speed, send = true){
        this.pos = pos;
        this.speed = speed;
        this.size = v(0, 0);
        bullets.push(this);
        setTimeout(() => this.detonate(), 1000);
        let data = {
            grenade: this,
            game: GAME,
        }
        if(send)socket.emit("grenade", data);
    }
    draw(){
        ctx.fillStyle="yellow";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 15, 0, 2*Math.PI);
        ctx.fill();
    }
    update(){
        players.forEach(player => {
            let dif = sub(this.pos, player.origin);
            if(dif.mag < this.size) {
                this.detonate();
            }
        });
        let col = checkVectorColission(this.pos, obstacles);
        if(col){ 
            this.speed = div(this.speed, 2);
            this.speed = reverse(this.speed);
        }

        this.pos = add(this.pos, this.speed);
        if(this.speed.x > 0) this.speed.x -= 0.1;
        else this.speed.x += 0.1;
        if(this.speed.y > 0) this.speed.y -= 0.1;
        else this.speed.y += 0.1;
    }
    detonate(){
        new Explosion(this.pos);
        bullets.splice(bullets.indexOf(this), 1);
    }
}