import React, { Fragment } from 'react'
import { Consumer } from '../context'
import Login from './Login'
import Loading from '../loading'
import Feed from './Feed'

export default () => (
    <Consumer>
        {({ state: { fetchedData, isAuthenticated } }) => {
            let home
            if (!isAuthenticated) home = <Login />
            else {
                if (!fetchedData) home = <Loading />
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
