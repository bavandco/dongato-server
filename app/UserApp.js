const userModel = require('../db/models/User');
const bcrypt = require('bcrypt');

module.exports = class {
    async createUser(email, password, name) {
        password = await bcrypt.hash();
        const result = await userModel({
            name,

        });
    }
}