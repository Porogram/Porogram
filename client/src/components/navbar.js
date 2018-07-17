import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import logo from '../images/logo.png'

const styles = theme => ({
    img: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    }
})

export default withStyles(styles)(props => {
    const { classes } = props
    return (
        <AppBar position="static">
            <Toolbar>
                <Link to="/"><img className={classes.img} src={logo} alt="logo" /></Link>
                <Typography variant="title" color="inherit">
                    LOL Stats
                </Typography>
            </Toolbar>
        </AppBar>
    )
})
