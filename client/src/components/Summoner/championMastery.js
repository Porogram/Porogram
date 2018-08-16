import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'
// import Empty from './empty'

export default withStyles((theme) => ({
    title: {
        textAlign: 'center'
    },
    paper: {
        width: theme.spacing.unit * 40,
        padding: theme.spacing.unit * 3
    }
}))(({
    championMasteries,
    champions,
    classes
}) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    function getChampion(){

    }
    return (
        <Fragment>
            <Paper className={classes.paper}>
                <Typography variant="headline" className={classes.title}>Champion Mastery</Typography>
                <Grid container direction="column">
                    {[...Array(5).keys()].map(i => (
                        <Grid item key={i} >
                            <Grid container direction="row" justify="space-between">
                                <Grid item>
                                    {championMasteries[i].championLevel ? (
                                        <Typography variant="subheading">{championMasteries[i].championLevel}</Typography>
                                    ) : (<Typography variant="subheading">No champion</Typography>)}
                                </Grid>
                                <Grid item>
                                    {championMasteries[i].championId ? (
                                        <Typography variant="subheading">{championMasteries[i].championId}</Typography>
                                    ) : (<Typography variant="subheading">No champion</Typography>)}
                                </Grid>
                                <Grid item>
                                    {championMasteries[i].championPoints ? (
                                        <Typography variant="subheading">{championMasteries[i].championPoints}</Typography>
                                    ) : (<Typography variant="subheading">No champion</Typography>)}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Fragment>
    )
})
