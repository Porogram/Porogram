import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import XRegExp from 'xregexp';

const styles = theme => ({
    search: {
        textAlign: 'center',
        marginTop: 240
    }
});

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
        const { classes } = this.props;
        return (
            <div className={classes.search}>
                <Input
                    type="text"
                    value={this.state.summonerName}
                    placeholder="Summoner Name"
                    onChange={event => this.setState({ summonerName: event.target.value })}
                />
                <Button onClick={this.onSearch}>Search</Button>
            </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Search));
