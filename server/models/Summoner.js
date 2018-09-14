const mongoose = require('mongoose')

const SummonerSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('Summoner', SummonerSchema)
