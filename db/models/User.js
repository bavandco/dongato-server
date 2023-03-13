const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    _id: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: [{
            token: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    profile: {
        type: String,
        default: ''
    }
});

module.exports = model("User", userSchema);