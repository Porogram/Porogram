import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import './search.css';

class Search extends Component {
    constructor() {
        super();
        this.state = { summonerName: '' };
    }
    render() {
        return (
            <div className="search col-6 offset-3 form-group">
                <Input type="text" value={this.state.summonerName} placeholder="Summoner Name" onChange={event => this.setState({ summonerName: event.target.value })}/>
                <Link to={`/summoner/${this.state.summonerName}`} className="btn btn-ghost">Search</Link>
            </div>
        );
    }
}

export default Search;
