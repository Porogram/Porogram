import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Search from './components/search';
const API_KEY = "RGAPI-98f0d6f7-7788-48f1-87d3-c5961203efbf";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { sumName: "" };
  }

  sumSearch(sumName) {
      // console.log("Summoner name: ", sumName);
      // fetch(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${sumName}?api_key=${API_KEY}`).then(results => {
      fetch("https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + sumName + "?api_key=" + API_KEY).then(results => {
          console.log(results);
      });
  }

  render() {
    return (
      <div className="App">
        // <header className="App-header">
        //   <img src={logo} className="App-logo" alt="logo" />
        //   <h1 className="App-title">Welcome to React</h1>
        // </header>
        // <p className="App-intro">
        //   To get started, edit <code>src/App.js</code> and save to reload.
        // </p>
        <Search onInputChange={this.sumSearch}/>
      </div>
    );
  }
}

export default App;
