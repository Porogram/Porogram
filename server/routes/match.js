const router = require('express').Router()
const rp = require('request-promise')
const utils = require('../utils')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

router.get('/:matchId', (req, res) => {
    rp({
        json: true,
        uri: utils.createUrl('/match/v3/matches', req.params.matchId)
    }).then(match => res.send({ match }))
        .catch(error => res.send({ error }))
})

module.exports = router
