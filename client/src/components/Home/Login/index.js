import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'

export default withStyles(theme => ({
    button: {
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2
    },
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
        paddingBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2
    },
    signup: {
        textDecoration: 'none'
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
            <Paper className={classes.paper}>
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
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="contained"
                        >
                            LOGIN
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link className={classes.signup} to="/signup">
                            <Typography>Sign up</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
))
