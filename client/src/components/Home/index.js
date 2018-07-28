import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Search from './search'

export default withStyles(theme => ({
    main: {
        toolbar: theme.mixins.toolbar
    },
    search: {
        [theme.breakpoints.up('md')]: {
            width: 600
        },
        [theme.breakpoints.down('sm')]: {
            width: 300
        },
        marginTop: '40vh',
        margin: '0 auto'
    }
}))(({ classes }) => {
    return (
        <div className={classes.main}>
            <div className={classes.search}>
                <Search />
            </div>
        </div>
    )
})
