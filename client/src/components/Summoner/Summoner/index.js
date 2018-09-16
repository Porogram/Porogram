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
                {({ state, state: { error, fetchedData } }) => (
                    <Fragment>
                        {!fetchedData && <Loading />}
                        {fetchedData && ('message' in error
                        ? <Failure error={error} />
                        : <Profile />)}
                    </Fragment>
                )}
            </Consumer>
        )
    }
}
