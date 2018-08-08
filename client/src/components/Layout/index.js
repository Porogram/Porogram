import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { SidebarContext, StaticDataContext, SummonerDataContext } from '../Context'
import Navbar from './navbar'

export default withStyles(theme => ({
    content: {
        backgroundColor: theme.palette.background.default
    },
    toolbar: theme.mixins.toolbar
}))(({ classes, children }) => {
    return (
        <StaticDataContext.Provider>
            <SummonerDataContext.Provider>
                <SidebarContext.Provider>
                    <CssBaseline />
                    <Navbar />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </SidebarContext.Provider>
            </SummonerDataContext.Provider>
        </StaticDataContext.Provider>
    )
})
