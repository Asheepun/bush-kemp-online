const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log("listening on port: " + port));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/index.html");
});

const io = require("socket.io")(server);
const { waiting, playing, Game } = require(__dirname + "/modules/game.js");
const { buildMap } = require(__dirname + "/modules/map.js");

io.on("connection", socket => {
    console.log(socket.id + " has connected!");

    let data = {
        waiting,
        id: socket.id,
    };
    socket.emit("initialize", data);

    socket.on("creategame", data => {
        new Game(waiting, data.name, socket.id);
        let data2 = {
            game: waiting[waiting.length-1],
        }
        io.sockets.emit("newgame", data2);
    });

    socket.on("joinrequest", data => {
        waiting.forEach(game => {
            if(game.name === data.game.name){
                game.players.push(socket.id);
                playing.push(game);
                waiting.splice(waiting.indexOf(game));
                let data = {
                    game,
                    map: buildMap(),
                }
                socket.emit("joined", data);
                io.sockets.emit("startgame", data);
            }
        });
    });

    socket.on("update", data => socket.broadcast.emit("update", data));
    socket.on("bullet", data => socket.broadcast.emit("bullet", data));
    socket.on("crate", data => socket.broadcast.emit("crate", data));
    socket.on("defeat", data => socket.broadcast.emit("victory", data));
    socket.on("hit", data => socket.broadcast.emit("hit", data));
});