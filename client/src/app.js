import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeadNav from './components/head_nav';
import Home from './components/home';
import Summoner from './components/summoner';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <HeadNav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/summoner/:summonerName" component={Summoner} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
