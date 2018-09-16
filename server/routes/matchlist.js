const router = require('express').Router()
const jsonParser = require('body-parser').json()
const utils = require('../utils')

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

router.post('/', jsonParser, (req, res) => {
    const { accountId, beginIndex, endIndex } = req.body
    utils.request(
        utils.createUrl(
            '/match/v3/matchlists/by-account',
            accountId,
            { beginIndex, endIndex }
        )
    ).then(matchlist => res.send({ matchlist }))
        .catch(error => res.send({ error }))
})

module.exports = router
