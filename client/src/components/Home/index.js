import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Search from './search'

export default withStyles(() => ({
    search: {
        width: '50%',
        marginTop: '230px',
        margin: '0 auto'
    }
}))(({ classes }) => {
    return (
        <Fragment>
            <div className={classes.search}>
                <Search />
            </div>
        </Fragment>
    )
})
