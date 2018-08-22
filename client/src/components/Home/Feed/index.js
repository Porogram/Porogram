import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { SummonerDataContext } from '../../Context'
import { Failure } from '../../Errors'
import Matches from './Matches'

export default withStyles(theme => ({
    matches: {
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing.unit * 40,
            marginRight: theme.spacing.unit * 40
        }
    }
}))(({ classes }) => (
    <SummonerDataContext.Consumer>
        {({ state: { error } }) => (
            <Fragment>
                {'message' in error
                ? <Failure error={error} />
                : (
                    <div className={classes.matches}>
                        <Matches />
                    </div>
                )}
            </Fragment>
        )}
    </SummonerDataContext.Consumer>
))
