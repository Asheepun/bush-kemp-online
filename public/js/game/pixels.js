const pixels = [];

class Pixel{
    constructor(pos, speed, send = true){
        this.pos = pos;
        this.size = v(5, 5);
        this.speed = speed;
        this.rotation = angle(this.pos, add(this.pos, this.speed));
        pixels.push(this);
        setTimeout(() => this.speed = v(0, 0), 100);
        let data = {
            game: GAME,
            pixel: this,
        }
        if(send) socket.emit("pixel", data);
    }
    draw(){
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle="red";
        ctx.fillRect(0, 0, this.size.x, this.size.y);
        ctx.restore();
    }
    update(){
        this.pos = add(this.pos, this.speed);
        let col = checkColission(this, obstacles);
        if(col.hit) this.speed = reverse(this.speed);
    }
}