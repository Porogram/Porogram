import React, { Component } from 'react'
import { Dialog, DialogTitle } from '@material-ui/core'

export default class extends Component {
    state = {
        match: {}
    }
    componentDidMount() {
        const { getMatch, matchId } = this.props
        getMatch(matchId).then(match => this.setState({ match }))
    }
    handleClose = () => {
        this.props.close()
    }
    render() {
        const { open } = this.props
        const { match } = this.state
        console.log(match)
        return (
            <Dialog onClose={this.handleClose} open={open}>
                <DialogTitle>MATCH INFO</DialogTitle>
            </Dialog>
        )
    }
}
