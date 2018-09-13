import React, { Fragment } from 'react'
import { AuthContext, SummonerDataContext } from '../Context'
import Login from './Login'
import Loading from '../loading'
import Feed from './Feed'

export default () => (
    <AuthContext.Consumer>
        {({ state: { isAuthenticated } }) => (
            <SummonerDataContext.Consumer>
                {({ state: { searched, fetchedData } }) => (
                    <Fragment>
                        {!isAuthenticated && <Login />}
                        {isAuthenticated && !fetchedData && <Loading />}
                        {fetchedData && <Feed />}
                    </Fragment>
                )}
            </SummonerDataContext.Consumer>
        )}
    </AuthContext.Consumer>
)
