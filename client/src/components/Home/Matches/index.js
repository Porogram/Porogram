import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'
import { StaticDataContext, SummonerDataContext } from '../../Context'
import Match from './match'

export default withStyles(theme => ({
    grid: {
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
        className={classes.grid}
    >
        <SummonerDataContext.Consumer>
            {({
                state: {
                    moreMatches,
                    summoner,
                    summoner: { accountId },
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
                    loader={(
                        <Grid
                            container
                            alignItems="center"
                            justify="center"
                            key={matches.length}
                        >
                            <CircularProgress />
                        </Grid>
                    )}
                >
                    {matches.map(match => (
                        <StaticDataContext.Consumer key={match.gameId}>
                            {({ state }) => (
                                <Match
                                    match={match}
                                    summoner={summoner}
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
