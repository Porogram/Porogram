import React, { Component, createContext } from 'react'
import axios from 'axios'

const BASE_URL = 'https://ddragon.leagueoflegends.com'
const Context = createContext()

class Provider extends Component {
    state = {
        version: '',
        champions: {},
        summonerSpells: {},
        runes: {},
        items: {},
        championTable: {},
        summonerSpellTable: {},
        runeTable: {},
        itemTable: {}
    }
    componentDidMount() {
        return axios.get(`${BASE_URL}/api/versions.json`)
            .then(({ data }) => Promise.all([
                data[0],
                axios.get(
                    `${BASE_URL}/cdn/${data[0]}/data/en_US/champion.json`
                ),
                axios.get(
                    `${BASE_URL}/cdn/${data[0]}/data/en_US/summoner.json`
                ),
                axios.get(
                    `${BASE_URL}/cdn/${data[0]}/data/en_US/runesReforged.json`
                ),
                axios.get(`${BASE_URL}/cdn/${data[0]}/data/en_US/item.json`)
            ])).then(([version, champions, summonerSpells, runes, items]) => {
                const {
                    championTable,
                    summonerSpellTable,
                    runeTable,
                    itemTable
                } = this.state
                for (let champion of Object.values(champions.data.data)) {
                    championTable[champion.key] = champion
                }
                for (let summonerSpell of Object.values(summonerSpells.data.data)) {
                    summonerSpellTable[summonerSpell.key] = summonerSpell
                }
                for (let rune of runes.data) {
                    runeTable[rune.id] = rune
                }
                for (let data of runes.data) {
                    for (let slot of data.slots) {
                        for (let rune of slot.runes) {
                            runeTable[rune.id] = rune
                        }
                    }
                }
                console.log('championTable', championTable)
                console.log('summonerSpellTable', summonerSpellTable)
                console.log('runeTable', runeTable)
                console.log('itemTable', items.data.data)
                this.setState({
                    version,
                    champions: champions.data.data,
                    summonerSpells: summonerSpells.data.data,
                    runes: runes.data,
                    items: items.data.data,
                    championTable,
                    summonerSpellTable,
                    runeTable,
                    itemTable: items.data.data
                })
            }).catch(error => console.log(error))
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{
                    baseUrl: BASE_URL,
                    state: this.state
                }}
            >
                {children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer

export default { Provider, Consumer }
