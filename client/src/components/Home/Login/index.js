import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Button,
    FormHelperText,
    Grid,
    Paper,
    TextField,
    Typography
} from '@material-ui/core'
import axios from 'axios'

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
}))(class extends Component {
    state = {
        username: '',
        password: '',
        summonerName: '',
        loggedIn: false,
        error: ''
    }
    onClick = () => {
        const { username, password } = this.state
        console.log('username', username)
        console.log('password', password)
        axios.post('/api/login', { username, password })
            .then(({ data }) => {
                data.summoner
                ? this.setState({
                    loggedIn: true,
                    summonerName: data.summoner.name
                }) : this.setState({ error: data })
            }).catch(error => console.log(error))
    }
    render() {
        const { classes } = this.props
        const { summonerName, loggedIn, error } = this.state
        if (loggedIn) return <Redirect to={`/${summonerName}`} />
        return (
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
                                <TextField
                                    label="Username"
                                    onChange={e =>
                                        this.setState({
                                            username: e.target.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Password"
                                    onChange={e =>
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                    type="password"
                                />
                            </Grid>
                            {error && (
                                <FormHelperText error>
                                    {error}
                                </FormHelperText>
                            )}
                            <Grid item>
                                <Button
                                    className={classes.button}
                                    color="primary"
                                    onClick={this.onClick}
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
        )
    }
})
