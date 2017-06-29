const guns = [];
const crates = [];

const initializeGuns = () => {
    guns.push(
        Gun("pistol", 500, char => {
            let dif = getV(char.origin, pointer.pos);
            let pos = add(char.origin, mult(dif, 20));
            dif = mult(dif, 10);
            new Bullet(pos, dif, 1);
            knock(char, 1, dif, 10);
        }),
        Gun("assault rifle", 200, char => {
            let dif = getV(char.origin, pointer.pos);
            let pos = add(char.origin, mult(dif, 20));
            dif = mult(dif, 20);
            new Bullet(pos, dif, 2);
            knock(char, 1, dif, 20);
        }),
        Gun("shotgun", 1000, char => {
            let dif = getV(char.origin, pointer.pos);
            let pos = add(char.origin, mult(dif, 20));
            dif = mult(dif, 10);
            for(let i = 0; i < 5; i++){
                let spread = v(Math.random()*5 - 2.5, Math.random()*5 - 2.5);
                new Bullet(add(pos, spread), add(dif, spread), 1);
            }
            knock(char, 10, dif, 10);
        }),
        Gun("minigun", 50, char => {
            let dif = getV(char.origin, pointer.pos);
            let pos = add(char.origin, mult(dif, 20));
            dif = mult(dif, 15);
            let spread = v(Math.random()*5 - 2.5, Math.random()*5 - 2.5);
            new Bullet(add(pos, spread), add(dif, spread), 1);
            knock(char, 20, dif, 15);
        }),
        Gun("grenade launcher", 1500, char => {
            let dif = getV(char.origin, pointer.pos);
            let pos = add(char.origin, mult(dif, 20));
            dif = mult(dif, 40);
            dif = div(dif, 5);
            new Grenade(pos, dif);
            knock(char, 10, dif, 5);
        }),
        Gun("big berta", 1000, char => {
            let dif =getV(char.origin, pointer.pos);
            let pos = add(char.origin, mult(dif, 20));
            dif = mult(dif, 10);
            new Bullet(pos, dif, 5, current+1-1, true, mult(v(scl/1.5, scl/3), 2));
            knock(char, 20, dif, 10);
        }),
        Gun("burst rifle", 700, char => {
            let s = () => {
                let dif = getV(char.origin, pointer.pos);
                let pos = add(char.origin, mult(dif, 20));
                dif = mult(dif, 10);
                new Bullet(pos, dif, 1, current+1-1, true, v(scl/3, scl/3));
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
    return{
        fireRate: fr,
        name: n,
        shoot: s,
    };
}