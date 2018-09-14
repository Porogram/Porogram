import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid } from '@material-ui/core'
import { StaticDataContext } from '../../Context'

export default withStyles((theme) => ({
    title: {
        textAlign: 'center',
        paddingBottom: 10
    },
    paper: {
        minWidth: theme.spacing.unit * 40,
        maxWidth: theme.spacing.unit * 40,
        padding: theme.spacing.unit * 5
    }
}))(({
    matches,
    classes
}) => {
    function mode(arr){
        return arr.sort((a,b) =>
              arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }
    let data = {
        champion: [],
        lane: [],
        queue: []
    }
    matches.map(match => {
        data.champion.push(match.champion)
        data.lane.push(match.lane)
        data.queue.push(match.queue)
    })
    const mostPlayed = {
        champ: mode(data.champion)
        lane: mode(data.lane)
        queue: mode(data.queue)
    }

    return (
        <StaticDataContext.Consumer>
            {({ state: { version, champions }, baseUrl }) => (
                <Fragment>
                <Paper className={classes.paper}>
                    <Typography variant="headline" className={classes.title}>Recent Stats</Typography>
                    <Grid container direction="column" justify="space-between" spacing={8}>
                        <Grid item>

                        </Grid>
                    </Grid>
                </Paper>
            </Fragment>
        )}
    </StaticDataContext.Consumer>
)})
