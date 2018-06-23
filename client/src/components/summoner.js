import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import './summoner.css';

class Summoner extends Component {
    constructor(props) {
        super(props);
        this.state = { summonerData: {} };
    }
    componentDidMount() {
        const url = `/api/search/${this.props.match.params.summonerName}`;
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({ summonerData: res.data });
        });
    }
    render() {
        return (
            <div className="summoner">
                <Sidebar />
                <ul>
                    <li>{this.state.summonerData.playerOrTeamName}</li>
                    <li>{this.state.summonerData.tier} {this.state.summonerData.rank}</li>
                </ul>
                <img src={`http://ddragon.leagueoflegends.com/cdn/${this.state.summonerData.profileIconVersion}/img/profileicon/${this.state.summonerData.profileIconId}.png`} />
            </div>
        );
    }
}

export default Summoner;
