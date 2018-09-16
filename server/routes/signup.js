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
    const { email, password, summonerName, username } = req.body
    User.findOne({ $or: [{ username }, { email }] })
        .then(user => {
            if (user) {
                res.send({
                    error:
                        `${user.username === username ? 'username' : 'email'} already exists`
                })
            } else {
                Summoner.findOne({ name: summonerName })
                    .then(summoner =>
                        summoner
                        ? Promise.resolve(summoner)
                        : Summoner.create({ name: summonerName })
                    ).then(summoner =>
                        User.create({ email, password, summoner, username })
                    ).then(user => res.send(user))
            }
        }).catch(error => res.send({ error: error.errmsg }))
})

module.exports = router
