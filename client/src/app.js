import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Search from './components/search';
import axios from 'axios'
import HeadNav from './components/head_nav';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  // <div className="App">
  // <HeadNav/>
  // <Search onInputChange={this.sumSearch}/>

  // </div>
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route path="/" component={HeadNav} />
                <Route path="/search" component={Search} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
