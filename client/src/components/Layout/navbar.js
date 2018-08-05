import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { SidebarContext } from '../Context'
import logo from '../../images/poro.png'

export default withStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    img: {
        width: theme.spacing.unit * 6,
        verticalAlign: 'middle'
    },
    logo: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}))(({ classes }) => {
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <SidebarContext.Consumer>
                    {
                        ({ state: { display }, handleDrawerToggle }) => {
                            if (display)
                                return (
                                    <IconButton
                                        color="inherit"
                                        aria-label="Open drawer"
                                        onClick={handleDrawerToggle}
                                        className={classes.navIconHide}
                                    >
                                        <Menu />
                                    </IconButton>
                                )
                        }
                    }
                </SidebarContext.Consumer>
                <Link to="/" className={classes.logo}>
                    <img src={logo} alt="" className={classes.img} />
                </Link>
                <Typography variant="title" color="inherit" noWrap>
                    POROGRAM
                </Typography>
            </Toolbar>
        </AppBar>
    )
})
