import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Details from './details'

export default withStyles(theme => ({
    main: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 60
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: 300
        },
        marginRight: 60
    }
}))(({
    classes,
    summoner,
    positions,
    championMasteries,
    matchlist,
    matches,
    staticData
}) => {
    return (
        <div className={classes.main}>
            <Typography variant="display2" className={classes.title}>
                Summary Details
            </Typography>
            <Details
                summoner={summoner}
            />
        </div>
    )
})
