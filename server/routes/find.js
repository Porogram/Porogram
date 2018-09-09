const router = require('express').Router()
// const jsonParser = require('body-parser').json()
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

router.get('/', (req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(error => res.send(error))
})

module.exports = router
