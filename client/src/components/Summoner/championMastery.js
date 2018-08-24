import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'
import { StaticDataContext } from '../Context'
import five from '../../images/champion-mastery/5.png'
import six from '../../images/champion-mastery/6.png'
import seven from '../../images/champion-mastery/7.png'

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
    championMasteries,
    champions,
    classes
}) => {
    const getMasteryImage = mastery => {
        if (mastery === '7') {
            return <Avatar src={seven}/>
        } else if (mastery === '6') {
            return <Avatar src={six}/>
        }
    }
    return (
        <StaticDataContext.Consumer>
            {({ state: { version, champions }, baseUrl }) => (
                <Fragment>
                <Paper className={classes.paper}>
                    <Typography variant="headline" className={classes.title}>Champion Mastery</Typography>
                    <Grid container direction="column">
                        {[...Array(5).keys()].map(i => (
                            <Grid item key={i} >
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Grid item>
                                        {getMasteryImage(`${championMasteries[i].championLevel}`)}
                                    </Grid>
                                    <Grid item>
                                        {championMasteries[i].championId ? (
                                            <Typography variant="subheading">{champions[championMasteries[i].championId].id}</Typography>
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
        )}
    </StaticDataContext.Consumer>
)})
