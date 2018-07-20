import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Input, Button } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import XRegExp from 'xregexp'

const styles = theme => ({
    search: {
        textAlign: 'center',
        marginTop: 240
    }
})

export default withStyles(styles)(class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summonerName: '',
            toSummoner: false,
            invalidInput: false
        }
    }
    onSearch = () => {
        XRegExp('^[0-9\\p{L} _\\.]+$').test(this.state.summonerName) ?
            this.setState({ toSummoner: true }) :
            this.setState({ invalidInput: true })
    }
    render() {
        const { classes } = this.props
        const { summonerName, toSummoner, invalidInput } = this.state
        if (toSummoner) return <Redirect to={`/summoner/${summonerName}/matches`} />
        return (
            <div className={classes.search}>
                <SearchBar
                    value={summonerName}
                    onChange={value => this.setState({ summonerName: value })}
                    onRequestSearch={this.onSearch}
                />
                <Button onClick={this.onSearch}>Search</Button>
                {invalidInput && <h3>Invalid input</h3>}
            </div>
        )
    }
})

// <Input
//     type="text"
//     value={summonerName}
//     placeholder="Summoner Name"
//     onChange={event => this.setState({ summonerName: event.target.value })}
// />
