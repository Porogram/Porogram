import React, { Component } from 'react';
import Sidebar from './sidebar';
import './user.css';


class User extends Component {
  render() {
    return (
      <div className="user">
          <Sidebar />
      </div>
    );
  }
}

export default User;
