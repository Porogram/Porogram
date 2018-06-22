import React, { Component } from 'react';
import Sidebar from './sidebar';
import './summoner.css';


class Summoner extends Component {
  render() {
    return (
      <div className="summoner">
          <Sidebar />
      </div>
    );
  }
}

export default Summoner;
