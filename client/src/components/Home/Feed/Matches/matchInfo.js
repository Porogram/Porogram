import React, { Component } from 'react'
import { CircularProgress, Dialog, DialogTitle } from '@material-ui/core'

export default class extends Component {
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
        const { open } = this.props
        const { match, summonerIndex } = this.state
        console.log(match)
        return (
            <Dialog onClose={this.handleClose} open={open}>
                {'gameId' in match ? (
                    <DialogTitle>
                        {match.participants[summonerIndex].stats.win
                        ? 'VICTORY' : 'DEFEAT'}
                    </DialogTitle>
                ) : <CircularProgress />}
            </Dialog>
        )
    }
}
