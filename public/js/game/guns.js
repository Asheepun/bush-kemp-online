const guns = [];
const crates = [];

const initializeGuns = () => {
    guns.push(
        Gun("pistol", 500, 10),
        Gun("machinegun", 100, 20),
        Gun("shotgun", 1000, 10, (char) => {
            let dif = checkV(char);
            dif = mult(dif, 10);
            let pos = getStartPos(char, dif);
            for(let i = 0; i < 5; i++){
                let x = Math.random()*8 - 4;
                let y = Math.random()*8 - 4;
                let olle = new Bullet(v(pos.x + x, pos.y + y), v(dif.x + x, dif.y + y));
                sendBullet(olle);
            }
            knock(char, 10, dif, 10);
        }),
    );


    function checkV(char, pos = pointer.pos){
        let dif = sub(char.origin, pos);
        dif = normalize(dif);
        dif = reverse(dif);
        return dif;
    }

    function knock(char, knock, dif, d){
        let oub = checkOub(char, c.width, c.height);  
        let col = checkColission(char, obstacles);
        dif = div(dif, d);
        if(!col.hit && !oub.hit) char.pos = sub(char.pos, v(dif.x*knock, dif.y*knock));
    }
    function getStartPos(char, dif){
        return v(char.origin.x + dif.x, char.origin.y + dif.y);
    }
}

const sendBullet = (bullet) => {
    let data = {
        bullet,
        game: GAME,
    }
    socket.emit("bullet", data);
}

const Gun = (n, fr, ss, s = (char) => {
            let dif = sub(char.pos, pointer.pos);
            dif = normalize(dif);
            dif = reverse(dif);
            dif = mult(dif, char.gun.getSS());
            let pos = v(char.origin.x + dif.x, char.origin.y + dif.y);
            let olle = new Bullet(pos, dif); 
            sendBullet(olle);
            //knockback
            let oub = checkOub(char, c.width, c.height);  
            let col = checkColission(char, obstacles);
            dif = div(dif, char.gun.getSS());
            if(!col.hit && !oub.hit) char.pos = sub(char.pos, v(dif.x, dif.y));
        }) => {
    const fireRate = fr;
    const shotSpeed = ss;
    const name = n;
    return{
        getFR: () => {
            return fireRate;
        },
        getSS: () => {
            return shotSpeed;
        },
        shoot: s,
    };
}

class Crate{
    constructor(pos){
        this.pos = pos;
        this.size = v(scl/2, scl/2);
        crates.push(this);
    }
    draw(){
        ctx.fillStyle="brown";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}