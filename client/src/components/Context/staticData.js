import React, { Component, createContext } from 'react'
import axios from 'axios'

const Context = createContext()
const baseUrl = 'https://ddragon.leagueoflegends.com'
const queues = {
    0: 'Custom',
    72: '1v1 Snowdown Showdown',
    73: '2v2 Snowdown Showdown',
    75: '6v6 Hexakill',
    76: 'URF',
    78: 'One for All',
    83: 'Co-op vs AI URF',
    98: '6v6 Hexakill',
    100: '5v5 ARAM',
    310: 'Nemesis',
    313: 'Black Market Brawlers',
    317: 'Definitely Not Dominion',
    325: 'All Random',
    400: '5v5 Draft',
    420: '5v5 Ranked Solo',
    430: '5v5 Blind',
    440: '5v5 Ranked Flex',
    450: '5v5 ARAM',
    460: '3v3 Blind',
    470: '3v3 Ranked Flex',
    600: 'Blood Hunt',
    610: 'Dark Star',
    700: 'Clash',
    800: 'Co-op vs. AI',
    810: 'Co-op vs. AI',
    820: 'Co-op vs. AI',
    830: 'Co-op vs. AI',
    840: 'Co-op vs. AI',
    850: 'Co-op vs. AI',
    900: 'ARURF',
    910: 'Ascension',
    920: 'Legend of the Poro King',
    940: 'Nexus Siege',
    950: 'Doom Bots',
    960: 'Doom Bots',
    980: 'Star Guardian Invasion',
    990: 'Star Guardian Invasion',
    1000: 'Overcharge',
    1010: 'Snow ARURF',
    1020: 'One for All',
    1030: 'Odyssey: Extraction Intro',
    1040: 'Odyssey: Extraction Cadet',
    1050: 'Odyssey: Extraction Crewmember',
    1060: 'Odyssey: Extraction Captain',
    1070: 'Odyssey: Extraction Onslaught',
    1200: 'Nexus Blitz'
}

class Provider extends Component {
    state = {
        champions: {},
        items: {},
        runes: {},
        summonerSpells: {},
        version: ''
    }
    componentDidMount() {
        return axios.get(`${baseUrl}/api/versions.json`)
            .then(({ data }) => Promise.all([
                data[0],
                axios.get(
                    `${baseUrl}/cdn/${data[0]}/data/en_US/champion.json`
                ),
                axios.get(
                    `${baseUrl}/cdn/${data[0]}/data/en_US/summoner.json`
                ),
                axios.get(
                    `${baseUrl}/cdn/${data[0]}/data/en_US/runesReforged.json`
                ),
                axios.get(`${baseUrl}/cdn/${data[0]}/data/en_US/item.json`)
            ])).then(([version, championData, summonerSpellData, runeData, itemData]) => {
                const champions = {},
                    summonerSpells = {},
                    runes = {},
                    items = itemData.data.data
                for (let champion of Object.values(championData.data.data)) {
                    champions[champion.key] = champion
                }
                for (let summonerSpell of Object.values(summonerSpellData.data.data)) {
                    summonerSpells[summonerSpell.key] = summonerSpell
                }
                for (let rune of runeData.data) {
                    runes[rune.id] = rune
                }
                for (let data of runeData.data) {
                    for (let slot of data.slots) {
                        for (let rune of slot.runes) {
                            runes[rune.id] = rune
                        }
                    }
                }
                console.log('champions', champions)
                console.log('summonerSpells', summonerSpells)
                console.log('runes', runes)
                console.log('items', items)
                console.log('queues', queues)
                this.setState({
                    version,
                    champions,
                    summonerSpells,
                    runes,
                    items
                })
            }).catch(error => console.log(error))
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{ baseUrl, queues, state: this.state }}
            >
                {children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer

export default { Provider, Consumer }
