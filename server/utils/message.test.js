const {generateMessage} = require('./messages');
const {generateLocationMessage} = require('./messages');

test('returns an object with text field', () => {
    const object = generateMessage('Mat', 'Hej!');

    expect(object).toMatchObject({
        from: 'Mat',
        text: 'Hej!'
    });

    expect(object.createdAt).toBeTruthy();
});

test('generate location message', () => {
    const object = generateLocationMessage('Olga', 1, 1);

    expect(object).toMatchObject({
        from: 'Olga',
        url: 'https://www.google.com/maps?q=1,1'
    });

    expect(object.createdAt).toBeTruthy();
});