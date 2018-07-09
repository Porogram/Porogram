import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import XRegExp from 'xregexp';
import '../css/search.css';

class Search extends Component {
    constructor() {
        super();
        this.state = { summonerName: '' };
    }
    onSearch = () => {
        let re = XRegExp('^[0-9\\p{L} _\\.]+$');
        if (re.test(this.state.summonerName)) {
            console.log(this.state.summonerName, 'valid summoner name');
            return (<Link to={`/summoner/${this.state.summonerName}/matches`} />);
        }
        console.log(this.state.summonerName, 'invalid summoner name');
        return null;
    }
    render() {
        return (
            <div className="search col-6 offset-3 form-group">
                <Input type="text" value={this.state.summonerName} placeholder="Summoner Name" onChange={event => this.setState({ summonerName: event.target.value })}/>
                <Button onClick={this.onSearch}>Search</Button>
            </div>
        );
    }
}

export default Search;
