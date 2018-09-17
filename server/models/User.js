const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

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

UserSchema.pre('save', function(next) {
    const user = this
    bcrypt.hash(user.password, saltRounds)
        .then(hash => {
            user.password = hash
            return next()
        }).catch(error => next(error))
})

module.exports = mongoose.model('User', UserSchema)
