import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Provider, Subscribe } from 'unstated'
import { withStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from '@material-ui/core'
import { Menu } from '@material-ui/icons/'
import Container from '../Container'
import logo from '../../images/poro.png'

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
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        marginTop: 64
    },
    img: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    }
}))(({ classes, children, location: { pathname } }) => {
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
                    {children}
                </main>
            </div>
        </Provider>
    )
}))
