import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './navbar';
import Home from './home';
import Summoner from './summoner';

export default () => {
    return (
        <Fragment>
            <CssBaseline />
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/summoner/:summonerName" component={Summoner} />
            </Switch>
        </Fragment>
    );
}
