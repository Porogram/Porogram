import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'
import { StaticDataContext } from '../Context'
import four from '../../images/champion-mastery/champion-master-4.png'
import five from '../../images/champion-mastery/champion-master-5.png'
import six from '../../images/champion-mastery/champion-master-6.png'
import seven from '../../images/champion-mastery/champion-master-7.png'

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
        } else if (mastery === '5') {
            return <Avatar src={five}/>
        } else if (mastery === '4') {
            return <Avatar src={four}/>
        }
    }
    return (
        <StaticDataContext.Consumer>
            {({ state: { version, champions }, baseUrl }) => (
                <Fragment>
                <Paper className={classes.paper}>
                    <Typography variant="headline" className={classes.title}>Champion Mastery</Typography>
                    <Grid container direction="column" justify="space-between" spacing={8}>
                        {championMasteries.slice(0,5).map(championMastery => (
                            <Grid item key={championMastery.championId}>
                                {(championMastery.championLevel > 3) ?
                                    <Grid container direction="row" justify="space-between" alignItems="center" spacing={32}>
                                        <Grid item xs={2}>
                                            {getMasteryImage(`${championMastery.championLevel}`)}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Avatar src={`${baseUrl}/cdn/${version}/img/champion/${champions[championMastery.championId].image.full}`}/>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="subheading">{champions[championMastery.championId].name}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="subheading">{championMastery.championPoints}</Typography>
                                        </Grid>
                                    </Grid>
                                :(<Fragment/>)}
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Fragment>
        )}
    </StaticDataContext.Consumer>
)})
