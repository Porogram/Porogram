import React from 'react';
import HeadNav from './components/head_nav';
import Home from './components/home';
import User from './components/user';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <HeadNav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/:summonerName" component={User} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
