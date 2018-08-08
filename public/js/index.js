const socket = io();

socket.on('connect', function() {
    console.log('Connected to server!')
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
});

socket.on('newMessage', function(message) {
    moment.locale('pl');
    var formattedTime = moment(message.createdAt).format('LTS');
    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${message.from}: ${message.text}`);

    jQuery('#messagesList').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    var formattedTime = moment(message.createdAt).format('LTS');

    li.text(`${formattedTime} ${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
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

    var messageField = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'Olga',
        text: messageField.val()
    }, function () {
        messageField.val('')
    })
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Your browser does not support geolocation');
    }

    locationButton.attr('disabled', 'disabled');
    locationButton.text('Sending location');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');

        alert('Unable to fetch location')
    });
});

