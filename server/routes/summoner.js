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
    rp({
        json: true,
        uri:
            utils.createUrl(
                '/summoner/v3/summoners/by-name',
                req.params.summonerName
            )
    }).then(summoner =>
        Promise.all([
            summoner,
            rp({
                json: true,
                uri:
                    utils.createUrl(
                        '/league/v3/positions/by-summoner',
                        summoner.id
                    )
            }),
            rp({
                json: true,
                uri:
                    utils.createUrl(
                        '/champion-mastery/v3/champion-masteries/by-summoner',
                        summoner.id
                    )
            }),
            rp({
                json: true,
                uri:
                    utils.createUrl(
                        '/match/v3/matchlists/by-account',
                        summoner.accountId,
                        { beginIndex: 0, endIndex: 10 }
                    )
            })
        ])
    ).then(([summoner, positions, championMasteries, matchlist]) =>
        res.send({ summoner, positions, championMasteries, matchlist })
    ).catch(error => res.send({ error }))
})

module.exports = router
