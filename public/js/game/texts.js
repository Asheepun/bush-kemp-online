const texts = [];

class Text{
    constructor(text, pos, color = "white"){
        this.pos = pos;
        this.text = text;
        this.color = color;
        texts.push(this);
        setTimeout(() => texts.splice(texts.indexOf(this), 1), 500);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.font="30px Graduate";
        ctx.fillText(this.text, this.pos.x, this.pos.y);
    }
    update(){
        this.pos.y -= 2;
    }
}