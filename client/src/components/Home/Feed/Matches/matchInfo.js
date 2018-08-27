import React, { Component } from 'react'
import { Dialog, DialogTitle } from '@material-ui/core'

export default class extends Component {
    handleClose = () => {
        this.props.close()
    }
    render() {
        const { open } = this.props
        return (
            <Dialog onClose={this.handleClose} open={open}>
                <DialogTitle>MATCH INFO</DialogTitle>
            </Dialog>
        )
    }
}
