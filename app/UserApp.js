const userModel = require('../db/models/User');
const utilsFunctions = require('../utils/functions');
const uuid = require('uuid');

module.exports = class {
    async createUser(email, password, name) {
        password = await utilsFunctions.cryptPassword(password);
        const id = uuid.v4();
        const result = new userModel({
            _id: id,
            email,
            password,
            createdAt: new Date(),
            name
        });
        await result.save();
        return result;
    }
}