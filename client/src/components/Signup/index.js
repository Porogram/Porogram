import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Button,
    FormHelperText,
    Grid,
    Paper,
    TextField
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
        signedUp: false,
        signup: '',
        errors: {}
    }
    checkErrors = (username, password, email, summonerName) => {
        const errors = {}
        if (!username.length) errors.username = 'field is required'
        if (!password.length) errors.password = 'field is required'
        if (!email.length) errors.email = 'field is required'
        else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            errors.email = 'invalid email'
        if (!summonerName.length) errors.summonerName = 'field is required'
        return errors
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        // if (!email.test(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
    }
    onClick = () => {
        const {
            username,
            password,
            email,
            summonerName
        } = this.state
        console.log('username', username)
        console.log('password', password)
        console.log('email', email)
        console.log('summonerName', summonerName)
        // TODO: do field validations before request
        // if error, set error, helperText="error message"
        const errors = this.checkErrors(username, password, email, summonerName)
        axios.post('/api/signup', {
            username,
            password,
            email: email.toLowerCase(),
            summonerName: summonerName.toLowerCase()    // remove spaces also
        }).then(({ data }) => {
            console.log(data)
            data.error || !Object.is(errors, this.state.errors)
            ? this.setState({ errors, signup: data.error })
            : this.setState({ signedUp: true })
        }).catch(error => console.log(error))
    }
    render() {
        const { classes } = this.props
        const { summonerName, signedUp, signup, errors } = this.state
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
                        <Grid
                            alignItems="center"
                            container
                            direction="column"
                            justify="center"
                        >
                            <Grid item>
                                <TextField
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    label="Username"
                                    name="username"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    label="Password"
                                    name="password"
                                    onChange={this.onChange}
                                    type="password"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    label="Email"
                                    name="email"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    error={!!errors.summonerName}
                                    helperText={errors.summonerName}
                                    label="Summoner name"
                                    name="summonerName"
                                    onChange={this.onChange}
                                />
                            </Grid>
                            {signup && (
                                <FormHelperText error>
                                    {signup}
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
