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
    User.create({
        firstName: 'Jewon',
        lastName: 'Oh',
        username: 'joh0531',
        password: 'test',
        email: 'joh0531@gmail.com',
        summonerName: 'Jewaffle'
    }).then(user => res.send(user)
    ).catch(error => res.send(error))
})

module.exports = router
