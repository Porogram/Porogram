import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CardMedia } from '@material-ui/core'
// import Empty from './empty'

export default withStyles(() => ({
    splash: {
        width: '100%',
        height: '100%'
    }
}))(({
    version,
    classes,
    matchlist,
    champions,
    summonerIndex,
    participants
}) => {
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    const champion = participants[summonerIndex].champion

    return (
        <Fragment>
            <CardMedia>
                <img
                    src={`${baseUrl}cdn/img/champion/splash/${champion}_0.jpg`}
                    className={classes.splash}
                    alt=""
                />
            </CardMedia>
        </Fragment>
    )
})
