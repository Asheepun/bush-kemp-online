const bullets = [];

class Bullet{
    constructor(pos, speed, damage = 1, friendly = true, send = true, sis = 1){
        this.damage = damage;
        this.pos = pos;
        this.size = v(scl/1.5, scl/3);
        this.friendly = friendly;
        this.speed = speed;
        this.scl = sis;
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
            ctx.fillRect(-this.size.x/2*this.scl, -this.size.y/(2/this.scl), this.size.x*this.scl, this.size.y*this.scl);
            ctx.restore();
        }
    }
    update(){
        this.pos = add(this.pos, this.speed);

        let oub = checkOub(this, width, height);
        let ob = obstacles.map(ob => ob.origin);
        let col = checkProx(this.pos, ob, (scl/1.4));
        if(oub.hit) this.remove();
        if(col.hit){
            let ob = obstacles.find(o => o.origin === col.vector);
            ob.color = "darkgrey";
            ob.health -= this.scl;
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
        let p = players.map(p => p.origin);
        let colP = checkProx(this.pos, p, this.size);
        if(colP.hit) this.detonate();

        let col = checkVectorColission(this.pos, obstacles);
        if(col){ 
            this.speed = div(this.speed, 2);
            this.speed = reverse(this.speed);
        }

        this.pos = add(this.pos, this.speed);
        this.speed = div(this.speed, 1.04);
    }
    detonate(){
        new Explosion(this.pos);
        bullets.splice(bullets.indexOf(this), 1);
    }
}