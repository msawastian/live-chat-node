const socket = io();

socket.on('connect', function() {
    console.log('Connected to server!')
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
});

socket.on('newMessage', function(message) {
    var template = jQuery('#messageTemplate').html();
    var formattedTime = moment(message.createdAt).format('LTS');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messagesList').append(html)
});

socket.on('newLocationMessage', function(message) {
    var template = jQuery('#locationMessageTemplate').html();
    var formattedTime = moment(message.createdAt).format('LTS');
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messagesList').append(html);
});

jQuery('#inputForm').on('submit', function (event) {
    event.preventDefault();

    var messageField = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
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

