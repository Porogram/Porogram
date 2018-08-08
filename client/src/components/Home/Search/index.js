import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import SearchBar from './searchBar'

export default withStyles(theme => ({
    grid: {
        height: '90vh'
    },
    search: {
        [theme.breakpoints.up('md')]: {
            width: 600
        },
        [theme.breakpoints.down('sm')]: {
            width: 300
        }
    }
}))(({ classes }) => (
    <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.grid}
    >
        <div className={classes.search}>
            <SearchBar />
        </div>
    </Grid>
))
