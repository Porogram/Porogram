import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import Matches from './matches';
import '../css/summoner.css';

class Summoner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summonerData: {},
            champData: {}
        };
    }
    componentWillMount() {
        const url = `/api/search/${this.props.match.params.summonerName}`;
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({ summonerData: res.data });
        });
        axios.get('http://ddragon.leagueoflegends.com/cdn/8.13.1/data/en_US/champion.json').then(res => {
            console.log(res.data.data);
            this.setState({ champData: res.data.data});
        });
    }
    render() {
        return (
            <div className="summoner">
                <Sidebar summonerData={this.state.summonerData} />
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

export default Summoner;
