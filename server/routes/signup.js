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
    Promise.all([
        User.findOne({ $or: [{ username }, { email }] }),
        utils.request(
            utils.createUrl('/summoner/v3/summoners/by-name', summonerName)
        )
    ]).then(([user]) => {
        if (user) {
            res.send({
                error:
                    `${user.username === username ? 'Username' : 'Email'} already exists`
            })
        } else {
            Summoner.findOne({ name: summonerName })
                .then(summoner => {
                    if (summoner) return Promise.resolve(summoner)
                    else return Summoner.create({ name: summonerName })
                }).then(summoner =>
                    User.create({ email, password, summoner, username })
                ).then(user => res.send(user))
        }
    }).catch(error => {
        if (error.statusCode === 404)
            res.send({ error: 'Summoner does not exist' })
        else res.send({ error: error.errmsg })
    })
})

module.exports = router
