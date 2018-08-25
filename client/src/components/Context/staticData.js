import React, { Component, createContext } from 'react'
import axios from 'axios'

const baseUrl = 'https://ddragon.leagueoflegends.com'
const Context = createContext()
const maps = {
    1: 'Summoner\'s Rift',
    2: 'Summoner\'s Rift',
    3: 'The Proving Grounds',
    4: 'Twisted Treeline',
    8: 'The Crystal Scar',
    10: 'Twisted Treeline',
    11: 'Summoner\'s Rift',
    12: 'Howling Abyss',
    14: 'Butcher\'s Bridge',
    16: 'Cosmic Ruins',
    18: 'Valoran City Park',
    19: 'Substructure 43',
    21: 'Nexus Blitz'
}

class Provider extends Component {
    state = {
        version: '',
        champions: {},
        summonerSpells: {},
        runes: {},
        items: {}
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
                console.log('maps', maps)
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
                value={{ baseUrl, maps, state: this.state }}
            >
                {children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer

export default { Provider, Consumer }
