const router = require('express').Router()
const jsonParser = require('body-parser').json()
const utils = require('../utils')
const User = require('../models/User')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

router.post('/', jsonParser, (req, res) => {
    User.create(req.body)
        .then(user => res.send(user))
        .catch(error => res.send(error))
})

module.exports = router
