const bullets = [];

class Bullet{
    constructor(pos, speed, damage = 1, friendly = true, send = true, size = v(scl/1.5, scl/3)){
        this.damage = damage;
        this.pos = pos;
        this.size = size;
        this.friendly = friendly;
        this.speed = speed;
        this.rotation = angle(this.pos, add(this.pos, this.speed));
        this.fired = false;
        bullets.push(this);
        let data = {
            bullet: this,
            game: GAME,
        }
        if(send)socket.emit("bullet", data);
        let dif = sub(this.pos, players.find(p => p.id === ID).origin);
        if(dif.mag < c.width/2){
            audio.bullet.load();
            audio.bullet.play();
        }
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
            ctx.fillRect(-this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
            ctx.restore();
        }
    }
    update(){
        this.pos = add(this.pos, this.speed);

        let oub = checkOub(this, width, height);
        let ob = obstacles.map(ob => ob.origin);
        let col = checkProx(this.pos, ob, this.size.x/2 + scl/2);
        if(oub.hit) this.remove();
        if(col.hit){
            let ob = obstacles.find(o => o.origin === col.vector);
            ob.color = "darkgrey";
            ob.health -= 1;
            if(this.size.x > scl/1.5) ob.health -= 1;
            this.remove();
        }

        if(!this.friendly){
            let pl = players.map(p => p.origin);
            let col = checkProx(this.pos, pl, this.size.x/2 + scl/3);
            if(col.hit){
                let p = players.find(p => p.origin === col.vector);
                if(p.id === ID){
                    p.health -= this.damage;
                    let data = {
                        game: GAME,
                        bullet: bullets.indexOf(this),
                    }
                    socket.emit("hit", data);
                    for(let i = 0; i < 5; i++){
                        let spread = v(Math.random()*10 - 5, Math.random()*10 - 5);
                        new Pixel(add(this.pos, spread), add(reverse(this.speed), spread));
                    }
                    audio.hit.load();
                    audio.hit.play();
                    this.remove();
                }
            }
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
        audio.launch.load();
        audio.launch.play();
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