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
    match: { participantIdentities, participants },
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
