import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Matches from './Matches'
import SearchBar from './searchBar'
import { SummonerDataContext } from '../Context'
import Loading from '../Layout/loading'

export default withStyles(theme => ({
    search: {
        [theme.breakpoints.down('sm')]: {
            height: `calc(100vh - 56px)`
        } ,
        [theme.breakpoints.up('sm')]: {
            height: `calc(100vh - 64px)`
        }
    },
    searchBar: {
        [theme.breakpoints.down('sm')]: {
            width: 300
        },
        [theme.breakpoints.up('sm')]: {
            width: 600
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
                {searched && !fetchedData && <Loading />}
                {fetchedData && (
                    <Matches
                        summoner={summoner}
                        matchlist={matchlist}
                        matches={matches}
                    />
                )}
            </Fragment>
        )}
    </SummonerDataContext.Consumer>
))
