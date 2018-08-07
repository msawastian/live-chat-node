const {generateMessage} = require('./messages');

test('returns an object with text field', () => {
    const object = generateMessage('Mat', 'Hej!');

    expect(object).toMatchObject({
        from: 'Mat',
        text: 'Hej!'
    });

    expect(object.createdAt).toBeTruthy();
});