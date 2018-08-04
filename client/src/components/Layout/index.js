import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Sidebar } from '../Context'
import { withStyles } from '@material-ui/core/styles'
import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import logo from '../../images/poro.png'

export default withRouter(withStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    content: {
        backgroundColor: theme.palette.background.default
    },
    toolbar: theme.mixins.toolbar,
    logo: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    img: {
        width: theme.spacing.unit * 6,
        verticalAlign: 'middle'
    }
}))(({ classes, children, location: { pathname } }) => {
    return (
        <Sidebar.Provider>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {pathname.includes('/summoner') && (
                        <Sidebar.Consumer>
                            {
                                value => (
                                    <IconButton
                                        color="inherit"
                                        aria-label="Open drawer"
                                        onClick={value.handleDrawerToggle}
                                        className={classes.navIconHide}
                                    >
                                        <Menu />
                                    </IconButton>
                                )
                            }
                        </Sidebar.Consumer>
                    )}
                    <Link to="/" className={classes.logo}>
                        <img src={logo} alt="" className={classes.img} />
                    </Link>
                    <Typography variant="title" color="inherit" noWrap>
                        POROGRAM
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </Sidebar.Provider>
    )
}))
