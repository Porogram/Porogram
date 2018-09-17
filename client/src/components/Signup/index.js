import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
}))(class extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        summonerName: '',
        usernameError: '',
        passwordError: '',
        emailError: '',
        summonerNameError: '',
        signupError: '',
        error: false,
        signedUp: false
    }
    checkUsername = username => {
        if (!username.length) return  'field is required'
        else if (username.length < 6)
            return 'must be at least 6 characters'
        return ''
    }
    checkPassword = password => {
        if (!password.length) return 'field is required'
        else if (password.length < 6)
            return 'must be at least 6 characters'
        return ''
    }
    checkEmail = email => {
        if (!email.length) return 'field is required'
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
            return 'invalid email'
        return ''
    }
    checkSummonerName = summonerName => {
        if (!summonerName.length) return 'field is required'
        return ''
    }
    onChange = e => {
        if (this.state.error) {
            if (e.target.name === 'username')
                this.setState({
                    username: e.target.value,
                    usernameError: this.checkUsername(e.target.value)
                })
            else if (e.target.name === 'password')
                this.setState({
                    password: e.target.value,
                    passwordError: this.checkPassword(e.target.value)
                })
            else if (e.target.name === 'email')
                this.setState({
                    email: e.target.value,
                    emailError: this.checkEmail(e.target.value)
                })
            else if (e.target.name === 'summonerName')
                this.setState({
                    summonerName: e.target.value,
                    summonerNameError: this.checkSummonerName(e.target.value)
                })
        } else this.setState({ [e.target.name]: e.target.value })
    }
    onClick = () => {
        const { username, password, email, summonerName } = this.state
        const usernameError = this.checkUsername(username),
        passwordError = this.checkPassword(password),
        emailError = this.checkEmail(email),
        summonerNameError = this.checkSummonerName(summonerName)
        if (
            usernameError !== ''
            || passwordError !== ''
            || emailError !== ''
            || summonerNameError !== ''
        ) {
            this.setState({
                usernameError,
                passwordError,
                emailError,
                summonerNameError,
                error: true
            })
        } else {
            axios.post('/api/signup', {
               username,
               password,
               email: email.toLowerCase(),
               summonerName: summonerName.replace(/\s/g, '').toLowerCase()
           }).then(({ data }) => {
               if (data.error)
                   this.setState({ signupError: data.error, error: true })
               else this.setState({ signedUp: true })
           }).catch(error => console.log(error))
        }
    }
    render() {
        const { classes } = this.props
        const {
            summonerName,
            signedUp,
            signupError,
            usernameError,
            passwordError,
            emailError,
            summonerNameError
        } = this.state
        if (signedUp) return <Redirect to={`/${summonerName}`} />
        return (
            <Grid
                alignItems="center"
                className={classes.signup}
                container
                direction="column"
                justify="center"
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography align="center" variant="title">
                            Create an account
                        </Typography>
                        <Grid
                            alignItems="center"
                            container
                            direction="column"
                            justify="center"
                        >
                            <Grid item>
                                <TextField
                                    error={!!usernameError}
                                    helperText={usernameError}
                                    label="Username"
                                    name="username"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={!!passwordError}
                                    helperText={passwordError}
                                    label="Password"
                                    name="password"
                                    onChange={this.onChange}
                                    type="password"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={!!emailError}
                                    helperText={emailError}
                                    label="Email"
                                    name="email"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={!!summonerNameError}
                                    helperText={summonerNameError}
                                    label="Summoner name"
                                    name="summonerName"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            {signupError && (
                                <FormHelperText error>
                                    {signupError}
                                </FormHelperText>
                            )}
                            <Grid item>
                                <Button
                                    className={classes.button}
                                    color="primary"
                                    onClick={this.onClick}
                                    variant="contained"
                                >
                                    SIGN UP
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
})
