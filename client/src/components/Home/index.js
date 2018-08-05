import React, { Component, Fragment } from 'react'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import Search from './Search'
import Matches from './Matches'
import Sidebar from './sidebar'
import { Failure } from '../Errors'

export default class extends Component {
    constructor() {
        super()
        this.state = {
            searched: false,
            fetchedData: false,
            summoner: {},
            positions: {},
            matchlist: {},
            matches: [],
            error: {}
        }
    }
    getSummonerData = summonerName => {
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
        const {
            searched,
            fetchedData,
            summoner,
            positions,
            matchlist,
            matches,
            error
        } = this.state
        if (!searched) return <Search getSummonerData={this.getSummonerData} />
        if (!fetchedData) return <CircularProgress />
        if ('message' in error) return <Failure error={error} />
        else if ('message' in summoner) return <Failure error={summoner} />
        return (
            <Fragment>
                <Sidebar
                    summoner={summoner}
                    positions={positions}
                />
                <Matches
                    summoner={summoner}
                    matchlist={matchlist}
                    matches={matches}
                />
            </Fragment>
        )
    }
}
