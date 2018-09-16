import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
// import { SummonerDataContext } from '../../Context'
import { Consumer } from '../../context'
import { Failure } from '../../Errors'
import Matches from './Matches'
import Loading from '../../loading'

export default withStyles(theme => ({
    matches: {
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing.unit * 40,
            marginRight: theme.spacing.unit * 40
        }
    }
}))(({ classes }) => (
    <Consumer>
        {({ state: { champions, error } }) => (
            <Fragment>
                {'message' in error
                ? <Failure error={error} />
                : !champions[1]
                    ? <Loading />
                    : <div className={classes.matches}><Matches /></div>}
            </Fragment>
        )}
    </Consumer>
))
