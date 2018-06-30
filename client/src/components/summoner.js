import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import Matches from './matches';
import '../css/summoner.css';

class Summoner extends Component {
    constructor(props) {
        super(props);
        this.state = { summonerData: {} };
    }
    componentWillMount() {
        const url = `/api/search/${this.props.match.params.summonerName}`;
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({ summonerData: res.data });
        });
    }
    render() {
        return (
            <div className="summoner">
                <Sidebar summonerData={this.state.summonerData} />
                <Switch>
                    <Route path={`${this.props.match.path}/matches`} component={Matches} />
                </Switch>
            </div>
        );
    }
}

export default Summoner;
