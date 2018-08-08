import React, { Component, createContext } from 'react'
import axios from 'axios'

const Context = createContext()

class Provider extends Component {
    state = {
        summoner: {},
        positions: {},
        championMasteries: {},
        matchlist: {},
        matches: [],
        error: {}
    }
    getSummonerData = summonerName => {
        return axios.get(`/api/search/${summonerName}`)
            .then(res =>
                this.setState({
                    summoner: 'summoner' in res.data && res.data.summoner,
                    positions:
                        'positions' in res.data &&
                        res.data.positions.length &&
                        res.data.positions[0],
                    championMasteries:
                        'championMasteries' in res.data &&
                        res.data.championMasteries,
                    matchlist: 'matchlist' in res.data && res.data.matchlist,
                    matches: 'matches' in res.data && res.data.matches
                })
            ).catch(error =>
                this.setState({
                    error: { message: 'Failed to get summoner data' }
                })
            )
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{
                    state: this.state,
                    getSummonerData: this.getSummonerData
                }}
            >
                {children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer

export default { Provider, Consumer }
