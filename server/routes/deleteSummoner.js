const router = require('express').Router()
const utils = require('../utils')
const Summoner = require('../models/Summoner')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

router.get('/:id', (req, res) => {
    Summoner.findByIdAndDelete(req.params.id)
        .then(user => res.send(user))
        .catch(error => res.send({ error }))
})

module.exports = router
