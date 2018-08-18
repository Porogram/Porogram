import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Matches from './Matches'

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
        <Matches />
    </Grid>
))
