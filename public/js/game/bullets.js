const bullets = [];

class Bullet{
    constructor(pos, speed, damage = 1, friendly = true, send = true, size = v(scl/1.5, scl/3)){
        this.damage = damage;
        this.pos = pos;
        this.size = size;
        this.friendly = friendly;
        this.speed = speed;
        this.rotation = angle(this.pos, add(this.pos, this.speed));
        this.img = 6;
        this.fired = false;
        bullets.push(this);
        let data = {
            bullet: this,
            game: GAME,
        }
        if(send) socket.emit("bullet", data);
        if(!checkOb(this.pos, -offSet.x, -offSet.y, c.width, c.heigth)){
            audio.bullet.pause();
            audio.bullet.load();
            audio.bullet.play();
        }
    }
    draw(){
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation);
        if(!this.fired){
            ctx.drawImage(sprites[9],
            -27/2, -27/2, 27, 27)
            this.fired = true;
        }else{
            ctx.drawImage(sprites[this.img],
                -this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
        }
        ctx.restore();
    }
    update(){
        this.pos = add(this.pos, this.speed);

        let oub = checkOub(this, width, height);
        let ob = obstacles.map(ob => ob.origin);
        let col = checkProx(this.pos, ob, this.size.x/2 + scl/2);
        if(oub.hit) this.remove();
        if(col.hit){
            let ob = obstacles.find(o => o.origin === col.vector);
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
                        new Pixel(7, add(this.pos, spread), add(reverse(this.speed), spread), 100);
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
        this.img = 9;
        this.size = v(0, 0);
        this.rotation = angle(pos, add(pos, speed));
        bullets.push(this);
        setTimeout(() => this.detonate(), 1000);
        let data = {
            grenade: this,
            game: GAME,
        }
        if(send) socket.emit("grenade", data);
        if(!checkOb(this.pos, -offSet.x, -offSet.y, c.width, c.heigth)){
            audio.launch.load();
            audio.launch.play();
        }
    }
    draw(){
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprites[this.img],
        -15, -15, 30, 30);
        ctx.restore();
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