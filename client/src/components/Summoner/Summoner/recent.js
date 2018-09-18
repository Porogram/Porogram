import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid, Avatar } from '@material-ui/core'
import { Consumer } from '../../context'
import top from '../../../images/lane/top.png'
import mid from '../../../images/lane/mid.png'
import bot from '../../../images/lane/bot.png'
import jungle from '../../../images/lane/jungle.png'

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
    matches.forEach(match => {
        data.champion.push(match.champion)
        data.lane.push(match.lane)
        data.queue.push(match.queue)
    })


    return (
        <Consumer>
            {({ state: { version, champions }, baseUrl }) => {
                console.log(data.lane)
                const mostPlayed = [
                    `${baseUrl}/cdn/${version}/img/champion/${champions[mode(data.champion)].image.full}`,
                    mode(data.lane),
                    mode(data.queue)
                ]
            return (
                <Fragment>
                <Paper className={classes.paper}>
                    <Typography variant="headline" className={classes.title}>Recent Stats</Typography>
                    <Grid container direction="column" justify="space-between" spacing={8}>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography variant="subheading">
                                    Most Played Champ:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subheading">
                                    <Avatar
                                        src={`${mostPlayed[0]}`}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subheading">
                                    Most Played Champ:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subheading">
                                    <Avatar
                                        src={`${mostPlayed[1]}`}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subheading">
                                    Most Played Champ:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subheading">
                                    <Avatar
                                        src={`${baseUrl}/cdn/${version}/img/champion/${champions[mode(data.champion)].image.full}`}
                                    />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Fragment>
        )}
        }
    </Consumer>
)})
