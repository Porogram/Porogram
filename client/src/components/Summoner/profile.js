import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Paper, Typography } from '@material-ui/core'
import { StaticDataContext, SummonerDataContext } from '../Context'
import Loading from '../Layout/loading'

export default withStyles(theme => ({
    avatar: {
        width: theme.spacing.unit * 18,
        height: theme.spacing.unit * 18,
        marginBottom: -theme.spacing.unit * 8,
        marginLeft: theme.spacing.unit * 3,
        border: '3px solid #fff'
    },
    circularProgress: {
        height: '80vh'
    },
    info: {
        paddingTop: theme.spacing.unit * 20,
    },
    infoPage: {
        borderRadius: 0,
        height: '100vh',
        padding: theme.spacing.unit * 8
    },
    main: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
    },
    summonerName: {
        paddingTop: theme.spacing.unit * 8,
        marginBottom: -theme.spacing.unit * 25,
        color: '#fff'
    }
}))(class extends Component {
    componentDidMount() {
        const { summonerName, getSummonerData } = this.props
        getSummonerData(summonerName)
    }
    render() {
        const { classes } = this.props
        return (
            <SummonerDataContext.Consumer>
                {({
                    state: {
                        fetchedData,
                        summoner,
                        positions,
                        championMasteries,
                        matchlist,
                        matches
                    }
                }) => (
                    <Fragment>
                        {!fetchedData && <Loading />}
                        {fetchedData && (
                            <StaticDataContext.Consumer>
                                {({ state: { version, champions }, baseUrl }) => {
                                    const { name, profileIconId, summonerLevel } = summoner
                                    const { tier, rank, leaguePoints, wins, losses } = positions
                                    const champion = Object.values(champions).find(champion =>
                                        matchlist.matches[0].champion === parseInt(champion.key, 10)).id
                                    const background = {backgroundImage: `url(${baseUrl}/cdn/img/champion/splash/${champion}_0.jpg)`}
                                    return (
                                        <div className={classes.main} style={background}>
                                            {name && <Typography variant='display3' align='center' className={classes.summonerName}>{name}</Typography>}
                                            <div className={classes.info}>
                                                {version && profileIconId && (
                                                    <Avatar
                                                        src={`${baseUrl}/cdn/${version}/img/profileicon/${profileIconId}.png`}
                                                        alt=""
                                                        className={classes.avatar}
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
                                }}
                            </StaticDataContext.Consumer>
                        )}
                    </Fragment>
                )}
            </SummonerDataContext.Consumer>
        )
    }
})
