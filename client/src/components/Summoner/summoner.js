import React, { Component, Fragment } from 'react'
import { SummonerDataContext } from '../Context'
import Loading from '../loading'
import { Failure } from '../Errors'
import Profile from './profile'

export default class extends Component {
    componentDidMount() {
        const { summonerName, getSummonerData } = this.props
        getSummonerData(summonerName)
    }
    render() {
        return (
            <SummonerDataContext.Consumer>
                {({ state, state: { error, fetchedData } }) => (
                    <Fragment>
                        {!fetchedData && <Loading />}
                        {fetchedData && ('message' in error
                        ? <Failure error={error} />
                        : <Profile />)}
                    </Fragment>
                )}
            </SummonerDataContext.Consumer>
        )
    }
}
