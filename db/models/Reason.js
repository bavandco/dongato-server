const {Schema, model} = require('mongoose');
const reasonSchema = new Schema({
    debt: {
        type: String,
        ref: "User",
        required: true
    },
    creditor: {
        type: String,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    due: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    transactions: {
        type: [
            {
                createdAt: {
                    type: Date,
                    default: Date.now
                },
                amount: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
});
