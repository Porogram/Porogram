import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography } from '@material-ui/core'

export default withStyles(theme => ({
    login: {
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)'
        } ,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100vh - 64px)'
        }
    },
    paper: {
        minWidth: theme.spacing.unit * 40,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
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
            <Paper>
                <Grid
                    alignItems="center"
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
            </Paper>
        </Grid>
    </Grid>
))
