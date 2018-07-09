import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import XRegExp from 'xregexp';
import '../css/search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { summonerName: '' };
    }
    onSearch = () => {
        if (XRegExp('^[0-9\\p{L} _\\.]+$').test(this.state.summonerName)) {
            return this.props.history.push(`/summoner/${this.state.summonerName}/matches`);
        }
        return this.props.history.push({
            pathname: '/',
            state: { error: { message: 'Invalid summoner name' } }
        });
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

export default withRouter(Search);
