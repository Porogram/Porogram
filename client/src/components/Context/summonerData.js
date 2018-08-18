import React, { Component, createContext } from 'react'
import axios from 'axios'

const Context = createContext()

class Provider extends Component {
    state = {
        searched: false,
        fetchedData: false,
        moreMatches: true,
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
                    positions,
                    championMasteries,
                    matchlist,
                    matches,
                    fetchedData: true,
                    moreItems: matchlist.endIndex < matchlist.totalGames
                })
            ).catch(error =>
                this.setState({
                    error: { message: 'Failed to get summoner data' }
                })
            )
    }
    getMatches = (accountId, beginIndex, endIndex) => {
        return axios.post('/api/matches', { accountId, beginIndex, endIndex })
            .then(({ data: { matchlist, matches } }) => {
                this.setState(prevState => {
                    return {
                        matchlist,
                        matches: [...prevState.matches, ...matches],
                        moreItems: matchlist.endIndex < prevState.matchlist.totalGames
                    }
                })
            }).catch(error => {
                this.setState({
                    moreItems: false,
                    error: { message: 'Failed to get more matches' }
                })
            })
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{
                    state: this.state,
                    getSummonerData: this.getSummonerData,
                    getMatches: this.getMatches
                }}
            >
                {children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer

export default { Provider, Consumer }
