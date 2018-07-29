import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Avatar, Grid } from '@material-ui/core'

export default withStyles(() => ({
}))(({ version, classes, summoner, staticData, matchlist, positions }) => {
    console.log('staticData: ', matchlist)
    return (
        <Typography variant="subheading">This is the summary details</Typography>
    )
})
