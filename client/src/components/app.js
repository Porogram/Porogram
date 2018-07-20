import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Navbar from './navbar'
import Home from './Home'
import Summoner from './Summoner'
import { NotFound } from './Errors'

export default () => {
    return (
        <BrowserRouter>
            <Fragment>
                <CssBaseline />
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/summoner/:summonerName" component={Summoner} />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}