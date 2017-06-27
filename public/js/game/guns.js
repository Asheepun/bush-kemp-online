const guns = [];
const crates = [];

const initializeGuns = () => {
    guns.push(
        Gun("pistol", 500, char => {
            let dif = getV(char.origin, pointer.pos);
            dif = mult(dif, 10);
            let pos = add(char.origin, dif);
            new Bullet(pos, dif, 1, 0.5);
            knock(char, 1, dif, 10);
        }),
        Gun("assault rifle", 200, char => {
            let dif = getV(char.origin, pointer.pos);
            dif = mult(dif, 20);
            let pos = add(char.origin, dif);
            new Bullet(pos, dif, 2);
            knock(char, 1, dif, 20);
        }),
        Gun("shotgun", 1000, char => {
            let dif = getV(char.origin, pointer.pos);
            dif = mult(dif, 10);
            let pos = add(char.origin, dif);
            for(let i = 0; i < 5; i++){
                let x = Math.random()*5 - 2.5;
                let y = Math.random()*5 - 2.5;
                new Bullet(v(pos.x + x, pos.y + y), v(dif.x + x, dif.y + y), 1);
            }
            knock(char, 10, dif, 10);
        }),
        Gun("minigun", 50, char => {
            let dif = getV(char.origin, pointer.pos);
            dif = mult(dif, 15);
            let pos = add(char.origin, dif);
            let x = Math.random()*5 - 2.5;
            let y = Math.random()*5 - 2.5;
            new Bullet(v(pos.x + x, pos.y + y), v(dif.x + x, dif.y + y), 1);
            knock(char, 20, dif, 15);
        }),
        Gun("grenade launcher", 1500, char => {
            let dif = getV(char.origin, pointer.pos);
            dif = mult(dif, 40);
            let pos = add(char.origin, dif);
            dif = div(dif, 5);
            new Grenade(pos, dif);
            knock(char, 10, dif, 5);
        }),
        Gun("big berta", 1000, char => {
            let dif =getV(char.origin, pointer.pos);
            dif = mult(dif, 10);
            let pos = add(char.origin, dif);
            new Bullet(pos, dif, 5, true, true, mult(v(scl/1.5, scl/3), 2));
            knock(char, 20, dif, 10);
        }),
        Gun("burst rifle", 700, char => {
            let s = () => {
                let dif = getV(char.origin, pointer.pos);
                dif = mult(dif, 10);
                let pos = add(char.origin, dif);
                new Bullet(pos, dif, 1, true, true, v(scl/3, scl/3));
                knock(char, 1, dif, 20);
            }
            s();
            setTimeout(s, 100);
            setTimeout(s, 200);
        }),
    );
}

const knock = (char, knock, dif, d) => {
    let oub = checkOub(char, width, height);  
    let col = checkColission(char, obstacles);
    dif = div(dif, d);
    dif = mult(dif, knock);
    if(!col.hit && !oub.hit) char.pos = sub(char.pos, dif);
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