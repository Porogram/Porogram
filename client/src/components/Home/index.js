import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import Search from './Search'

export default class extends Component {
    constructor() {
        super()
        this.state = {
            searched: false,
            fetchedData: false,
            summoner: {},
            positions: {},
            championMasteries: {},
            matchlist: {},
            matches: [],
            error: {}
        }
    }
    getSummonerData = summonerName => {
        console.log('getSummonerData')
        this.setState({ searched: true })
        return axios.get(`/api/search/${summonerName}`)
            .then(res =>
                this.setState({
                    fetchedData: true,
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
        const { searched, fetchedData } = this.state
        if (!searched) return <Search getSummonerData={this.getSummonerData} />
        if (!fetchedData) return <CircularProgress />
        return (
            <h1>Matches</h1>
        )
    }
}
