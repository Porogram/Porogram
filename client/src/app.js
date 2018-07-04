import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Summoner from './components/summoner';
import Failure from './components/failure';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/summoner/:summonerName" component={Summoner} />
                    <Route exact path="/failure" component={Failure} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
