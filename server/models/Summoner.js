const mongoose = require('mongoose')

const SummonerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model('Summoner', SummonerSchema)
