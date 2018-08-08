const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage} = require('./utils/messages');
const {generateLocationMessage} = require('./utils/messages');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected!');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to ' +
        'the chat room!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin',
        'New user joined!'));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', coords => {
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude,
            coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('User disconnected!')
    });
});

server.listen(port, () => {
    console.log('Server up and running!')
});