import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
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
        {({
            state: { champions, error, items, runes, summonerSpells, version }
        }) => {
            let feed
            if (error.message) feed = <Failure error={error} />
            else {
                if (champions === {}
                    || items === {}
                    || runes === {}
                    || summonerSpells === {}
                    || version === '') feed = <Loading />
                else feed = <div className={classes.matches}><Matches /></div>
            }
            return (
                <Fragment>
                    {feed}
                </Fragment>
            )
        }}
    </Consumer>
))
