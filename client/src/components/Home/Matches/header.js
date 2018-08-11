import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, CardHeader, Typography, Grid } from '@material-ui/core'

export default withStyles((theme) => ({
    dateTime: {
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 1
    },
    CardHeader: {
        padding: '8px 20px'
    }
}))(({
    summoner: { name, profileIconId },
    positions: { tier, rank },
    version,
    classes,
    gameCreation
}) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    const n = new Date(gameCreation)
    let date = n.toDateString()
    let time = n.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    return (
        <Fragment>
            <CardHeader
                avatar={
                    <Avatar
                        src={`${baseUrl}cdn/${version}/img/profileicon/${profileIconId}.png`}
                        alt=""
                    />
                }
                title={
                    <Typography variant="headline">{name}</Typography>
                }
                subheader={`${tier} ${rank}`}
                action={
                    <Grid container direction="column" className={classes.dateTime}>
                        <Grid item>
                            <Typography variant="body1">{date}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">{time}</Typography>
                        </Grid>
                    </Grid>
                }
                className={classes.CardHeader}

            >
            </CardHeader>
        </Fragment>
    )
})
