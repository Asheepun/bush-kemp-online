const guns = [];
const crates = [];

const initializeGuns = () => {
    guns.push(
        Gun("pistol", 500, char => {
            let dif = checkV(char);
            dif = mult(dif, 10);
            let pos = getStartPos(char, dif);
            new Bullet(pos, dif, 1, 0.5);
            knock(char, 1, dif, 10);
        }),
        Gun("assault rifle", 200, char => {
            let dif = checkV(char);
            dif = mult(dif, 20);
            let pos = getStartPos(char, dif);
            new Bullet(pos, dif, 2);
            knock(char, 1, dif, 20);
        }),
        Gun("shotgun", 1000, char => {
            let dif = checkV(char);
            dif = mult(dif, 10);
            let pos = getStartPos(char, dif);
            for(let i = 0; i < 5; i++){
                let x = Math.random()*8 - 4;
                let y = Math.random()*8 - 4;
                new Bullet(v(pos.x + x, pos.y + y), v(dif.x + x, dif.y + y), 1);
            }
            knock(char, 10, dif, 10);
        }),
        Gun("minigun", 50, char => {
            let dif = checkV(char);
            dif = mult(dif, 15);
            let pos = getStartPos(char, dif);
            let x = Math.random()*8 - 4;
            let y = Math.random()*8 - 4;
            new Bullet(v(pos.x + x, pos.y + y), v(dif.x + x, dif.y + y), 0.5);
            knock(char, 20, dif, 15);
        }),
        Gun("grenade launcher", 3000, char => {
            let dif = checkV(char);
            dif = mult(dif, 40);
            let pos = getStartPos(char, dif);
            dif = div(dif, 5);
            new Grenade(pos, dif);
            knock(char, 10, dif, 5);
        }),
    );
}

function checkV(char, pos = pointer.pos){
    let dif = sub(char.origin, pos);
    dif = normalize(dif);
    dif = reverse(dif);
    return dif;
}

function knock(char, knock, dif, d){
    let oub = checkOub(char, width, height);  
    let col = checkColission(char, obstacles);
    dif = div(dif, d);
    dif = mult(dif, knock);
    if(!col.hit && !oub.hit) char.pos = sub(char.pos, dif);
}

function getStartPos(char, dif){
    return v(char.origin.x + dif.x, char.origin.y + dif.y);
}

const Gun = (n, fr, s) => {
    const fireRate = fr;
    const name = n;
    return{
        getFR: () => {
            return fireRate;
        },
        getName: () => {
            return name;
        },
        shoot: s,
    };
}

class Crate{
    constructor(pos){
        this.pos = pos;
        this.size = v(scl, scl);
        crates.push(this);
    }
    draw(){
        ctx.fillStyle="brown";
        ctx.fillRect(this.pos.x + scl/4, this.pos.y + scl/4, this.size.x/2, this.size.y/2);
    }
}