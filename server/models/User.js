const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    summonerName: String
})

module.exports = mongoose.model('User', UserSchema)
