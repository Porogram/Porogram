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
    const { username, password, email, summonerName } = req.body
    console.log('username', username)
    console.log('password', password)
    console.log('email', email)
    console.log('summonerName', summonerName)
    User.findOne({ $or: [{ username }, { email }] })
        .then(user =>
            user
            ? res.send(
                `${user.username === username ? 'username' : 'email'} already exists`
            ) : Summoner.findOne({ name: summonerName })
                .then(summoner =>
                    summoner
                    ? Promise.resolve(summoner)
                    : Summoner.create({ name: summonerName })
                ).then(summoner =>
                    User.create({ username, password, email, summoner })
                ).then(user => res.send(user))
        ).catch(error => res.send(error.errmsg))
})

module.exports = router
