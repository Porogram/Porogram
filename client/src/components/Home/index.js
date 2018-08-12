import React, { Fragment } from 'react'
import { SummonerDataContext } from '../Context'
import Loading from '../loading'
import Search from '../Search'
import Matches from './Matches'

export default () => (
    <SummonerDataContext.Consumer>
        {({ state: { searched, fetchedData } }) => (
            <Fragment>
                {!searched && <Search />}
                {searched && !fetchedData && <Loading />}
                {fetchedData && <Matches />}
            </Fragment>
        )}
    </SummonerDataContext.Consumer>
)
