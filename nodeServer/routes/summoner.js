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

router.get('/:summonerName', (req, res) => {
    rp(utils.createUrl(
        '/summoner/v3/summoners/by-name',
        req.params.summonerName
    )).then(summoner => res.send(summoner)
    ).catch(error => res.send(error))
})

module.exports = router
