import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Search from './search'

const styles = theme => ({
    search: {
        width: '50%',
        margin: '220px auto'
    }
})

export default withStyles(styles)(props => {
    const { classes } = props
    return (
        <Fragment>
            <div className={classes.search}>
                <Search />
            </div>
        </Fragment>
    )
})
