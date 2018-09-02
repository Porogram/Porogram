import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Avatar,
    CircularProgress,
    Dialog,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core'

export default withStyles(theme => ({
    champion: {
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing.unit * 4,
            width: theme.spacing.unit * 4
        },
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing.unit * 5,
            width: theme.spacing.unit * 5
        },
        marginRight: theme.spacing.unit * 0.5
    },
    item: {
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing.unit * 2,
            width: theme.spacing.unit * 2
        },
        [theme.breakpoints.up('sm')]: {
            height: theme.spacing.unit * 3,
            width: theme.spacing.unit * 3
        }
    },
    name: {
        textDecoration: 'none'
    },
    participants: {
        margin: theme.spacing.unit
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing.unit
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing.unit * 2
        },
        paddingBottom: 0,
        textAlign: 'center'
    }
}))(class extends Component {
    state = {
        match: {},
        summonerIndex: -1
    }
    componentDidMount() {
        const { accountId, getMatch, matchId } = this.props
        getMatch(matchId)
            .then(match =>
                this.setState({
                    match,
                    summonerIndex:
                        match.participantIdentities.findIndex(participant =>
                            participant.player.accountId === accountId
                        )
                })
            )
    }
    handleClose = () => {
        this.props.close()
    }
    render() {
        const { baseUrl, champions, classes, items, open, version } = this.props
        const {
            match,
            match: { participantIdentities, participants },
            summonerIndex
        } = this.state
        console.log(match)
        return (
            <Dialog onClose={this.handleClose} open={open}>
                {'gameId' in match ? (
                    <Fragment>
                        <DialogTitle className={classes.title}>
                            {match.participants[summonerIndex].stats.win
                            ? 'VICTORY' : 'DEFEAT'}
                        </DialogTitle>
                        <Grid
                            className={classes.participants}
                            container
                            direction="column"
                            spacing={8}
                        >
                            {[...Array(10).keys()].map(i => (
                                <Grid
                                    alignItems="center"
                                    container
                                    item
                                    key={participantIdentities[i].participantId}
                                >
                                    {(i === 0 || i === 5) && (
                                        <Grid item xs={12}>
                                            <Typography>
                                                {`TEAM ${i ? '2' : '1'}`}
                                            </Typography>
                                        </Grid>
                                    )}
                                    <Grid item xs={2}>
                                        <Avatar
                                            className={classes.champion}
                                            src={`${baseUrl}/cdn/${version}/img/champion/${champions[participants[i].championId].image.full}`}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Link
                                            className={classes.name}
                                            to={`/${participantIdentities[i].player.summonerName}`}
                                        >
                                            <Typography noWrap>
                                                {participantIdentities[i].player.summonerName}
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid container item xs={6}>
                                        {[...Array(7).keys()].map(j => (
                                            <Grid item key={j}>
                                                {items[participants[i].stats[`item${j}`]]
                                                && (
                                                    <img
                                                        alt=""
                                                        className={classes.item}
                                                        src={`${baseUrl}/cdn/${version}/img/item/${items[participants[i].stats[`item${j}`]].image.full}`}
                                                    />
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Fragment>
                ) : <CircularProgress />}
            </Dialog>
        )
    }
})
