import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Search from './components/search';
import axios from 'axios'
import HeadNav from './components/head_nav';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { summonerId: "" };
  }

  sumSearch(summonerId) {
      console.log("Summoner name: ", summonerId);
      var url = "/api/search/" + summonerId
      axios.get(url).then(res => console.log(res.data));
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
