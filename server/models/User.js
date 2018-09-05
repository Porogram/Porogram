const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: undefined
    },
    lastName: {
        type: String,
        default: undefined
    },
    username: {
        type: String,
        default: undefined
    },
    password: {
        type: String,
        default: undefined
    },
    summonerName: {
        type: String,
        default: undefined
    }
})

module.exports = mongoose.model('User', UserSchema)
