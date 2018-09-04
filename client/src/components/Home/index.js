import React, { Fragment } from 'react'
import { SummonerDataContext } from '../Context'
import Login from './Login'
import Signup from '../Signup'
import Search from '../Search'
import Loading from '../loading'
import Feed from './Feed'

export default () => (
    <SummonerDataContext.Consumer>
        {({ state: { searched, fetchedData } }) => (
            <Fragment>
                {!searched && <Signup />}
                {searched && !fetchedData && <Loading />}
                {fetchedData && <Feed />}
            </Fragment>
        )}
    </SummonerDataContext.Consumer>
)
