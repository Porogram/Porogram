import React, { Fragment } from 'react'
import { SummonerDataContext } from '../Context'
import Loading from '../loading'
import Search from '../Search'
import Feed from './Feed'

export default () => (
    <SummonerDataContext.Consumer>
        {({ state: { searched, fetchedData } }) => (
            <Fragment>
                {!searched && <Search />}
                {searched && !fetchedData && <Loading />}
                {fetchedData && <Feed />}
            </Fragment>
        )}
    </SummonerDataContext.Consumer>
)
