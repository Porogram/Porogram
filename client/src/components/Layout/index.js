import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
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
import Container from '../Container'
import { Provider, Subscribe } from 'unstated'

const drawerWidth = 240

export default withRouter(withStyles(theme => ({
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
    render() {
        const { classes, children, location: { pathname } } = this.props
        return (
            <Provider>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            {pathname.includes('/summoner') && (
                                <Subscribe to={[Container]}>
                                    {
                                        sidebar => (
                                            <IconButton
                                                color="inherit"
                                                aria-label="Open drawer"
                                                onClick={sidebar.handleDrawerToggle}
                                                className={classes.navIconHide}
                                            >
                                                <Menu />
                                            </IconButton>
                                        )
                                    }
                                </Subscribe>
                            )}
                            <Link to="/">
                                <img className={classes.img} src={logo} alt="" />
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
                </div>
            </Provider>
        )
    }
}))
