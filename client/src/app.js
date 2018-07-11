import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/navbar';
import Home from './components/home';
import Summoner from './components/summoner';

const App = () => {
    return (
        <div className="App">
            <CssBaseline />
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/summoner/:summonerName" component={Summoner} />
            </Switch>
        </div>
    );
}

export default App;
