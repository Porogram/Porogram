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

router.get('/', (req, res) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com'
    utils.request(`${baseUrl}/api/versions.json`)
        .then(versions => Promise.all([
            versions[0],
            utils.request(
                `${baseUrl}/cdn/${versions[0]}/data/en_US/champion.json`
            ),
            utils.request(
                `${baseUrl}/cdn/${versions[0]}/data/en_US/summoner.json`
            ),
            utils.request(
                `${baseUrl}/cdn/${versions[0]}/data/en_US/runesReforged.json`
            ),
            utils.request(`${baseUrl}/cdn/${versions[0]}/data/en_US/item.json`)
        ])).then(([
            version,
            championData,
            summonerSpellData,
            runeData,
            itemData
        ]) => {
            const champions = {},
                summonerSpells = {},
                runes = {},
                items = itemData.data
            for (let champion of Object.values(championData.data))
                champions[champion.key] = champion
            for (let summonerSpell of Object.values(summonerSpellData.data))
                summonerSpells[summonerSpell.key] = summonerSpell
            for (let rune of runeData) runes[rune.id] = rune
            for (let data of runeData) {
                for (let slot of data.slots) {
                    for (let rune of slot.runes) runes[rune.id] = rune
                }
            }
            res.send({ champions, items, runes, summonerSpells, version })
        }).catch(error => res.send({ error }))
})

module.exports = router
