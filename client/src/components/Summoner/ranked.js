import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'
import { StaticDataContext } from '../Context'

export default withStyles((theme) => ({
    title: {
        textAlign: 'center',
        paddingBottom: 10
    },
    paper: {
        width: theme.spacing.unit * 40,
        padding: theme.spacing.unit * 5
    }
}))(({
    classes
    }) => (
        <StaticDataContext.Consumer>
            {({ state: { version, champions }, baseUrl }) => (
                <Fragment>
                <Paper className={classes.paper}>
                    <Typography variant="headline" className={classes.title}>Ranked Stats</Typography>
                    <Grid container direction="column">

                    </Grid>
                </Paper>
            </Fragment>
        )}
    </StaticDataContext.Consumer>
))
