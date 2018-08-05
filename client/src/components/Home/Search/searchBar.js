import React, { Component, Fragment } from 'react'
import { FormHelperText } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import XRegExp from 'xregexp'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summonerName: '',
            invalidInput: false
        }
    }
    onSearch = () => {
        XRegExp('^[0-9\\p{L} _\\.]+$').test(this.state.summonerName)
            ? this.props.getSummonerData(this.state.summonerName)
            : this.setState({ invalidInput: true })
    }
    render() {
        const { summonerName, invalidInput } = this.state
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
