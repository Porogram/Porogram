import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, TextField, Typography } from '@material-ui/core'

export default withStyles(theme => ({
    login: {
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)'
        } ,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100vh - 64px)'
        }
    }
}))(({ classes }) => (
    <Grid
        alignItems="center"
        className={classes.login}
        container
        direction="column"
        justify="center"
    >
        <Grid item>
            <TextField label="Username" />
        </Grid>
        <Grid item>
            <TextField label="Password" />
        </Grid>
        <Grid item>
            <Typography>Sign up</Typography>
        </Grid>
    </Grid>
))
