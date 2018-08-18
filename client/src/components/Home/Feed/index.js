import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Matches from './Matches'

export default withStyles(theme => ({
    matches: {
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing.unit * 40,
            marginRight: theme.spacing.unit * 40
        }
    }
}))(({ classes }) => (
    <div className={classes.matches}>
        <Matches />
    </div>
))
