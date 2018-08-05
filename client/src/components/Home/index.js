import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Search from './search'

export default withStyles(theme => ({
    main: {
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        [theme.breakpoints.up('md')]: {
            width: 600
        },
        [theme.breakpoints.down('sm')]: {
            width: 300
        }
    }
}))(class extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.main}>
                <div className={classes.search}>
                    <Search />
                </div>
            </div>
        )
    }
})
