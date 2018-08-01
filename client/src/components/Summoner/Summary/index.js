import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Typography } from '@material-ui/core'

export default withStyles(theme => ({
    main: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 60
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: 300
        },
        marginRight: 60,
        marginTop: 60,
        display: 'flex'
    },
    profile: {
        marginRight: 30
    },
    Avatar: {
        width: 150,
        height: 150
    }
}))(({
    classes,
    summoner,
    positions,
    championMasteries,
    matchlist,
    matches,
    staticData
}) => {
    const { name, profileIconId, summonerLevel } = summoner
    const { tier, rank } = positions
    const { version } = staticData
    console.log(summoner, positions, championMasteries, matchlist, matches)
    return (
        <div className={classes.main}>
            <div className={classes.profile}>
                {version && profileIconId && (
                    <Avatar
                        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
                        alt=""
                        className={classes.Avatar}
                    />
                )}
            </div>
            <section className={classes.container}>
                {name && <Typography variant='display1'>{name}</Typography>}
                {summonerLevel && (
                    <Typography variant='subheading'>
                        Level: {summonerLevel}
                    </Typography>
                )}
                {tier && rank && (
                    <Typography variant='subheading'>
                        {`${tier} ${rank}`}
                    </Typography>
                )}
            </section>
        </div>
    )
})
