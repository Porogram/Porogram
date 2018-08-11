import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { SummonerDataContext } from '../Context'
import Loading from '../Layout/loading'
import Search from '../Search'
import Matches from './Matches'

export default () => (
    <SummonerDataContext.Consumer>
        {({
            state: {
                searched,
                fetchedData,
                summoner,
                positions,
                matchlist,
                matches
            }
        }) => (
            <Fragment>
                {!searched && <Search />}
                {searched && !fetchedData && <Loading />}
                {fetchedData && (
                    <Matches
                        summoner={summoner}
                        positions={positions}
                        matchlist={matchlist}
                        matches={matches}
                    />
                )}
            </Fragment>
        )}
    </SummonerDataContext.Consumer>
)
