const pixels = [];

class Pixel{
    constructor(img, pos, speed, time, send = true){
        this.time = time;
        this.img = img;
        this.pos = pos;
        this.size = v(6, 6);
        this.speed = speed;
        this.rotation = angle(this.pos, add(this.pos, this.speed));
        pixels.push(this);
        setTimeout(() => this.speed = v(0, 0), this.time);
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
        ctx.drawImage(sprites[this.img],
            0, 0, this.size.x, this.size.y);
        ctx.restore();
    }
    update(){
        this.pos = add(this.pos, this.speed);
        let col = checkColission(this, obstacles);
        if(col.hit) this.speed = reverse(this.speed);
    }
}