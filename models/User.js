const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    outlookId: {
        type: String,
        required: true
    },
    givenName: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);