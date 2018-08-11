import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress, Grid } from '@material-ui/core'
import Match from './match'
import { Failure } from '../../Errors'
import { StaticDataContext, SummonerDataContext } from '../../Context'

export default withStyles(theme => ({
    main: {
        [theme.breakpoints.up('md')]: {
            padding: '20px 300px'
        }
    }
}))(({ classes }) => (
    <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.main}
    >
        <SummonerDataContext.Consumer>
            {({
                state: {
                    moreMatches,
                    summoner,
                    summoner: { accountId },
                    positions,
                    matchlist,
                    matchlist: { endIndex, totalGames },
                    matches,
                    error
                },
                getMatches
            }) => (
                <InfiniteScroll
                    loadMore={() =>
                        getMatches(
                            accountId,
                            endIndex,
                            endIndex + 10 > totalGames
                            ? totalGames : endIndex + 10
                        )
                    }
                    hasMore={moreMatches}
                    initialLoad={false}
                    loader={<CircularProgress key={matches.length} />}
                >
                    {matches.map(match => (
                        <StaticDataContext.Consumer key={match.gameId}>
                            {({ state }) => (
                                <Match
                                    match={match}
                                    summoner={summoner}
                                    positions={positions}
                                    matchlist={matchlist}
                                    staticData={state}
                                />
                            )}
                        </StaticDataContext.Consumer>
                    ))}
                </InfiniteScroll>
            )}
        </SummonerDataContext.Consumer>
    </Grid>
))
