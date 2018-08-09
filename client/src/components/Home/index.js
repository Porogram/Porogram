import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'
import Sidebar from '../Layout/Sidebar'
import Matches from './Matches'
import SearchBar from './searchBar'
import { SummonerDataContext } from '../Context'

export default withStyles(theme => ({
    circularProgress: {
        height: '80vh'
    },
    search: {
        height: '90vh'
    },
    searchBar: {
        [theme.breakpoints.up('md')]: {
            width: 600
        },
        [theme.breakpoints.down('sm')]: {
            width: 300
        }
    }
}))(({ classes }) => (
    <SummonerDataContext.Consumer>
        {({
            state: { searched, fetchedData, summoner, matchlist, matches }
        }) => (
            <Fragment>
                {!searched && (
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        className={classes.search}
                    >
                        <div className={classes.searchBar}>
                            <SearchBar />
                        </div>
                    </Grid>
                )}
                {!fetchedData && (
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        className={classes.circularProgress}
                    >
                        <CircularProgress />
                    </Grid>
                )}
                {fetchedData && (
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
))
