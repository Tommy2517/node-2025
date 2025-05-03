const {read, write} = require("../services/fs.service");

class UserRepository {
    async getAll() {
        return read();
    }

    async getById(id) {
        const users = await read();
        return users.find(user => user.id === Number(id));
    }

    async create(user) {
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            ...user
        }
        users.push(newUser);
        await write(users);
        return newUser
    }

    async update(id, user){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        users[index] = {id:Number(id), ...user}
        return users[index]
    }

    async delete(id) {
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        users.splice(index,1)
        await write(users);
    }
}

const userRepository = new UserRepository()
module.exports = {
    userRepository
}