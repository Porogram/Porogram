import React, { Component, Fragment } from 'react'
import { FormHelperText } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import XRegExp from 'xregexp'
import { Consumer } from '../../context'

export default class extends Component {
    state = {
        summonerName: '',
        invalidInput: false
    }
    onSearch = getSummonerData => {
        const { summonerName } = this.state
        XRegExp('^[0-9\\p{L} _\\.]+$').test(summonerName)
            ? getSummonerData(summonerName)
            : this.setState({ invalidInput: true })
    }
    render() {
        const { summonerName, invalidInput } = this.state
        return (
            <Consumer>
                {({ getSummonerData }) => (
                    <Fragment>
                        <SearchBar
                            value={summonerName}
                            onChange={value =>
                                this.setState({ summonerName: value })
                            }
                            onRequestSearch={() =>
                                this.onSearch(getSummonerData)
                            }
                        />
                        {invalidInput && (
                            <FormHelperText>
                                Invalid input
                            </FormHelperText>
                        )}
                    </Fragment>
                )}
            </Consumer>
        )
    }
}
