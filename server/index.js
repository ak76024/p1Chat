const express = require('express');
const http = require('http');
const {Server}= require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`a user connected id = ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`a user disconnected id = ${socket.id}`);
    })

    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    })
})

app.get('/', (req, res) => {
    res.send('hello world');
})

server.listen(3100, () => {
    console.log(server.address());
})