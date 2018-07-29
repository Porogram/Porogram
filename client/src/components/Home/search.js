import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { FormHelperText } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import XRegExp from 'xregexp'

export default class extends Component {
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
        const { summonerName, toSummoner, invalidInput } = this.state
        if (toSummoner)
            return <Redirect push to={`/summoner/${summonerName}/summary`} />
        return (
            <Fragment>
                <SearchBar
                    value={summonerName}
                    onChange={value => this.setState({ summonerName: value })}
                    onRequestSearch={this.onSearch}
                />
                {invalidInput && <FormHelperText>Invalid input</FormHelperText>}
            </Fragment>
        )
    }
}
