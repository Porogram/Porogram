import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Matches from './Matches'
import SearchBar from './searchBar'
import { SummonerDataContext } from '../Context'
import Loading from '../Layout/loading'

export default withStyles(theme => ({
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
                {!fetchedData && <Loading />}
                {fetchedData && (
                    <Fragment>
                        <Matches
                            summoner={summoner}
                            positions={positions}
                            matchlist={matchlist}
                            matches={matches}
                        />
                    </Fragment>
                )}
            </Fragment>
        )}
    </SummonerDataContext.Consumer>
))
