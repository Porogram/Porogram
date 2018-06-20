import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Search from './components/search';
import HeadNav from './components/head_nav';
import {Router, Route, browserHistory} from 'react-router';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = { sumName: "" };
  }

  sumSearch(sumName) {
      console.log("Summoner name: ", sumName);
  }

  render() {
    return (
      <Router>
      <Route>
        <div className="App">
          <Route path={"/"}>
        </Route>
          <Route path={"app"} component=>
        </Route>
          <HeadNav/>
          <Search onInputChange={this.sumSearch}/>
        </div>
        </Route>
      </Router>
    );
  }
}

export default App;
