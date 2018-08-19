import React, { Component, Fragment } from 'react'
import { SummonerDataContext } from '../Context'
import Loading from '../loading'
import Profile from './profile'

export default class extends Component {
    componentDidMount() {
        const { summonerName, getSummonerData } = this.props
        getSummonerData(summonerName)
    }
    render() {
        return (
            <SummonerDataContext.Consumer>
                {({ state: { fetchedData } }) => (
                    <Fragment>
                        {!fetchedData && <Loading />}
                        {fetchedData && <Profile />}
                    </Fragment>
                )}
            </SummonerDataContext.Consumer>
        )
    }
}
