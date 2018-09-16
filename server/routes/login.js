const router = require('express').Router()
const jsonParser = require('body-parser').json()
const jwt = require('jsonwebtoken')
const secret = require('../keys').secret
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
    const { password, username } = req.body
    User.findOne({ username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    Summoner.findById(user.summoner)
                        .then(summoner => {
                            user.summoner = summoner
                            res.json({
                                token: jwt.sign(JSON.stringify(user), secret)
                            })
                        })
                } else res.send({ error: 'username and password do not match' })
            } else res.send({ error: 'cannot find username' })
        }).catch(error => res.send({ error }))
})

module.exports = router
