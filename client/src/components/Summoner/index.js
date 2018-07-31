import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import Sidebar from './sidebar'
import Matches from './Matches'
import Summary from './Summary'
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
            .then(res =>
                this.setState({
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
    getStaticData = () => {
        const baseUrl = 'https://ddragon.leagueoflegends.com/'
        return axios.get(`${baseUrl}api/versions.json`)
            .then(({ data }) =>
                Promise.all([
                    data[0],
                    axios.get(`${baseUrl}cdn/${data[0]}/data/en_US/champion.json`),
                    axios.get(`${baseUrl}cdn/${data[0]}/data/en_US/summoner.json`),
                    axios.get(`${baseUrl}cdn/${data[0]}/data/en_US/runesReforged.json`)
                ])
            ).then(([version, champions, summonerSpells, runes]) =>
                this.setState({
                    version,
                    champions: champions.data.data,
                    summonerSpells: summonerSpells.data.data,
                    runes: runes.data
                })
            ).catch(error =>
                this.setState({
                    error: { message: 'Failed to get static data' }
                })
            )
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
        const { path } = this.props.match
        const staticData = { version, champions, summonerSpells, runes }
        if (!fetchedData) return <CircularProgress />
        if ('message' in error) return <Failure error={error} />
        else if ('message' in summoner) return <Failure error={summoner} />
        console.log('summoner', summoner)
        console.log('positions', positions)
        console.log('matchlist', matchlist)
        console.log('matches', matches)
        return (
            <Fragment>
                <Sidebar
                    positions={positions}
                    summoner={summoner}
                    version={version}
                />
                <Switch>
                    <Route
                        path={`${path}/matches`}
                        render={props =>
                            <Matches
                                {...props}
                                summoner={summoner}
                                matchlist={matchlist}
                                matches={matches}
                                staticData={staticData}
                            />
                        }
                    />
                    <Route
                        path={`${path}/summary`}
                        render={props =>
                            <Summary
                                {...props}
                                summoner={summoner}
                            />
                        }
                    />
                </Switch>
            </Fragment>
        )
    }
}
