import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import Sidebar from './sidebar'
// import MatchList from './matchlist'
import { Failure } from '../Errors'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summoner: {},
            positions: {},
            matchlist: {},
            matches: [],
            version: '',
            champData: {},
            error: {}
        }
    }
    componentDidMount() {
        this.getSummonerData()
        this.getStaticData()
    }
    getSummonerData = () => {
        axios.get(`/api/search/${this.props.match.params.summonerName}`)
            .then(res => {
                if ('summoner' in res.data) this.setState({ summoner: res.data.summoner })
                if ('positions' in res.data && res.data.positions.length) this.setState({ positions: res.data.positions[0] })
                if ('matchlist' in res.data) this.setState({ matchlist: res.data.matchlist })
                if ('matches' in res.data) this.setState({ matches: res.data.matches })
            }).catch(error => {
                this.setState({ error: { message: 'Failed to complete request' } })
            })
    }
    getStaticData = () => {
        axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
            .then(res => {
                this.setState({ version: res.data[0] })
                return axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/champion.json`)
            }).then(res => {
                this.setState({ champData: res.data.data })
            }).catch(error => {
                this.setState({ error: { message: 'Failed to complete request' } })
            })
    }
    render() {
        const {
            summoner,
            positions,
            matchlist,
            matches,
            version,
            champData,
            error
        } = this.state
        const { path } = this.props.match
        if ('message' in error) {
            return <Failure error={error} />
        } else if ('message' in summoner) {
            return <Failure error={summoner} />
        }
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

                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

// <Switch>
//     <Route
//         path={`${path}/matches`}
//         render={props => <MatchList {...props} summonerData={summonerData}/>}
//     />
// </Switch>
