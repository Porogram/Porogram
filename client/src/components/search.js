import React, { Component } from 'react';
import './search.css';

class Search extends Component {
  constructor(props) {
      super(props);
      this.state = { summonerId: "" };
  }

  render() {
    return (
      <div className="search col-6 offset-3 form-group">
        <input className="search-bar form-control form-control-lg" type="search" value={this.state.summonerId} onChange={event => this.onInputChange(event.target.value)} />
        <button className="btn btn-ghost" onClick={() => this.onClick(this.state.summonerId)}>Search</button>
      </div>
    );
  }

  onInputChange(summonerId) {
      this.setState({ summonerId });
  }

  onClick(summonerId) {
      // console.log(summonerId);
      this.props.onInputChange(summonerId);
  }

}

export default Search;
