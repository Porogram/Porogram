import React, { Component, createContext } from 'react'
import axios from 'axios'

const Context = createContext()

class Provider extends Component {
    state = {
        championMasteries: [],
        error: {},
        fetchedData: false,
        matches: [],
        matchlist: {},
        moreMatches: true,
        positions: [],
        searched: false,
        summoner: {}
    }
    getSummonerData = summonerName => {
        this.setState({ searched: true })
        return axios.get(`/api/summoner/${summonerName}`)
            .then(({ data }) =>
                data.error
                ? this.setState({ error: data.error, fetchedData: true })
                : this.setState({
                    championMasteries: data.championMasteries,
                    fetchedData: true,
                    matches: data.matchlist.matches,
                    matchlist: data.matchlist,
                    moreItems: (
                        data.matchlist.endIndex < data.matchlist.totalGames
                    ),
                    positions: data.positions,
                    summoner: data.summoner
                })
            ).catch(error =>
                this.setState({
                    error: { message: 'Failed to get summoner data' },
                    fetchedData: true
                })
            )
    }
    getMatch = matchId => {
        return axios.get(`/api/match/${matchId}`)
            .then(({ data: { match } }) => Promise.resolve(match))
            .catch(error =>
                this.setState({ error: { message: 'Failed to get match' } })
            )
    }
    getMatches = (accountId, beginIndex, endIndex) => {
        return axios.post('/api/matchlist', { accountId, beginIndex, endIndex })
            .then(({ data: { matchlist } }) =>
                this.setState(prevState => ({
                    matchlist,
                    matches: [...prevState.matches, ...matchlist.matches],
                    moreItems: matchlist.endIndex < prevState.matchlist.totalGames
                }))
            ).catch(error =>
                this.setState({
                    error: { message: 'Failed to get more matches' },
                    moreItems: false
                })
            )
    }
    render() {
        const { children } = this.props
        return (
            <Context.Provider
                value={{
                    getMatch: this.getMatch,
                    getMatches: this.getMatches,
                    getSummonerData: this.getSummonerData,
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
