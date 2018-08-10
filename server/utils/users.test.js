const {Users} = require('./users');

describe('tests for Users class', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
            id: 1,
            name: 'Mat',
            room: 'abc'
        },
            {
                id: 2,
                name: 'Olga',
                room: 'abc'
            },
            {
                id: 3,
                name: 'Michal',
                room: 'efg'
            }]
    });

    test('should add new user', () => {
        let users = new Users();

        let comparisonUser = {
            id: 123,
            name: 'Mat',
            room: 'Lodge'
        };

        let testUser = users.addUser(123, 'Mat', 'Lodge');

        expect(testUser).toMatchObject(comparisonUser);
    });

    test('should return names from array', () => {
        let userList = users.getUserList('abc');

        expect(userList).toEqual(['Mat', 'Olga'])
    });

    test('should remove an user from array', () => {
        users.removeUser(1);
        let userList = users.getUserList('abc');

        expect(userList.length).toEqual(1);
    });

    test('should get user object', () => {
        let user = users.getUser(1);

        expect(user).toMatchObject({id: 1, name: 'Mat', room: 'abc'})
    });
});

