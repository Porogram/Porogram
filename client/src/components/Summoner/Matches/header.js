import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, CardHeader, Typography, Grid } from '@material-ui/core'
// import Empty from './empty'

export default withStyles((theme) => ({
    dateTime: {
        marginTop: theme.spacing.unit * 2
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
    let date = `${n.getMonth()}/${n.getDate()}/${n.getFullYear()}`
    let time = `${n.getHours()}:${n.getMinutes()} ${n.getTimezoneOffset()}`
    return (
        <Fragment>
            <CardHeader
                avatar={
                    <Avatar
                        src={`${baseUrl}cdn/${version}/img/profileicon/${profileIconId}.png`}
                        alt=""
                    />
                }
                title={name}
                subheader={`${tier} ${rank}`}
                action={
                    <Grid container direction="column" className={classes.dateTime}>
                        <Grid item>
                            <Typography variant="caption">{date}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="caption">{time}</Typography>
                        </Grid>
                    </Grid>
                }

            >
            </CardHeader>
        </Fragment>
    )
})
