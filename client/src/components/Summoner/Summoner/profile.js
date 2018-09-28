import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'
import { Consumer } from '../../context'
import ChampionMastery from './championMastery'
import Ranked from './ranked'
import Recent from './recent'

export default withStyles(theme => ({
    avatar: {
        [theme.breakpoints.up('sm')] : {
            width: theme.spacing.unit * 18,
            height: theme.spacing.unit * 18,
            marginBottom: -theme.spacing.unit * 8,
            marginLeft: '-40vw',
            border: '3px solid #fff'
        },
        [theme.breakpoints.down('sm')] : {
            width: theme.spacing.unit * 18,
            height: theme.spacing.unit * 18,
            marginBottom: -theme.spacing.unit * 8,
            border: '3px solid #fff'
        }

    },
    info: {
        paddingTop: theme.spacing.unit * 20
    },
    infoPage: {
        borderRadius: 0,
        paddingTop: theme.spacing.unit * 12,
        padding: theme.spacing.unit * 8
    },
    main: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '100vh'
    },
    summonerName: {
        paddingTop: theme.spacing.unit * 8,
        marginBottom: -theme.spacing.unit * 25,
        color: '#fff'
    }
}))(({ classes }) => (
    <Consumer>
        {({
            baseUrl,
            state: {
                champions,
                summoner: { name, profileIconId, summonerLevel },
                positions,
                championMasteries,
                matchlist,
                matches,
                version
            }
        }) => (
            <div
                className={classes.main}
                style={{
                    backgroundImage: (
                        `url(${baseUrl}/cdn/img/champion/splash/${champions[matchlist.matches[0].champion].id}_0.jpg)`
                    )
                }}
            >
                <Typography
                    variant='display3'
                    align='center'
                    className={classes.summonerName}
                >
                    {name}
                </Typography>
                <Grid className={classes.info} container direction="column" alignItems="center" justify="center">
                    <Grid item>
                        <Avatar
                            src={`${baseUrl}/cdn/${version}/img/profileicon/${profileIconId}.png`}
                            alt=""
                            className={classes.avatar}
                        />
                    </Grid>
                    <Grid item>
                        <Paper className={classes.infoPage} elevation={20}>
                            <Grid container direction="row" justify="space-between">
                                <ChampionMastery
                                    championMasteries={championMasteries}
                                    champions={champions}
                                />

                                {positions.map(position =>
                                    <Ranked
                                        key={position.queueType}
                                        positions={position}
                                    />
                                )}
                                <Recent
                                    matches={matches}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )}
    </Consumer>
))
