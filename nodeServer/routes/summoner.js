const router = require('express').Router()
// const utils = require('../utils')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

router.get('/:summonerName', (req, res) => {
    console.log('summoner')
    res.send(req.params)
})

module.exports = router
