import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
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
    }
}))(({ classes }) => (
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Link to="/" className={classes.logo}>
                <img src={logo} alt="" className={classes.img} />
            </Link>
            <Typography variant="title" color="inherit" noWrap>
                POROGRAM
            </Typography>
        </Toolbar>
    </AppBar>
))
