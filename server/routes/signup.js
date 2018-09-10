const router = require('express').Router()
const jsonParser = require('body-parser').json()
const utils = require('../utils')
const User = require('../models/User')
const Summoner = require('../models/Summoner')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

router.post('/', jsonParser, (req, res) => {
    req.body.summonerName
    Summoner.findOne({ name: req.body.summonerName })
        .then(summoner =>
            summoner
            ? Promise.resolve(summoner)
            : Summoner.create({ name: req.body.summonerName })
        )
        .then(summoner => res.send(summoner))
        .catch(error => res.send(error))
})

module.exports = router
