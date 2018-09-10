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
    const { username, password } = req.body
    console.log('username', username)
    console.log('password', password)
    User.findOne({ username, password })
        .then(user =>
            user
            ? Summoner.findById(user.summoner)
                .then(summoner => {
                    user.summoner = summoner
                    res.send(user)
                })
            : res.send())
        .catch(error => res.send(error))
})

module.exports = router
