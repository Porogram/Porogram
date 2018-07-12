import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import Matches from './matches';

class Summoner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summonerData: {},
            champData: {}
        };
        axios.get(`/api/search/${props.match.params.summonerName}`).then(res => {
            console.log(res.data);
            this.setState({ summonerData: res.data });
            if ('status_code' in res.data.summoner)
                this.props.history.push({
                    pathname: '/',
                    state: { error: res.data.summoner }
                });
        }).catch(error => {
            console.log(error);
            this.props.history.push({
                pathname: '/',
                state: { error: { message: 'Failed to complete request' } }
            });
        });
        axios.get('http://ddragon.leagueoflegends.com/cdn/8.13.1/data/en_US/champion.json').then(res => {
            console.log(res.data.data);
            this.setState({ champData: res.data.data});
        });
    }
    render() {
        return (
            <div className="summoner">
                <Sidebar
                    positions={this.state.summonerData.positions}
                    summoner={this.state.summonerData.summoner}
                    version={this.state.summonerData.version}
                />
                <Switch>
                    <Route
                        path={`${this.props.match.path}/matches`}
                        render={props => <Matches {...props} summonerData={this.state.summonerData} champData={this.state.champData}/>}
                    />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Summoner);
