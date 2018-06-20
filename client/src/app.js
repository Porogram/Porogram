import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Search from './components/search';
import axios from 'axios'
import HeadNav from './components/head_nav';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { summonerName: "" };
  }

  sumSearch(summonerName) {
      console.log("Summoner name: ", summonerName);
      var url = "/api/search/" + summonerName
      axios.get(url).then(res => console.log(res.data[0]));
  }

  render() {
    return (
      <div className="App">
        <HeadNav/>
        <Search onInputChange={this.sumSearch}/>
      </div>
    );
  }
}

export default App;
