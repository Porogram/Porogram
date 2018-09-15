import React, { Component } from 'react'
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
import jwt from 'jsonwebtoken'
import { AuthContext, SummonerDataContext } from '../../Context'
import { setAuthorizationToken } from '../../Utils'

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
        error: ''
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onClick = (login, getSummonerData) => {
        const { username, password } = this.state
        console.log('username', username)
        console.log('password', password)
        axios.post('/api/login', { username, password })
            .then(({ data }) => {
                if (data.error) this.setState({ error: data.error })
                else {
                    const token = data.token
                    localStorage.setItem('jwtToken', token)
                    setAuthorizationToken(token)
                    const user = jwt.decode(token)
                    Promise.all([login(), getSummonerData(user.summoner.name)])
                }
            }).catch(error => console.log(error))
    }
    render() {
        const { classes } = this.props
        const { error } = this.state
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
                        <Typography align="center" variant="title">
                            Login
                        </Typography>
                        <Grid
                            alignItems="center"
                            container
                            direction="column"
                            justify="center"
                        >
                            <Grid item>
                                <TextField
                                    label="Username"
                                    name="username"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Password"
                                    name="password"
                                    onChange={this.onChange}
                                    type="password"
                                />
                            </Grid>
                            {error && (
                                <FormHelperText error>
                                    {error}
                                </FormHelperText>
                            )}
                            <Grid item>
                                <AuthContext.Consumer>
                                    {({ login }) => (
                                        <SummonerDataContext.Consumer>
                                            {({ getSummonerData }) => (
                                                <Button
                                                    className={classes.button}
                                                    color="primary"
                                                    onClick={() =>
                                                        this.onClick(
                                                            login,
                                                            getSummonerData
                                                        )
                                                    }
                                                    variant="contained"
                                                >
                                                    LOGIN
                                                </Button>
                                            )}
                                        </SummonerDataContext.Consumer>
                                    )}
                                </AuthContext.Consumer>
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
