const texts = new Array();

class Text{
    constructor(pos, text, color = "white"){
        this.pos = new Vector(pos.x-(text.length*20)/4, pos.y);
        this.text = text;
        this.color = color;
        texts.push(this);
        window.setTimeout(() => {texts.splice(texts.indexOf(this), 1)}, 700);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.font="25px Graduate";
        ctx.fillText(this.text, this.pos.x, this.pos.y);
    }
    update(){
        this.pos.y -= 3;
    }
}