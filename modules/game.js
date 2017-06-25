const waiting = [];
const playing = [];

class Game{
    constructor(array, name, player){
        this.name = name;
        this.players = [player];
        array.push(this);
    }
    addPlayer(player){
        if(this.players.length < 2)
            this.players.push(this);
    }
}

module.exports =  {waiting, playing, Game};