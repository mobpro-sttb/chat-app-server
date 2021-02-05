require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoDB = require('./src/databases/mongodb/index');
const socketIO = require('socket.io');
const shared = require('./src/shared');
const MessageController = require('./src/controllers/MessageController');

const app = express();

app.use(express.json());
app.use(cors());

const server = require('http').createServer(app);
const io = socketIO(server);
shared.io = io;

let users = [];
shared.users = users;

io.on('connection', socket => {
    socket.on("user-in", (user) => {
        const newUser = { ...user, socket };
        users.push(newUser);
        console.log("user = ", user);
        socket.emit("user-in");
        shared.users = users;
        MessageController.getMessagesAndEmit(newUser);
    });
    
    socket.on("user-left", () => {
        users = users.filter(x => x.socket.id !== socket.id);
        shared.users = users;
    });

    socket.on("disconnect", () => {
        users = users.filter(x => x.socket.id !== socket.id);
        shared.users = users;
    });

});

app.use('/', require('./src/routes'));

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Listening on port "+port);
    mongoDB.connect();
});