const players = [];

class Player{
    constructor(pos = v(0, 0), id, size = v(scl/1.5, scl/1.5)){
        this.pos = pos;
        this.id = id;
        this.size = size;
        this.origin = v(this.pos.x+this.size.x/2, this.pos.y+this.size.y/2);
        this.speed = v(0, 0);
        this.acc = v(0, 0);
        this.shooting = false;
        this.gun = guns[0];
        this.overheating = 0;
        this.health = 10;
        this.rotation = 0;
        this.img = 0;
        players.push(this);
    }
    draw(){
        ctx.save();
        ctx.translate(this.origin.x, this.origin.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprites[this.img], -this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
        ctx.restore();
    }
    update(){
        this.origin = v(this.pos.x+this.size.x/2, this.pos.y+this.size.y/2);
        if(this.id === ID){
            this.rotation = angle(this.origin, pointer.pos);
            this.move();
            this.checkCrates();
            this.checkHit();
            this.shoot();
            if(this.overheating > 0) this.overheating -= 1;
        }
    }
    move(){
        if(keys.w.down && !keys.s.down) this.speed.y = -3;
        if(keys.s.down && !keys.w.down) this.speed.y = 3;
        if((keys.w.down && keys.s.down) || (!keys.w.down && !keys.s.down)) this.speed.y = 0;
        if(keys.a.down && !keys.d.down) this.speed.x = -3;
        if(keys.d.down && !keys.a.down) this.speed.x = 3;
        if((keys.a.down && keys.d.down) || (!keys.a.down && !keys.d.down)) this.speed.x = 0;
        this.speed = add(this.speed, this.acc);

        let oub = checkOb(this, 0, 0, width, height);  
        let col = checkColission(this, obstacles);
        if((col.up || oub.up) && this.speed.y <= 0) this.speed.y = 0;
        if((col.down || oub.down) && this.speed.y >= 0) this.speed.y = 0; 
        if((col.left || oub.left) && this.speed.x <= 0) this.speed.x = 0;
        if((col.right || oub.right) && this.speed.x >= 0) this.speed.x = 0;

        this.pos = add(this.pos, this.speed);
    }
    shoot(){
        if(pointer.down){
            if(!this.shooting && this.overheating < 300){
                this.shooting = true;
                setTimeout(() => this.shooting = false, this.gun.fireRate);
                this.gun.shoot(this);
                this.overheating += 30;
            }
        }
    }
    checkHit(){
        if(this.health <= 0){
            let data = {
                game: GAME,
            }
            socket.emit("defeat", data);
            WON = false;
            stage = end;
            setTimeout(() => location.reload(), 3000);
        }
    }
    checkCrates(){
        let col = checkColission(this, crates);
        if(col.hit){
            this.gun = guns[Math.floor(Math.random()*(guns.length-1.1))+1];
            this.overheating = 0;
            new Text(this.gun.name, v(this.pos.x - 50, this.pos.y-20));
            if(col.object){
                let data = {
                    game: GAME,
                    crate: crates.indexOf(col.object),
                }
                socket.emit("crate", data);
                crates.splice(crates.indexOf(col.object), 1);
                audio.crate.load();
                audio.crate.play();
            }
        }
    }
}