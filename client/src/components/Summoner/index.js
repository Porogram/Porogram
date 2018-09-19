import React, { Fragment } from 'react'
import { Consumer } from '../context'
import Loading from '../loading'
import { Failure } from '../Errors'
import Profile from './profile'

export default () => (
    <Consumer>
        {({
            state: {
                championMasteries,
                error,
                matches,
                matchlist,
                positions,
                summoner
            }
        }) => {
            let Summoner
            if (error.message) Summoner = <Failure error={error} />
            else {
                if (
                    !championMasteries.length
                    || !matches.length
                    || matchlist === {}
                    || !positions.length
                    || summoner === {}
                ) Summoner = <Loading />
                else Summoner = <Profile />
            }
            return (
                <Fragment>
                    {Summoner}
                </Fragment>
            )
        }}
    </Consumer>
)
