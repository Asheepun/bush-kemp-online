const buildMap = () => {
    let replaceAt = (string, index, replacement) => {
        return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
    }
    let scl = 40;
    let map = [
        "########################################",
        "#......................................#",
        "#.1..........C.........................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#......................................#",
        "#.........................C..........2.#",
        "#......................................#",
        "########################################",
    ];   

    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            let tile = map[i][j];
            let x = j*scl;
            let y = i*scl;
            if(tile != "1" 
            && tile != "2" 
            && tile != "C"){
                if(Math.random() < 0.3) map[i] = replaceAt(map[i], j, "#");
                else if(Math.random() < 0.4) map[i] = replaceAt(map[i], j, "B");
            }
        }
    }
    return map;
}

module.exports = {buildMap};