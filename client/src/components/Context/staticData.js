import React, { Component, createContext } from 'react'
import axios from 'axios'

const BASEURL = 'https://ddragon.leagueoflegends.com'
const Context = createContext()

class Provider extends Component {
    state = {
        version: '',
        champions: {},
        summonerSpells: {},
        runes: {},
        items: {}
    }
    componentDidMount() {
        return axios.get(`${BASEURL}/api/versions.json`)
            .then(({ data }) => {
                const version = data[0]
                return Promise.all([
                    version,
                    axios.get(`${BASEURL}/cdn/${version}/data/en_US/champion.json`),
                    axios.get(`${BASEURL}/cdn/${version}/data/en_US/summoner.json`),
                    axios.get(`${BASEURL}/cdn/${version}/data/en_US/runesReforged.json`),
                    axios.get(`${BASEURL}/cdn/${version}/data/en_US/item.json`)
                ])
            }).then(([version, champions, summonerSpells, runes, items]) =>
                this.setState({
                    version,
                    champions: champions.data.data,
                    summonerSpells: summonerSpells.data.data,
                    runes: runes.data,
                    items: items.data.data
                })
            ).catch(error => console.log(error))
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{
                    baseUrl: BASEURL,
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
