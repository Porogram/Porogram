import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Avatar,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
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
        getMatch(matchId).then(match =>
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
            match: { participantIdentities, participants, teams },
            summonerIndex
        } = this.state
        console.log(match)
        // make each list item into its own component
        return (
            <Dialog onClose={this.handleClose} open={open}>
                {'gameId' in match ? (
                    <Fragment>
                        <DialogTitle className={classes.title}>
                            {match.participants[summonerIndex].stats.win
                            ? 'VICTORY' : 'DEFEAT'}
                        </DialogTitle>
                        <DialogContent>
                            {teams.map((team, i) => (
                                <Fragment key={team.teamId}>
                                    <DialogContentText>
                                        {`TEAM ${i + 1}`}
                                    </DialogContentText>
                                    <List>
                                        {participants.slice(
                                            i * (participants.length / 2),
                                            (i + 1) * (participants.length / 2)
                                        ).map(participant => (
                                            <ListItem
                                                button
                                                key={participant.participantId}
                                            >
                                                <Grid
                                                    alignItems="center"
                                                    container
                                                >
                                                    <Grid item xs={2}>
                                                        <Avatar
                                                            className={classes.champion}
                                                            src={`${baseUrl}/cdn/${version}/img/champion/${champions[participant.championId].image.full}`}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Link
                                                            className={classes.name}
                                                            to={`/${participantIdentities[participant.participantId - 1].player.summonerName}`}
                                                        >
                                                            <Typography noWrap>
                                                                {participantIdentities[participant.participantId - 1].player.summonerName}
                                                            </Typography>
                                                        </Link>
                                                    </Grid>
                                                    <Grid container item xs={6}>
                                                        {[...Array(7).keys()].map(j => (
                                                            <Grid item key={j}>
                                                                {items[participant.stats[`item${j}`]]
                                                                && (
                                                                    <img
                                                                        alt=""
                                                                        className={classes.item}
                                                                        src={`${baseUrl}/cdn/${version}/img/item/${items[participant.stats[`item${j}`]].image.full}`}
                                                                    />
                                                                )}
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Fragment>
                            ))}
                        </DialogContent>
                    </Fragment>
                ) : <CircularProgress />}
            </Dialog>
        )
    }
})
