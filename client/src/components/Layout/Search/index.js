import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import SearchBar from './searchBar'

export default withStyles(theme => ({
    search: {
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)'
        } ,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100vh - 64px)'
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
))
