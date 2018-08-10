const socket = io();

function scrollToBottom() {

    var messages = jQuery('#messagesList');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();


    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight
        >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    const params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No errors');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!')
});

socket.on('updateUserList', function(users) {
    var userList = jQuery('<ul></ul>');

    users.forEach(function(user) {
        userList.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(userList);
});

socket.on('newMessage', function(message) {
    var template = jQuery('#messageTemplate').html();
    var formattedTime = moment(message.createdAt).format('LTS');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messagesList').append(html);
    scrollToBottom();
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
    scrollToBottom();
});

jQuery('#inputForm').on('submit', function (event) {
    event.preventDefault();

    var messageField = jQuery('[name=message]');

    socket.emit('createMessage', {
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

