const players = [];

class Player{
    constructor(pos = v(0, 0), id, size = v(scl/1.5, scl/1.5)){
        this.pos = pos;
        this.id = id;
        this.size = size;
        this.origin = v(this.pos.x+this.size.x/2, this.pos.y+this.size.y/2);
        this.speed = {up: 0, down: 0, left: 0, right: 0};
        this.shooting = false;
        this.gun = guns[0];
        this.overheating = 0;
        this.health = 10;
        players.push(this);
    }
    draw(){
        ctx.fillStyle="white";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
    update(){
        this.origin = v(this.pos.x+this.size.x/2, this.pos.y+this.size.y/2);
        if(this.id === ID){
            this.move();
            this.checkCrates();
            this.checkHit();
            this.shoot();
            if(this.overheating > 0) this.overheating -= 1;
        }
    }
    move(){
        this.checkKeys();

        let oub = checkOub(this, width, height);  
        let col = checkColission(this, obstacles);

        if(!oub.right && !col.right)this.pos.x += this.speed.right;
        if(!oub.left && !col.left)this.pos.x -= this.speed.left;
        if(!oub.down && !col.down)this.pos.y += this.speed.down;
        if(!oub.up && !col.up)this.pos.y -= this.speed.up;

    }
    checkKeys(){
        if(keys.s.down) this.speed.down = 2;
        else this.speed.down = 0;
        if(keys.w.down) this.speed.up = 2;
        else this.speed.up = 0;
        if(keys.d.down) this.speed.right = 2;
        else this.speed.right = 0;
        if(keys.a.down) this.speed.left = 2;
        else this.speed.left = 0;
    }
    shoot(){
        if(pointer.down){
            if(!this.shooting && this.overheating < 300){
                this.shooting = true;
                setTimeout(() => this.shooting = false, this.gun.getFR());
                this.gun.shoot(this);
                this.overheating += 30;
            }
        }
    }
    checkHit(){
        let col = checkColission(this, bullets);
        if(col.object){
            console.log("CHECL");
            if(!col.object.friendly){
                if(col.hit){
                    this.health--;
                    bullets.splice(bullets.indexOf(col.object), 1);
                    let data = {
                        game: GAME,
                        bullet: bullets.indexOf(col.object),
                    }
                    socket.emit("hit", data);
                }
            }
        }
        if(this.health < 1){
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
            if(col.object){
                let data = {
                    game: GAME,
                    crate: crates.indexOf(col.object),
                }
                socket.emit("crate", data);
                crates.splice(crates.indexOf(col.object), 1);
            }
        }
    }
}