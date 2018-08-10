import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Avatar,
    Typography,
    Paper,
    Grid,
    CircularProgress
} from '@material-ui/core'
import { StaticDataContext, SummonerDataContext } from '../../Context'

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
    },
    circularProgress: {
        height: '80vh'
    },
// }))(({
//     classes,
//     summoner,
//     positions,
//     championMasteries,
//     matchlist,
//     matches,
//     staticData
// }) => {
//     const { name, profileIconId, summonerLevel } = summoner
//     const { tier, rank, leaguePoints, wins, losses } = positions
//     const { version, champions } = staticData
//     const baseUrl = 'https://ddragon.leagueoflegends.com/'
//     const champion = Object.values(champions).find(champion =>
//         matchlist.matches[0].champion === parseInt(champion.key, 10)).id
//     const background = {backgroundImage: `url(${baseUrl}cdn/img/champion/splash/${champion}_0.jpg)`}
//     return (
//         <div className={classes.main} style={background}>
//             {name && <Typography variant='display3' align='center' className={classes.summonerName}>{name}</Typography>}
//             <div className={classes.info}>
//                 {version && profileIconId && (
//                     <Avatar
//                         src={`${baseUrl}cdn/${version}/img/profileicon/${profileIconId}.png`}
//                         alt=""
//                         className={classes.Avatar}
//                     />
//                 )}
//                 <Paper className={classes.infoPage} elevation={20}>
//                     {summonerLevel && (
//                         <Typography variant='subheading'>
//                             Level: {summonerLevel}
//                         </Typography>
//                     )}
//                     {tier && rank && (
//                         <Typography variant='subheading'>
//                             {`${tier} ${rank}`}
//                         </Typography>
//                     )}
//                     <Typography variant='subheading'>
//                         {`LP: ${leaguePoints}`}
//                     </Typography>
//                     {wins && losses && (
//                         <Typography variant='subheading'>
//                             {`W${wins} : L${losses}`}
//                         </Typography>
//                     )}
//                 </Paper>
//             </div>
//         </div>
//     )
// })
}))(class extends Component {
    componentDidMount() {
        this.props.getSummonerData(this.props.summonerName)
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
                        {!fetchedData && (
                            <Grid
                                container
                                alignItems="center"
                                justify="center"
                                className={classes.circularProgress}
                            >
                                <CircularProgress />
                            </Grid>
                        )}
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
                                }}
                            </StaticDataContext.Consumer>
                        )}
                    </Fragment>
                )}
            </SummonerDataContext.Consumer>
        )
    }
})
