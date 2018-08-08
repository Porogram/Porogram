import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Summoner from './Summoner'
import { NotFound } from './Errors'

export default () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route
                    path="/:summonerName"
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
