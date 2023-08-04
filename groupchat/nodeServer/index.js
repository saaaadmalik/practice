var express = require("express");
var app = express();
var http = require("http").createServer(app);
const cors = require('cors')

app.use(cors())
const users = {}

const io = require("socket.io")(http, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
})
http.listen(8000)

io.on('connection', socket =>{
    socket.on('new-user-joined',name =>{
        console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })
})