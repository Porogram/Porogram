import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { Sidebar } from '../Context'
import Navbar from './navbar'

export default withStyles(theme => ({
    content: {
        backgroundColor: theme.palette.background.default
    },
    toolbar: theme.mixins.toolbar
}))(({ classes, children }) => {
    return (
        <Sidebar.Provider>
            <CssBaseline />
            <Navbar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </Sidebar.Provider>
    )
})
