import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    CircularProgress,
    Dialog,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core'

export default withStyles(theme => ({
    name: {
        textDecoration: 'none'
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
        const { classes, open } = this.props
        const { match, summonerIndex } = this.state
        console.log(match)
        return (
            <Dialog onClose={this.handleClose} open={open}>
                {'gameId' in match ? (
                    <Fragment>
                        <DialogTitle>
                            {match.participants[summonerIndex].stats.win
                            ? 'VICTORY' : 'DEFEAT'}
                        </DialogTitle>
                        <Grid container direction="column">
                            {match.participantIdentities.map(participant => (
                                <Grid item key={participant.participantId}>
                                    <Link
                                        className={classes.name}
                                        to={`/${participant.player.summonerName}`}
                                    >
                                        <Typography>
                                            {participant.player.summonerName}
                                        </Typography>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Fragment>
                ) : <CircularProgress />}
            </Dialog>
        )
    }
})
