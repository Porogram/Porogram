import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Search from './components/search';
import HeadNav from './components/head_nav';

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
      <div className="App">
        <HeadNav/>
        <Search onInputChange={this.sumSearch}/>
      </div>
    );
  }
}

export default App;
