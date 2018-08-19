import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'

export default withStyles(theme => ({
    grid: {
        [theme.breakpoints.down('sm')]: {
            height: `calc(100vh - 56px)`
        },
        [theme.breakpoints.up('sm')]: {
            height: `calc(100vh - 64px)`
        }
    }
}))(({ classes }) => (
    <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.grid}
    >
        <CircularProgress />
    </Grid>
))
