const {userRepository} = require("../repositoryes/user.repository");

class UserService {
    async getAll() {
        return await userRepository.getAll();
    }

    async getById(id) {
        return await userRepository.getById(id);
    }

    async create(user) {
        return await userRepository.create(user)
    }

    async update(id, user) {
        return await userRepository.update(id, user);
    }
    async delete(id) {
        return await userRepository.delete(id);
    }
}

const userService = new UserService();

module.exports = {
    userService
}