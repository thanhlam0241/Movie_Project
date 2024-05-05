const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('User', userSchema)