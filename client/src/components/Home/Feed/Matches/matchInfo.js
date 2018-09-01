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
        const { baseUrl, champions, classes, open, version } = this.props
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
                        <DialogTitle>
                            {match.participants[summonerIndex].stats.win
                            ? 'VICTORY' : 'DEFEAT'}
                        </DialogTitle>
                        <Grid container direction="column" spacing={8}>
                            {[...Array(10).keys()].map(i => (
                                <Grid
                                    alignItems="center"
                                    container
                                    item
                                    key={participantIdentities[i].participantId}
                                >
                                    {i === 0 && (
                                        <Grid item xs={12}>
                                            <Typography>TEAM 1</Typography>
                                        </Grid>
                                    )}
                                    {i === 5 && (
                                        <Grid item xs={12}>
                                            <Typography>TEAM 2</Typography>
                                        </Grid>
                                    )}
                                    <Grid item>
                                        <Avatar
                                            src={`${baseUrl}/cdn/${version}/img/champion/${champions[participants[i].championId].image.full}`}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            className={classes.name}
                                            to={`/${participantIdentities[i].player.summonerName}`}
                                        >
                                            <Typography>
                                                {participantIdentities[i].player.summonerName}
                                            </Typography>
                                        </Link>
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
