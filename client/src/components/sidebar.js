import React, { Component } from 'react';
import './sidebar.css';


class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
          <h1>Summoner</h1>

          <div className="options">
              <ul>
                  <li><a href="">Performance</a></li>
                  <li><a href="">Match History</a></li>
                  <li><a href="">Champion Mastery</a></li>
              </ul>
          </div>
      </div>
    );
  }
}

export default Sidebar;
// <Profile className="profile" />
