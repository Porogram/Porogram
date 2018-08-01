import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Typography } from '@material-ui/core'

export default withStyles(theme => ({
    main: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 240
        },
        display: 'flex',
    },
    image: {
        position: 'relative',
        width: '100%'
    },
    content: {
        position: 'absolute',

    },
    profile: {
        marginRight: 30,
    },
    Avatar: {
        width: 150,
        height: 150
    },
    section: {
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
    const { tier, rank, leaguePoints, wins, losses } = positions
    const { version, champions } = staticData
    console.log(summoner, positions, championMasteries, matchlist, matches)
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    const champion = Object.values(champions).find(champion =>
        matchlist.matches[0].champion === parseInt(champion.key, 10)).id
    console.log('champion', champion)
    return (
        <div className={classes.main}>
            <div className={classes.image}>
                <img
                    src={`${baseUrl}cdn/img/champion/splash/${champion}_0.jpg`}
                    alt=""
                />
            </div>
            <div className={classes.content}>
                <div className={classes.profile}>
                    {version && profileIconId && (
                        <Avatar
                            src={`${baseUrl}cdn/${version}/img/profileicon/${profileIconId}.png`}
                            alt=""
                            className={classes.Avatar}
                        />
                    )}
                </div>
                <section className={classes.section}>
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
                    <Typography variant='subheading'>
                        {`LP: ${leaguePoints}`}
                    </Typography>
                    {wins && losses && (
                        <Typography variant='subheading'>
                            {`W${wins} : L${losses}`}
                        </Typography>
                    )}
                </section>
            </div>
        </div>
    )
})
