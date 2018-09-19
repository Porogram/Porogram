import React, { Fragment } from 'react'
import { Consumer } from '../context'
import Login from './Login'
import Loading from '../loading'
import Feed from './Feed'

export default () => (
    <Consumer>
        {({
            state: {
                championMasteries,
                isAuthenticated,
                matches,
                matchlist,
                positions,
                summoner
            } 
        }) => {
            let home
            if (!isAuthenticated) home = <Login />
            else {
                if (
                    !championMasteries.length
                    || !matches.length
                    || matchlist === {}
                    || !positions.length
                    || summoner === {}
                ) home = <Loading />
                else home = <Feed />
            }
            return (
                <Fragment>
                    {home}
                </Fragment>
            )
        }}
    </Consumer>
)
