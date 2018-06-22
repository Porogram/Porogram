import React from 'react';
import HeadNav from './components/head_nav';
import Home from './components/home';
import Summoner from './components/summoner';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
