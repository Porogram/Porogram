import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import Matches from './matches';
import '../css/summoner.css';

class Summoner extends Component {
    constructor(props) {
        super(props);
        this.state = { summonerData: {} };
        axios.get(`/api/search/${props.match.params.summonerName}`).then(res => {
            console.log(res.data);
            this.setState({ summonerData: res.data });
            if ('status_code' in res.data.summoner)
                this.props.history.push({
                    pathname: '/failure',
                    state: { error: res.data.summoner }
                });
        }).catch(error => {
            console.log(error);
            this.props.history.push({
                pathname: '/failure',
                state: {
                    error: {
                        status_code: 'Not available',
                        message: 'Failed to complete request'
                    }
                }
            });
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
                        render={props => <Matches {...props} matches={this.state.summonerData.matches} />}
                    />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Summoner);
