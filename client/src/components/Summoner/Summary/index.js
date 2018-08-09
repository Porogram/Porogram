import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Typography, Paper } from '@material-ui/core'

export default withStyles(theme => ({
    main: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
    },
    summonerName: {
        paddingTop: theme.spacing.unit * 8,
        marginBottom: -theme.spacing.unit * 25,
        color: '#fff'
    },

    Avatar: {
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
    const baseUrl = 'https://ddragon.leagueoflegends.com/'
    const champion = Object.values(champions).find(champion =>
        matchlist.matches[0].champion === parseInt(champion.key, 10)).id
    const background = {backgroundImage: `url(${baseUrl}cdn/img/champion/splash/${champion}_0.jpg)`}
    return (
        <div className={classes.main} style={background}>
            {name && <Typography variant='display3' align='center' className={classes.summonerName}>{name}</Typography>}
            <div className={classes.info}>
                {version && profileIconId && (
                    <Avatar
                        src={`${baseUrl}cdn/${version}/img/profileicon/${profileIconId}.png`}
                        alt=""
                        className={classes.Avatar}
                    />
                )}
                <Paper className={classes.infoPage} elevation={20}>
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
                </Paper>
            </div>
        </div>
    )
})
