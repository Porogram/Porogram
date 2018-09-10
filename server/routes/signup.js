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
    const {
        firstName,
        lastName,
        username,
        password,
        email,
        summonerName
    } = req.body
    Summoner.findOne({ name: summonerName })
        .then(summoner =>
            summoner
            ? Promise.resolve(summoner)
            : Summoner.create({ name: summonerName })
        )
        .then(summoner =>
            User.create({
                firstName,
                lastName,
                username,
                password,
                email,
                summoner
            })
        )
        .then(user => res.send(user))
        .catch(error => res.send(error))
})

module.exports = router
