const router = require('express').Router()
// const jsonParser = require('body-parser').json()
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

router.get('/', (req, res) => {
    Promise.all([User.find(), Summoner.find()])
        .then(([users, summoners]) => res.send({ users, summoners }))
        .catch(error => res.send(error))
})

module.exports = router
