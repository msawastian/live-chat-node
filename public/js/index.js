const socket = io();

socket.on('connect', function() {
    console.log('Connected to server!')
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
});

socket.on('newMessage', function(message) {
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messagesList').append(li);
});

socket.emit('createMessage', {
    from: 'Mat',
    text: 'Hey!'
}, function(data) {
    console.log(data)
});

jQuery('#inputForm').on('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'Olga',
        text: jQuery('[name=message]').val()
    }, function () {

    })
});