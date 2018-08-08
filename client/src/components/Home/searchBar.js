import React, { Component, Fragment } from 'react'
import { FormHelperText } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import XRegExp from 'xregexp'
import { SidebarContext, SummonerDataContext } from '../Context'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summonerName: '',
            invalidInput: false
        }
    }
    onSearch = (getSummonerData, handleDisplayIconToggle) => {
        const { summonerName } = this.state
        XRegExp('^[0-9\\p{L} _\\.]+$').test(summonerName)
            ? getSummonerData(summonerName).then(() => handleDisplayIconToggle())
            : this.setState({ invalidInput: true })
    }
    render() {
        const { summonerName, invalidInput } = this.state
        return (
            <SummonerDataContext.Consumer>
                {({ getSummonerData }) => (
                    <SidebarContext.Consumer>
                        {({ handleDisplayIconToggle }) => (
                            <Fragment>
                                <SearchBar
                                    value={summonerName}
                                    onChange={value =>
                                        this.setState({ summonerName: value })
                                    }
                                    onRequestSearch={() =>
                                        this.onSearch(getSummonerData, handleDisplayIconToggle)
                                    }
                                />
                                {invalidInput && (
                                    <FormHelperText>
                                        Invalid input
                                    </FormHelperText>
                                )}
                            </Fragment>
                        )}
                    </SidebarContext.Consumer>
                )}
            </SummonerDataContext.Consumer>
        )
    }
}
