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

router.get('/', (req, res) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com'
    rp({ json: true, uri: `${baseUrl}/api/versions.json` })
        .then(data => Promise.all([
            data[0],
            rp({
                json: true,
                uri: `${baseUrl}/cdn/${data[0]}/data/en_US/champion.json`
            }),
            rp({
                json: true,
                uri: `${baseUrl}/cdn/${data[0]}/data/en_US/summoner.json`
            }),
            rp({
                json: true,
                uri: `${baseUrl}/cdn/${data[0]}/data/en_US/runesReforged.json`
            }),
            rp({
                json: true,
                uri: `${baseUrl}/cdn/${data[0]}/data/en_US/item.json`
            })
        ])).then(data => {
            const champions = {},
                summonerSpells = {},
                runes = {},
                items = data[4].data
            for (let champion of Object.values(data[1].data)) {
                champions[champion.key] = champion
            }
            for (let summonerSpell of Object.values(data[2].data)) {
                summonerSpells[summonerSpell.key] = summonerSpell
            }
            for (let rune of data[3]) {
                runes[rune.id] = rune
            }
            for (let d of data[3]) {
                for (let slot of d.slots) {
                    for (let rune of slot.runes) {
                        runes[rune.id] = rune
                    }
                }
            }
            res.send({
                champions,
                items,
                runes,
                summonerSpells,
                version: data[0]
            })
        }).catch(error => res.send({ error }))
})

module.exports = router
