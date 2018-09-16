import React, { Component, Fragment } from 'react'
import { Consumer } from '../../context'
import Loading from '../../loading'
import { Failure } from '../../Errors'
import Profile from './profile'

export default class extends Component {
    componentDidMount() {
        const { summonerName, getSummonerData } = this.props
        getSummonerData(summonerName)
    }
    render() {
        return (
            <Consumer>
                {({ state, state: { error, fetchedData } }) => {
                    let summoner
                    if (error.message) summoner = <Failure error={error} />
                    else {
                        if (!fetchedData) summoner = <Loading />
                        else summoner = <Profile />
                    }
                    return (
                        <Fragment>
                            {summoner}
                        </Fragment>
                    )
                }}
            </Consumer>
        )
    }
}
