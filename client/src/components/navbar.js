import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import logo from '../images/poro.png'

export default withStyles(() => ({
    img: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    }
}))(({ classes }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link to="/">
                    <img className={classes.img} src={logo} alt="" />
                </Link>
                <Typography variant="title" color="inherit">
                    POROGRAM
                </Typography>
            </Toolbar>
        </AppBar>
    )
})
