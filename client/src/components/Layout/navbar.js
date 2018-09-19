import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    AppBar,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Consumer } from '../context'
import logo from '../../images/logo/poro.png'

const ITEM_HEIGHT = 48

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
    }
}))(class extends Component {
    state = { anchorEl: null }
    handleClick = e => {
        this.setState({ anchorEl: e.currentTarget })
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }
    handleLogout = (e, logout) => {
        e.preventDefault()
        Promise.all([logout(), this.setState({ anchorEl: null })])
    }
    render() {
        const { anchorEl } = this.state
        const { classes } = this.props
        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Consumer>
                        {({ state: { isAuthenticated }, logout }) => (
                            <Fragment>
                                <Link to="/" className={classes.logo}>
                                    <img src={logo} alt="" className={classes.img} />
                                </Link>
                                <Typography variant="title" color="inherit" noWrap>
                                    POROGRAM
                                </Typography>
                                {isAuthenticated && (
                                    <IconButton
                                        aria-label="More"
                                        aria-owns={!!anchorEl ? 'long-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                )}
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorEl}
                                    open={!!anchorEl}
                                    onClose={this.handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: 200,
                                        },
                                    }}
                                >
                                    <MenuItem
                                        onClick={e => this.handleLogout(e, logout)}
                                    >
                                        LOGOUT
                                    </MenuItem>
                                </Menu>
                            </Fragment>
                        )}
                    </Consumer>
                </Toolbar>
            </AppBar>
        )
    }
})
