const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        match: /^[a-zA-Z0-9]+$/
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        match: /\S+@\S+\.\S+/
    },
    summoner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Summoner',
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)
