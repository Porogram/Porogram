const router = require('express').Router()
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
    utils.request(
        utils.createUrl(
            '/summoner/v3/summoners/by-name',
            req.params.summonerName
        )
    ).then(summoner =>
        Promise.all([
            summoner,
            utils.request(
                utils.createUrl(
                    '/league/v3/positions/by-summoner',
                    summoner.id
                )
            ),
            utils.request(
                utils.createUrl(
                    '/champion-mastery/v3/champion-masteries/by-summoner',
                    summoner.id
                )
            ),
            utils.request(
                utils.createUrl(
                    '/match/v3/matchlists/by-account',
                    summoner.accountId,
                    { beginIndex: 0, endIndex: 10 }
                )
            )
        ])
    ).then(([summoner, positions, championMasteries, matchlist]) =>
        res.send({ championMasteries, matchlist, positions, summoner })
    ).catch(error => res.send({ error }))
})

module.exports = router
