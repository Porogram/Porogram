import React, { Component } from 'react';
import './app.css';
import axios from 'axios';
import Search from './components/search';
import HeadNav from './components/head_nav';
import User from './components/user';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
      super();
      this.state = { summonerName: "" };
  }

  sumSearch(summonerName) {
      console.log("Summoner name: ", summonerName);
      var url = `/api/search/${summonerName}`
      axios.get(url).then(res => console.log(res.data[0]));
  }

  render() {
    return (
      <div className="App">
        <HeadNav/>
        <Search onInputChange={this.sumSearch}/>
      </div>
    )
  }
}

export default App;
