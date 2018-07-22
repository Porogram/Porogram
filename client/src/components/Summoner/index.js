import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import Sidebar from './sidebar'
import MatchList from './matchlist'
import { Failure } from '../Errors'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetchedData: false,
            summoner: {},
            positions: {},
            matchlist: {},
            matches: [],
            version: '',
            champions: {},
            summonerSpells: {},
            runes: {},
            error: {}
        }
    }
    componentDidMount() {
        Promise.all([this.getSummonerData(), this.getStaticData()])
            .then(() => this.setState({ fetchedData: true }))
    }
    getSummonerData = () => {
        return axios.get(`/api/search/${this.props.match.params.summonerName}`)
            .then(res => {
                this.setState({
                    summoner: 'summoner' in res.data && res.data.summoner,
                    positions: 'positions' in res.data && res.data.positions.length && res.data.positions[0],
                    matchlist: 'matchlist' in res.data && res.data.matchlist,
                    matches: 'matches' in res.data && res.data.matches
                })
            }).catch(error => this.setState({ error: { message: 'Failed to get summoner data' } }))
    }
    getStaticData = () => {
        return axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
            .then(res => {
                return Promise.all([
                    axios.get(`http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/champion.json`),
                    axios.get(`http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/summoner.json`),
                    axios.get(`http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/runesReforged.json`),
                    res.data[0]
                ])
            }).then(results => {
                this.setState({
                    version: results[3],
                    champions: results[0].data.data,
                    summonerSpells: results[1].data.data,
                    runes: results[2].data
                })
            }).catch(error => this.setState({ error: { message: 'Failed to get static data' } }))
    }
    render() {
        const {
            fetchedData,
            summoner,
            positions,
            matchlist,
            matches,
            version,
            champions,
            summonerSpells,
            runes,
            error
        } = this.state
        const staticData = { version, champions, summonerSpells, runes }
        const { path } = this.props.match
        if (!fetchedData) return <CircularProgress />
        if ('message' in error) return <Failure error={error} />
        else if ('message' in summoner) return <Failure error={summoner} />
        return (
            <Fragment>
                <Grid container>
                    <Grid item xs={2}>
                        <Sidebar
                            positions={positions}
                            summoner={summoner}
                            version={version}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Switch>
                            <Route
                                path={`${path}/matches`}
                                render={props =>
                                    <MatchList
                                        {...props}
                                        summoner={summoner}
                                        matchlist={matchlist}
                                        matches={matches}
                                        staticData={staticData}
                                    />
                                }
                            />
                        </Switch>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}
