const pixels = [];

class Pixel{
    constructor(img, pos, speed, time, size = v(6, 6)){
        this.time = time;
        this.img = img;
        this.pos = pos;
        this.size = size;
        this.speed = speed;
        this.rotation = angle(this.pos, add(this.pos, this.speed));
        pixels.push(this);
        setTimeout(() => this.speed = v(0, 0), this.time);
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