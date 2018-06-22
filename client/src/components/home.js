import React, { Component } from 'react';
import axios from 'axios';
import Search from './search';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            summonerName: ""
        };
    }
    sumSearch(summonerName) {
        console.log("Summoner name: ", summonerName);
        var url = `/api/search/${summonerName}`
        axios.get(url).then(res => console.log(res.data[0]));
    }
    render() {
        return (
            <div className="Home">
                <Search onInputChange = {this.sumSearch} />
            </div>
        );
    }
}

export default Home;
