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
    if (elapsedTime < 60) {
        return `${elapsedTime} SECONDS AGO`
    } else if (elapsedTime < 3600) {
        return `${Math.round(elapsedTime / 60)} MINUTES AGO`
    } else if (elapsedTime < 86400) {
        return `${Math.round(elapsedTime / 3600)} HOURS AGO`
    } else if (elapsedTime < 604800){
        return `${Math.round(elapsedTime / 86400)} DAYS AGO`
    } else if (elapsedTime < 2628000){
        return `${Math.round(elapsedTime / 604800)} WEEKS AGO`
    } else if (elapsedTime < 31540000) {
        return `${Math.round(elapsedTime / 2628000)} MONTHS AGO`
    } else {
        return `${Math.round(elapsedTime / 31540000)} YEARS AGO`
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
    match: { champion, queue, timestamp },
    summoner: { name, profileIconId }
}) => {
    return (
        <StaticDataContext.Consumer>
            {({ baseUrl, queues, state: { champions, version } }) => (
                <Card>
                    <CardHeader
                        avatar={(
                            <Avatar
                                src={`${baseUrl}/cdn/${version}/img/profileicon/${profileIconId}.png`}
                                alt=""
                            />
                        )}
                        className={classes.header}
                        subheader={`${queues[queue]}`}
                        title={(
                            <Typography variant="headline">
                                {name}
                            </Typography>
                        )}
                    />
                    <CardMedia
                        className={classes.media}
                        image={`${baseUrl}/cdn/img/champion/splash/${champions[champion].id}_0.jpg`}
                    />
                    <CardContent>
                        <Typography variant="caption">
                            {getElapsedTime(timestamp)}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </StaticDataContext.Consumer>
    )
})
