import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'

export default withStyles(theme => ({
    button: {
        marginTop: theme.spacing.unit * 2
    },
    paper: {
        minWidth: theme.spacing.unit * 40,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    signup: {
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
        className={classes.signup}
        container
        direction="column"
        justify="center"
    >
        <Grid item>
            <Paper className={classes.paper}>
                <Grid
                    alignItems="center"
                    container
                    direction="column"
                    justify="center"
                >
                    <Grid item>
                        <TextField label="First name" />
                    </Grid>
                    <Grid item>
                        <TextField label="Last name" />
                    </Grid>
                    <Grid item>
                        <TextField label="Email" />
                    </Grid>
                    <Grid item>
                        <TextField label="Password" />
                    </Grid>
                    <Grid item>
                        <TextField label="Summoner name" />
                    </Grid>
                    <Grid item>
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="contained"
                        >
                            SIGN UP
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
))
