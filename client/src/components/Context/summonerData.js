import React, { Component, createContext } from 'react'
import axios from 'axios'

const Context = createContext()

class Provider extends Component {
    state = {
        searched: false,
        fetchedData: false,
        summoner: {},
        positions: [],
        championMasteries: [],
        matchlist: {},
        matches: [],
        error: {}
    }
    getSummonerData = summonerName => {
        this.setState({ searched: true })
        return axios.get(`/api/summoner/${summonerName}`)
            .then(({
                data: {
                    summoner,
                    positions,
                    championMasteries,
                    matchlist,
                    matches
                }
            }) => this.setState({
                    summoner,
                    positions: positions[0],    // TODO change to positions
                    championMasteries,
                    matchlist,
                    matches,
                    fetchedData: true
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
