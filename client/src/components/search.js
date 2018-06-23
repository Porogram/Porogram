import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './search.css';

class Search extends Component {
    constructor() {
        super();
        this.state = { summonerName: '' };
    }
    render() {
        return (
            <div className="search col-6 offset-3 form-group">
                <input className="search-bar form-control form-control-lg" type="search" value={this.state.summonerName} onChange={event => this.setState({ summonerName: event.target.value })} />
                <Link to={`/summoner/${this.state.summonerName}`} className="btn btn-ghost">Search</Link>
            </div>
        );
    }
}

export default Search;
