import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid } from '@material-ui/core'
import Challenger from '../../../images/tier/challenger.png'
import Master from '../../../images/tier/master.png'
import Diamond from '../../../images/tier/diamond.png'
import Platinum from '../../../images/tier/platinum.png'
import Gold from '../../../images/tier/gold.png'
import Silver from '../../../images/tier/silver.png'
import Bronze from '../../../images/tier/bronze.png'
import Provisional from '../../../images/tier/provisional.png'
import Unranked from '../../../images/tier/unranked.png'

const getTierImage = tier => {
    if (tier === 'CHALLENGER') return <img src={Challenger} alt="" />
    else if (tier === 'MASTER') return <img src={Master} alt="" />
    else if (tier === 'DIAMOND') return <img src={Diamond} alt="" />
    else if (tier === 'PLATINUM') return <img src={Platinum} alt="" />
    else if (tier === 'GOLD') return <img src={Gold} alt="" />
    else if (tier === 'SILVER') return <img src={Silver} alt="" />
    else if (tier === 'BRONZE') return <img src={Bronze} alt="" />
    else if (tier === 'PROVISIONAL') return <img src={Provisional} alt="" />
    else return <img src={Unranked} alt="" />
}
const getQueueType = queue => {
    if (queue === 'RANKED_SOLO_5x5') return 'Ranked Solo 5v5'
    else if (queue === 'RANKED_SOLO_3x3') return 'Ranked Solo 3v3'
    else if (queue === 'RANKED_FLEX_SR') return 'Ranked Flex 5v5'
    else if (queue === 'RANKED_FLEX_3x3') return 'Ranked Flex 3v3'
}

export default withStyles((theme) => ({
    title: {
        textAlign: 'center',
        paddingBottom: 10
    },
    paper: {
        minWidth: theme.spacing.unit * 40,
        maxWidth: theme.spacing.unit * 40,
        padding: theme.spacing.unit * 5
    },
}))(({
    positions,
    classes
}) => (
    <Fragment>
        <Paper className={classes.paper}>
            <Typography variant="headline" className={classes.title}>
                {getQueueType(positions.queueType)}
            </Typography>
            {positions ? (
                <Grid
                    alignItems="center"
                    container
                    direction="column"
                    justify="space-between"
                    spacing={0}
                >
                    <Grid item>
                        {getTierImage(`${positions.tier}`)}
                    </Grid>
                    <Grid item>
                        <Typography variant="subheading">
                            {positions.tier} {positions.rank}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subheading">
                            {positions.leaguePoints} LP
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            spacing={40}
                        >
                            <Grid item>
                                <Grid
                                    alignItems="center"
                                    container
                                    direction="column"
                                >
                                    <Grid item>
                                        <Typography variant="subheading">
                                            Wins
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subheading">
                                            {positions.wins}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid
                                    alignItems="center"
                                    container
                                    direction="column"
                                >
                                    <Grid item>
                                        <Typography variant="subheading">
                                            Losses
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subheading">
                                            {positions.losses}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        {getTierImage('unranked')}
                    </Grid>
                    <Grid item>
                        <Typography variant="subheading">
                            Unranked
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </Paper>
    </Fragment>
))
