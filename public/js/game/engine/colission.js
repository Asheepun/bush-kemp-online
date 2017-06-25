function checkColission(character, objects){
    let result = {
        hit: false,
        hori: false,
        vert: false,
        up: false,
        down: false,
        right: false,
        left: false,
        object: false
    }
    
    let c = getCordsForObject(character);

    //hit
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        let o = getCordsForObject(object);
        if(((c.x >= o.x && c.x <= o.x2) || (c.x2 >= o.x && c.x2 <= o.x2))
        && ((c.y >= o.y && c.y <= o.y2) || (c.y2 >= o.y && c.y2 <= o.y2)))
        result.hit = true;
        break;
    }
    //down
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if((character.pos.y + character.size.y >= object.pos.y
        && character.pos.y + character.size.y <= object.pos.y + object.size.y/2)
        && ((character.pos.x+1 >= object.pos.x
        && character.pos.x+1 <= object.pos.x + object.size.x)
        || (character.pos.x + character.size.x-1 >= object.pos.x
        && character.pos.x + character.size.x-1 <= object.pos.x + object.size.x))){
            result.hit = true;
            result.vert = true;
            result.down = true;
            result.object = object;
            break;
        }
    }
    //up
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if((character.pos.y >= object.pos.y + object.size.y/2
        && character.pos.y <= object.pos.y + object.size.y)
        && ((character.pos.x+1 >= object.pos.x
        && character.pos.x+1 <= object.pos.x + object.size.x)
        || (character.pos.x + character.size.x-1 >= object.pos.x
        && character.pos.x + character.size.x-1 <= object.pos.x + object.size.x))){
            result.hit = true;
            result.vert = true;
            result.up = true;
            result.object = object;
            break;
        }
    }
    //right
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if((character.pos.x + character.size.x >= object.pos.x
        && character.pos.x + character.size.x <= object.pos.x + object.size.x/2)
        &&((character.pos.y+1 >= object.pos.y
        && character.pos.y+1 <= object.pos.y + object.size.y)
        ||(character.pos.y + character.size.y-1 >= object.pos.y
        && character.pos.y + character.size.y-1 <= object.pos.y + object.size.y))){
            result.hit = true;
            result.hori = true;
            result.right = true;
            result.object = object;
            break;
        }
    }
    //left
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if((character.pos.x >= object.pos.x + object.size.x/2
        && character.pos.x <= object.pos.x + object.size.x)
        &&((character.pos.y+1 >= object.pos.y
        && character.pos.y+1 <= object.pos.y + object.size.y)
        ||(character.pos.y + character.size.y-1 >= object.pos.y
        && character.pos.y + character.size.y-1 <= object.pos.y + object.size.y))){
            result.hit = true;
            result.hori = true;
            result.left = true;
            result.object = object;
            break;
        }
    }
    return result;
}

function checkSidesOnGrid(character, object, grid, dist = 1){
    let result = {
        up: false,
        down: false,
        left: false,
        right: false,
        hit: false,
    }

    let x = Math.floor((character.pos.x+1)/scl);
    let y = Math.floor((character.pos.y+1)/scl);
    let x2 = Math.floor((character.pos.x+character.size.x-1)/scl);
    let y2 = Math.floor((character.pos.y+character.size.y-1)/scl);
    if(x != map[0].length-1){
        if(grid[y][x+dist] === object
        || grid[y2][x+dist] === object)
            result.right = true;
            result.hit = true;
    }
    if(y != map.length-1){
        if(grid[y+dist][x] === object
        || grid[y+dist][x2] === object)
            result.down = true;
            result.hit = true;
    }
    if(x2 != 0){
        if(grid[y][x2-dist] === object
        || grid[y2][x2-dist] === object)
            result.left = true;
            result.hit = true;
    }
    if(y2 != 0){        
        if(grid[y2-dist][x] === object
        || grid[y2-dist][x2] === object)
            result.up = true;
            result.hit = true;
    }
    return result;
}

function checkOub(character, width, height){
    let result = {
        hit: false,
        hori: false,
        vert: false,
        up: false,
        down: false,
        left: false,
        right: false,
    }

    let c = getCordsForObject(character);

    if(c.x <= 0){
        result.hit = true;
        result.hori = true;
        result.left = true;
    }
    if(c.y <= 0){
        result.vert = true;
        result.hit = true;
        result.up = true;
    }
    if(c.x2 >= width){
        result.hori = true;
        result.hit = true;
        result.right = true;
    }
    if(c.y2 >= height){
        result.vert = true;
        result.hit = true;
        result.down = true;
    }

    return result;
}

function checkVectorColission(vector, objects){
    let result = false
    for(let i = 0; i < objects.length; i++){
        let object = objects[i];
        if(vector.x >= object.pos.x && vector.x <= object.pos.x + object.size.x
            && vector.y >= object.pos.y && vector.y <= object.pos.y + object.size.y){
                result = true;
                break;
        }
    }
    return result;
}

function getCordsForObject(object){
    return {
        x: object.pos.x,
        y: object.pos.y,
        x2: object.pos.x + object.size.x,
        y2: object.pos.y + object.size.y,
    };
}