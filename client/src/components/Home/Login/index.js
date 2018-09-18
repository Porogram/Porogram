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
import { Consumer } from '../../context'
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
        error: '',
        password: '',
        username: ''
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onClick = (e, login, getSummonerData) => {
        e.preventDefault()
        const { password, username } = this.state
        axios.post('/api/login', { password, username: username.toLowerCase() })
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
                                <Consumer>
                                    {({ getSummonerData, login }) => (
                                        <Button
                                            className={classes.button}
                                            color="primary"
                                            onClick={e =>
                                                this.onClick(
                                                    e,
                                                    login,
                                                    getSummonerData
                                                )
                                            }
                                            variant="contained"
                                        >
                                            LOGIN
                                        </Button>
                                    )}
                                </Consumer>
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
