import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List
} from '@material-ui/core'
import Participant from './participant'

export default withStyles(theme => ({
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
        const { classes, open } = this.props
        const {
            match,
            match: { participantIdentities, participants, teams },
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
                                            <Participant
                                                key={participant.participantId}
                                                participant={participant}
                                                participantIdentity={participantIdentities[participant.participantId - 1]}
                                            />
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
