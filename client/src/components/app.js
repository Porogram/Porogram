import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Layout from './Layout'
import Navbar from './navbar'
import Home from './Home'
import Summoner from './Summoner'
import { NotFound } from './Errors'

export default () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        path="/summoner/:summonerName"
                        render={props =>
                            <Summoner
                                {...props}
                                key={props.match.params.summonerName}
                            />
                        }
                    />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}
