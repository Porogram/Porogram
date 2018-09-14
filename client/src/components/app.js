import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Signup from './Signup'
import Summoner from './Summoner'
import { NotFound } from './Errors'
import PrivateRoute from './privateRoute'

export default () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/:summonerName" component={Summoner} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </BrowserRouter>
)
