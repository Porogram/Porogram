import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from '@material-ui/core'
import { StaticDataContext } from '../../../Context'

const getElapsedTime = gameCreation => {
    const elapsedTime = Math.round((new Date() - gameCreation) / 1000)
    console.log(elapsedTime)
    if (elapsedTime < 60) {
        console.log(`${elapsedTime} SECONDS AGO`)
    } else if (elapsedTime < 3600) {
        console.log(`${Math.round(elapsedTime / 60)} MINUTES AGO`)
    } else if (elapsedTime < 86400) {
        console.log(`${Math.round(elapsedTime / 3600)} HOURS AGO`)
    } else if (elapsedTime < 604800){
        console.log(`${Math.round(elapsedTime / 86400)} DAYS AGO`)
    } else {
        console.log(`${Math.round(elapsedTime / 604800)} WEEKS AGO`)
    }
}

export default withStyles((theme) => ({
    header: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
}))(({
    classes,
    match: { gameCreation, participantIdentities, participants },
    summoner: { accountId, name, profileIconId, summonerLevel },
}) => {
    const summonerIndex = participantIdentities.findIndex(participant =>
        participant.player.accountId === accountId
    )
    return (
        <StaticDataContext.Consumer>
            {({ baseUrl, state: { champions, version } }) => (
                <Card
                    style={participants[summonerIndex].stats.win
                        ? {
                            'backgroundColor': '#0A7FD9',
                            'marginBottom': '50px'
                        } : {
                            'backgroundColor': '#B63015',
                            'marginBottom': '50px'
                        }
                    }
                >
                    <CardHeader
                        avatar={(
                            <Avatar
                                src={`${baseUrl}/cdn/${version}/img/profileicon/${profileIconId}.png`}
                                alt=""
                            />
                        )}
                        className={classes.header}
                        subheader={`Level ${summonerLevel}`}
                        title={(
                            <Typography variant="headline">
                                {name}
                            </Typography>
                        )}
                    />
                    <CardMedia
                        className={classes.media}
                        image={`${baseUrl}/cdn/img/champion/splash/${champions[participants[summonerIndex].championId].id}_0.jpg`}
                    />
                    <CardContent>
                        <Typography variant="headline">
                            CARD CONTENT
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </StaticDataContext.Consumer>
    )
})
