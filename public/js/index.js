const socket = io();

socket.on('connect', function() {
    console.log('Connected to server!')
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
});

socket.on('newMessage', function(message) {
    console.log('New email!');
    console.log(message.from);
    console.log(message.text);
    console.log(message.createdAt);
});

