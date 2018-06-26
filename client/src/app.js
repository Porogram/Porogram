import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Summoner from './components/summoner';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/summoner/:summonerName" component={Summoner} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
