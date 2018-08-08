import React, { Fragment } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import Search from './Search'
import Sidebar from '../Layout/Sidebar'
import Matches from './Matches'
import { SummonerDataContext } from '../Context'

export default () => (
    <SummonerDataContext.Consumer>
        {({
            state: { searched, fetchedData, summoner, matchlist, matches }
        }) => (
            <Fragment>
                {!searched && (
                    <Search
                        handleSearched={this.handleSearched}
                        handleFetchedData={this.handleFetchedData}
                    />
                )}
                {!fetchedData && (
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        style={{ height: '80vh' }}
                    >
                        <CircularProgress />
                    </Grid>
                )}
                {searched && fetchedData && (
                    <Fragment>
                        <Sidebar />
                        <Matches
                            summoner={summoner}
                            matchlist={matchlist}
                            matches={matches}
                        />
                    </Fragment>
                )}
            </Fragment>
        )}
    </SummonerDataContext.Consumer>
)
