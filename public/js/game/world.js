const initializeMap = () => {
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            let tile = map[i][j];
            let x = j*scl;
            let y = i*scl;
            if(GAME.pos === 1){
                if(tile === "1") new Player(v(x, y), ID);
                if(tile === "2") new Player(v(x, y), "enemy");
            }else {
                if(tile === "1") new Player(v(x, y), "enemy");
                if(tile === "2") new Player(v(x, y), ID);
            }
            if(tile === "#") new Obstacle(v(x, y));
            if(tile === "B") new Block(v(x, y), "green", bushes); 
            if(tile === "C") new Crate(v(x, y));
            if(tile === "T") new Tnt(v(x, y));
        }
    }
}