const express = require("express");
var http = require("http");
const cors = require("cors");
const app = express();
const port = 5000 || process.env.PORT;
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.json());
var clients = {};
//app.use(cors());

io.on('connection',(socket) => {
    console.log('connected');
    console.log(socket.id , "has joined");
    socket.on("signin" , (id) => {
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });
    socket.on("message" , (msg) => {
        console.log(msg);
        let targetId = msg.targetId;
    if (clients[targetId]) clients[targetId].emit("message", msg); 
    });

});
app.route("/check").get((req,res) => {
    return res.json("Your app is working fine");
})

server.listen(port, "0.0.0.0",()=> {
    console.log('Server started');
});