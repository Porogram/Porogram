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
                if ('summoner' in res.data) this.setState({ summoner: res.data.summoner })
                if ('positions' in res.data && res.data.positions.length) this.setState({ positions: res.data.positions[0] })
                if ('matchlist' in res.data) this.setState({ matchlist: res.data.matchlist })
                if ('matches' in res.data) this.setState({ matches: res.data.matches })
            }).catch(error => this.setState({ error: { message: 'Failed to get summoner data' } }))
    }
    getStaticData = () => {
        return axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
            .then(res => {
                this.setState({ version: res.data[0] })
                return Promise.all([
                    axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/champion.json`),
                    axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/summoner.json`),
                    axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/runesReforged.json`)
                ])
            }).then(results => {
                this.setState({
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
