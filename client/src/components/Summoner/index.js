import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import Sidebar from './sidebar'
import MatchList from './matchlist'

export default withRouter(class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summonerData: {},
            version: '',
            champData: {},
            error: {}
        }
    }
    getSummonerData = () => {
        axios.get(`/api/search/${props.match.params.summonerName}`)
            .then(res => {
                console.log(res.data)
                if ('status_code' in res.data.summoner) this.setState({ error: res.data.summoner })
                this.setState({ summonerData: res.data })
            }).catch(error => {
                console.log(error)
                this.setState({ error: { message: 'Failed to complete request' } })
            })
    }
    getStaticData = () => {
        axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
            .then(res => {
                console.log(res.data)
                this.setState({ version: res.data[0] })
                return axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.version}/data/en_US/champion.json`)
            }).then(res => {
                console.log(res.data)
                this.setState({ champData: res.data.data })
            }).catch(error => {
                console.log(error)
                this.setState({ error: { message: 'Failed to complete request' } })
            })
    }
    render() {
        const {
            summonerData,
            summonerData: { positions },
            summonerData: { summoner },
            version,
            champData,
            error
        } = this.state
        const { path } = this.props.match
        if (error) return <h1>ERROR</h1>
        return (
            <div className="summoner">
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
                                render={props => <MatchList {...props} summonerData={summonerData}/>}
                            />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        )
    }
})
