import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, CardHeader, Typography, Grid } from '@material-ui/core'
import { StaticDataContext, SummonerDataContext } from '../../Context'

export default withStyles((theme) => ({
    dateTime: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1
    },
    cardHeader: {
        padding: '8px 20px'
    }
}))(({ classes, gameCreation }) => {
    const n = new Date(gameCreation)
    let date = n.toDateString()
    let time = n.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    return (
        <StaticDataContext.Consumer>
            {({ baseUrl, state: { version } }) => (
                <SummonerDataContext.Consumer>
                    {({
                        state: {
                            summoner: { name, profileIconId },
                            positions: { tier, rank }
                        }
                    }) => (
                        <CardHeader
                            avatar={(
                                <Avatar
                                    src={`${baseUrl}/cdn/${version}/img/profileicon/${profileIconId}.png`}
                                    alt=""
                                />
                            )}
                            title={(
                                <Typography variant="headline">
                                    {name}
                                </Typography>
                            )}
                            subheader={`${tier} ${rank}`}
                            action={(
                                <Grid
                                    container
                                    direction="column"
                                    className={classes.dateTime}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            {date}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">
                                            {time}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                            className={classes.cardHeader}
                        >
                        </CardHeader>
                    )}
                </SummonerDataContext.Consumer>
            )}
        </StaticDataContext.Consumer>
    )
})
