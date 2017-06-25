let waiting, playing, name, gameArea, register, games, GAME, ID, socket = io();

window.onload = () => { 
    socket.on("initialize", data => {
        GAME = false;
        ID = data.id;
        name = document.getElementById("name");
        gameArea = document.getElementById("game");
        register = document.getElementById("register");
        games = document.getElementById("games");
        waiting = data.waiting;

        waiting.forEach(game => {
            addGame(game);
        });
    });
    socket.on("newgame", data => {
        addGame(data.game);
    });
    socket.on("joined", data => {
        register.style.display = "none";
        GAME = {
            name: data.game.name,
            pos: 2,
        };
    });
    socket.on("startgame", data => {
        for(let i = 0; i < games.children.length; i++){
            if(games.children[i].innerHTML === data.game.name){
                games.removeChild(games.children[i]);
            }
        }
        if(data.game.name === GAME.name){
            begin(data.map)
        }
    });
}

const createGame = () => {
    if(name.value === ""){
        let no = document.getElementById("no-name");
        no.style.display = "block";
        setTimeout(() => no.style.display = "none", 3000);
    }else if(!checkAll(waiting, game => game.name != name.value)){
        let no = document.getElementById("used-name");
        no.style.display = "block";
        setTimeout(() => no.style.display = "none", 3000);
    }else if(!GAME){
        GAME = {
            name: name.value,
            pos: 1,
        };
        let data = {
            name: name.value,
        }
        socket.emit("creategame", data);
        register.style.display = "none";

    }
}

const joinGame = game => {
    console.log(game);
    let data = {
        game: game,
    }
    socket.emit("joinrequest", data);
}

const checkAll = (array, condition) => {
    let unchecked = array.length;
    for(let i = 0; i < array.length; i++){
        if(!condition(array[i])){
            break;
        }else unchecked--;
    }
    if(unchecked === 0) return true;
    else return false;
}

const addGame = game => {
    let li = document.createElement("li");
    li.innerHTML = game.name;
    li.addEventListener("click", () => joinGame(game));
    games.insertBefore(li, games.firstElementChild);
}