import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography } from '@material-ui/core'
import { StaticDataContext, SummonerDataContext } from '../Context'

export default withStyles(theme => ({
    avatar: {
        width: theme.spacing.unit * 18,
        height: theme.spacing.unit * 18,
        marginBottom: -theme.spacing.unit * 8,
        marginLeft: theme.spacing.unit * 3,
        border: '3px solid #fff'
    },
    info: {
        paddingTop: theme.spacing.unit * 20,
    },
    infoPage: {
        borderRadius: 0,
        height: '100vh',
        padding: theme.spacing.unit * 8
    },
    main: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
    },
    summonerName: {
        paddingTop: theme.spacing.unit * 8,
        marginBottom: -theme.spacing.unit * 25,
        color: '#fff'
    }
}))(({ classes }) => (
    <SummonerDataContext.Consumer>
        {({
            state: {
                summoner: { name, profileIconId, summonerLevel },
                positions,
                championMasteries,
                matchlist,
                matches
            }
        }) => (
            <StaticDataContext.Consumer>
                {({ state: { version, champions }, baseUrl }) => (
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
                        <div className={classes.info}>
                            <Avatar
                                src={`${baseUrl}/cdn/${version}/img/profileicon/${profileIconId}.png`}
                                alt=""
                                className={classes.avatar}
                            />
                            <Paper className={classes.infoPage} elevation={20}>
                                <Typography variant='subheading'>
                                    Summoner info
                                </Typography>
                            </Paper>
                        </div>
                    </div>
                )}
            </StaticDataContext.Consumer>
        )}
    </SummonerDataContext.Consumer>
))
