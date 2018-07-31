import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

export default withStyles(() => ({
}))(({ classes, summoner }) => {
    return (
        <Fragment>
            <Typography variant="subheading">This is the summary details for {summoner.name}</Typography>
        </Fragment>
    )
})
