const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    email: {
        lowercase: true,
        required: true,
        type: String,
        unique: true
    },
    summoner: {
        ref: 'Summoner',
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('User', UserSchema)
