class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        let removedUser = this.users.filter(user => user.id === id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser[0];
    }

    getUser (id) {
        return this.users.filter(user => id === user.id)[0]
    }

    getUserList (room) {
        return this.users.filter(user => room === user.room).map(user => user.name)
    }
}

module.exports = {Users};