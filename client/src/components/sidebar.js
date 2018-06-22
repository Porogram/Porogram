import React, { Component } from 'react';
import './sidebar.css';


class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
          <h1>Summoner</h1>

          <div className="options">
              <ul>
                  <li>Performance</li>
                  <li>Match History</li>
                  <li>Champion Mastery</li>
              </ul>
          </div>
      </div>
    );
  }
}

export default Sidebar;
// <Profile className="profile" />
