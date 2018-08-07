import React, { Component, Fragment } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import axios from 'axios'
import Search from './Search'
import Sidebar from './sidebar'
import Matches from './Matches'
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
        if (!fetchedData) return (
            <Grid
                container
                alignItems="center"
                justify="center"
                style={{ height: '80vh' }}
            >
                <CircularProgress />
            </Grid>
        )
        if ('message' in summoner) return <Failure error={summoner} />
        else if ('message' in positions) return <Failure error={positions} />
        else if ('message' in matchlist) return <Failure error={matchlist} />
        else if ('message' in matches) return <Failure error={matches} />
        else if ('message' in error) return <Failure error={error} />
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
