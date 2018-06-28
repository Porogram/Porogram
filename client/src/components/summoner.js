import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
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
                <Sidebar summonerData={this.state.summonerData}/>
            </div>
        );
    }
}

export default Summoner;
