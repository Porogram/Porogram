import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    IconButton,
    Hidden,
    Divider
} from '@material-ui/core'
import { Menu } from '@material-ui/icons/'
import logo from '../../images/poro.png'

const drawerWidth = 240

export default withStyles(theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative'
        }
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
    img: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    }
}))(class extends Component {
    state = {
        mobileOpen: false,
    }
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }
    render() {
        const { classes, children } = this.props
        const { mobileOpen } = this.state
        const drawer = (
            <div>
                <Hidden smDown>
                    <div className={classes.toolbar} />
                </Hidden>
                SIDEBAR
            </div>
        )
        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                                <Menu />
                            </IconButton>
                            <Link to="/">
                                <img className={classes.img} src={logo} alt="" />
                            </Link>
                            <Typography variant="title" color="inherit" noWrap>
                                POROGRAM
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                              paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                              keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                              paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </div>
            </Fragment>
        )
    }
})
